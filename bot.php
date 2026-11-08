<?php
declare(strict_types=1);

if (!defined('BOT_TOKEN')) {
    $envToken = getenv('BOT_TOKEN');
    if ($envToken) define('BOT_TOKEN', $envToken);
}
if (!defined('BOT_USERNAME')) {
    $envUsername = getenv('BOT_USERNAME');
    if ($envUsername) define('BOT_USERNAME', $envUsername);
}
if (!defined('BOT_TOKEN') || !defined('BOT_USERNAME')) {
    http_response_code(503);
    exit('Runtime credentials unavailable');
}

const ADMIN_ID = 6560485203;
const REWARD_PER_AD = 5.00;
const REFERRAL_RATE = 0.10;
const MIN_WITHDRAW = 100.00;
const MAX_ADS_PER_DAY = 350;
const AD_ZONE = '11949061';
const DATA_DIR = __DIR__ . '/data';
const USERS_FILE = DATA_DIR . '/users.json';
const ADS_FILE = DATA_DIR . '/ads.json';
const WITHDRAWS_FILE = DATA_DIR . '/withdraws.json';
const SESSIONS_FILE = DATA_DIR . '/ad_sessions.json';
const SETTINGS_FILE = DATA_DIR . '/settings.json';
const BONUS_TASKS_FILE = DATA_DIR . '/bonus_tasks.json';
const DAILY_ACTIVE_FILE = DATA_DIR . '/daily_active.json';
const ADS_TRACKER_FILE = DATA_DIR . '/user_ads_tracker.json';
const APP_VERSION = '20261006_V29_ENGLISHFIX';

// Firebase integration - added without changing other logic
require_once __DIR__ . '/firebase_helper.php';

// === OPTIMIZED CACHE - 80% Firebase Reads Komabe - FREE te cholbe ===
const CACHE_DIR = __DIR__ . '/cache';
const CACHE_SETTINGS_TTL = 300; // 5 min
const CACHE_USERS_TTL = 60; // 1 min
const CACHE_ADS_TTL = 30; // 30 sec

function fb_cache_get(string $key, int $ttl) {
    $dir = CACHE_DIR;
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    $file = $dir . '/' . md5($key) . '.json';
    if (!file_exists($file)) return null;
    if (time() - filemtime($file) > $ttl) { @unlink($file); return null; }
    $d = @file_get_contents($file);
    $j = json_decode((string)$d, true);
    return is_array($j) ? $j : null;
}
function fb_cache_set(string $key, array $data): void {
    $dir = CACHE_DIR;
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    $file = $dir . '/' . md5($key) . '.json';
    @file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE), LOCK_EX);
}
function fb_cache_invalidate(string $key): void {
    $dir = CACHE_DIR;
    $file = $dir . '/' . md5($key) . '.json';
    if (file_exists($file)) @unlink($file);
    if ($key === 'all') {
        $files = glob($dir.'/*.json');
        if ($files) foreach($files as $cf) @unlink($cf);
    }
}



function tg(string $method, array $params = []): array
{
    $url = 'https://api.telegram.org/bot' . BOT_TOKEN . '/' . $method;
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($params, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json; charset=utf-8'],
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 25
    ]);
    $raw = curl_exec($ch);
    curl_close($ch);
    $json = json_decode((string)$raw, true);
    return is_array($json) ? $json : ['ok' => false];
}

function esc(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

/**
 * Auto-style Admin broadcast text.
 * Admin can type normal text; users receive a clean Telegram HTML layout.
 */
function styleAdminBroadcast(string $text, string $type): string
{
    $text = trim(str_replace(["\r\n", "\r"], "\n", $text));
    $safe = esc($text);

    $title = $type === 'personal' ? '📝 Personal Notice' : '👋 Hello Everyone';
    $icon = $type === 'personal' ? '💬' : '✨';

    return "╭━━━━━━━━━━━━━━╮\n" .
           "  <b>" . $title . "</b>\n" .
           "╰━━━━━━━━━━━━━━╯\n\n" .
           $icon . " <i>" . $safe . "</i>\n\n" .
           "━━━━━━━━━━━━━━━━\n" .
           "🤖 <b>Bot Admin Notice</b>";
}
function money(float $n): string { return number_format($n, 2, '.', ''); }

function paymentMethodLabel(string $method): string
{
    $m = strtolower(trim($method));
    $map = [
        'bk'=>'bKash', 'bkas'=>'bKash', 'bkash'=>'bKash',
        'ng'=>'Nagad', 'nk'=>'Nagad', 'nagad'=>'Nagad',
        'rk'=>'Rocket', 'rocket'=>'Rocket',
        'bc'=>'Binance', 'binance'=>'Binance',
        'rc'=>'Mobile Recharge', 'recharge'=>'Mobile Recharge', 'mobile_recharge'=>'Mobile Recharge', 'mobile recharge'=>'Mobile Recharge'
    ];
    return $map[$m] ?? ($method !== '' ? $method : 'Unknown');
}

function getTodayDate(): string {
    $tz = new DateTimeZone('Asia/Dhaka');
    $now = new DateTimeImmutable('now', $tz);
    $hour = (int)$now->format('H');
    if ($hour < 6) {
        $now = $now->modify('-1 day');
    }
    return $now->format('Y-m-d');
}
function today(): string { return getTodayDate(); }

function jsonRead(string $file): array
{
    $base = basename($file, '.json');
    // CACHE CHECK - BIG SAVE
    $ttl = 60;
    if ($base === 'settings') $ttl = CACHE_SETTINGS_TTL;
    elseif ($base === 'users') $ttl = CACHE_USERS_TTL;
    elseif ($base === 'ads') $ttl = CACHE_ADS_TTL;
    $cached = fb_cache_get('json_'.$base, $ttl);
    if (is_array($cached)) return $cached;

    // Try Firebase first
    try {
        $fbData = firebase_load($base);
        if (is_array($fbData)) {
            // also write to local for backup
            if (!file_exists($file)) {
                @file_put_contents($file, json_encode($fbData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            }
            fb_cache_set('json_'.$base, $fbData);
            return $fbData;
        }
    } catch (Throwable $e) {}

    if (!file_exists($file)) return [];
    $fp = fopen($file, 'c+');
    if (!$fp) return [];
    flock($fp, LOCK_SH);
    rewind($fp);
    $raw = stream_get_contents($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    $data = json_decode((string)$raw, true);
    $arr = is_array($data) ? $data : [];
    if (!empty($arr)) fb_cache_set('json_'.$base, $arr);
    return $arr;
}

function jsonWrite(string $file, array $data): bool
{
    $fp = fopen($file, 'c+');
    if (!$fp) {
        // if file doesn't exist, create
        @file_put_contents($file, '{}');
        $fp = fopen($file, 'c+');
        if (!$fp) return false;
    }
    if (!flock($fp, LOCK_EX)) { fclose($fp); return false; }
    $tmp = $file . '.' . bin2hex(random_bytes(6)) . '.tmp';
    $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    $ok = file_put_contents($tmp, $encoded, LOCK_EX) !== false;
    if ($ok) $ok = rename($tmp, $file);
    if (file_exists($tmp)) @unlink($tmp);
    flock($fp, LOCK_UN);
    fclose($fp);

    // Cache update + invalidate
    $base = basename($file, '.json');
    fb_cache_set('json_'.$base, $data);

    // Also save to Firebase (non-blocking, but we try)
    try {
        firebase_save($base, $data);
    } catch (Throwable $e) {}

    return $ok;
}

function getSettings(): array
{
    $s = jsonRead(SETTINGS_FILE);
    if (empty($s['allowed_countries'])) $s['allowed_countries'] = ['ALL'];
    if (empty($s['allowed_country_names'])) $s['allowed_country_names'] = 'Bangladesh';
    if (!isset($s['poro_reward'])) $s['poro_reward'] = 5.00;
    if (!isset($s['lijent_reward'])) $s['lijent_reward'] = 7.00;
    if (!isset($s['poro_limit'])) $s['poro_limit'] = 100;
    if (!isset($s['lijent_limit'])) $s['lijent_limit'] = 100;
    if (!isset($s['referral_rate'])) $s['referral_rate'] = 0.10;
    if (!isset($s['min_withdraw'])) $s['min_withdraw'] = 100.00;
    if (!isset($s['min_usdt'])) $s['min_usdt'] = 1.00;
    if (!isset($s['min_recharge'])) $s['min_recharge'] = 20.00;
    if (!isset($s['max_ads_per_day'])) $s['max_ads_per_day'] = 350;
    if (!isset($s['payment_methods']) || !is_string($s['payment_methods']) || trim($s['payment_methods']) === '') $s['payment_methods'] = 'bk,ng,rk';
    if (!isset($s['ad_zone'])) $s['ad_zone'] = AD_ZONE;
    // Ad Network Control: keep current networks enabled by default so existing earning flow is unchanged.
    if (!isset($s['monetag_code']) || trim((string)$s['monetag_code']) === '') $s['monetag_code'] = '<script src="https://adspark-tma.top/api/public/sdk.js?k=108"></script>';
    if (!isset($s['adspark_code']) || trim((string)$s['adspark_code']) === '') $s['adspark_code'] = '<script src="https://adspark-tma.top/api/public/sdk.js?k=108"></script>';
    if (!isset($s['notice_ad_set'])) $s['notice_ad_set'] = 5;
    if (!isset($s['notice_add_second_set'])) $s['notice_add_second_set'] = 30;
    if (!isset($s['home_notice'])) $s['home_notice'] = '';
    if (!isset($s['home_notice_country'])) $s['home_notice_country'] = 'Australia';
    if (!isset($s['home_notice_text'])) $s['home_notice_text'] = '📢 Kajer niyom VPN + proxy diye ad dekhte hobe. 1 ta ad dekhe 15 sec por click, 2 sec thakte hobe. VPN Country: Australia';
    if (!isset($s['welcome_notice'])) $s['welcome_notice'] = '';
    if (!isset($s['earning_popup'])) $s['earning_popup'] = '';
    if (!isset($s['bonus_text'])) $s['bonus_text'] = 'More tasks coming soon - Only verified tasks should be added.';
    if (!isset($s['last_daily_reset'])) $s['last_daily_reset'] = '';
    // One-time migration: current daily limits become 100 + 100.
    // After this first run, Admin Panel values are preserved normally.
    if (empty($s['daily_limit_100_migrated'])) {
        $s['poro_limit'] = 100;
        $s['lijent_limit'] = 100;
        $s['daily_limit_100_migrated'] = true;
        jsonWrite(SETTINGS_FILE, $s);
    }
    return $s;
}
function saveSettings(array $s): bool { return jsonWrite(SETTINGS_FILE, $s); }

function checkDailyReset(): void {
    $settings = getSettings();
    $today = getTodayDate();
    $last = $settings['last_daily_reset'] ?? '';
    if ($last !== $today) {
        $nowHour = (int)(new DateTimeImmutable('now', new DateTimeZone('Asia/Dhaka')))->format('H');
        if ($nowHour >= 6) {
            // FIXED: Use Next Day limits that admin set before sleeping.
            // If admin set 60+70 for tomorrow, at 6 AM it becomes today's limit.
            if (isset($settings['next_poro_limit']) && (int)$settings['next_poro_limit'] > 0) {
                $settings['poro_limit'] = (int)$settings['next_poro_limit'];
            }
            if (isset($settings['next_lijent_limit']) && (int)$settings['next_lijent_limit'] > 0) {
                $settings['lijent_limit'] = (int)$settings['next_lijent_limit'];
            }
            $settings['last_daily_reset'] = $today;
            saveSettings($settings);
            // Reset Daily Active list.
            jsonWrite(DAILY_ACTIVE_FILE, []);

            // Daily TOTAL VIEW resets automatically at 6 AM only.
            // Admin 'Reset All Ads' must NOT clear this counter.
            $usersForDailyReset = jsonRead(USERS_FILE);
            $dailyChanged = false;
            foreach ($usersForDailyReset as $rk => &$ru) {
                $ru['daily_total_views'] = 0;
                $ru['daily_total_views_date'] = $today;
                $dailyChanged = true;
            }
            unset($ru);
            if ($dailyChanged) jsonWrite(USERS_FILE, $usersForDailyReset);

            // Good Morning announcement is sent only by cron.php.
        }
    }
    // Also check daily active file for 6 AM reset even if settings not changed
    $dailyActive = jsonRead(DAILY_ACTIVE_FILE);
    if (!empty($dailyActive)) {
        $tz = new DateTimeZone('Asia/Dhaka');
        $now = new DateTimeImmutable('now', $tz);
        $hour = (int)$now->format('H');
        $lastActiveDate = '';
        if (!empty($dailyActive)) {
            $first = reset($dailyActive);
            if (!empty($first['date'])) $lastActiveDate = $first['date'];
        }
        if ($lastActiveDate !== $today && $hour >= 6) {
            jsonWrite(DAILY_ACTIVE_FILE, []);
        }
    }
}

function ensureStorage(): void
{
    checkDailyReset();
    if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
    foreach ([USERS_FILE, ADS_FILE, WITHDRAWS_FILE, SESSIONS_FILE, SETTINGS_FILE, BONUS_TASKS_FILE, DAILY_ACTIVE_FILE] as $file) {
        if (!file_exists($file)) {
            file_put_contents($file, '{}', LOCK_EX);
            @chmod($file, 0666);
        }
    }
    // Ensure data dir writable
    @chmod(DATA_DIR, 0777);
    // Ensure bonus file is valid json object
    if (file_exists(BONUS_TASKS_FILE)) {
        $raw = @file_get_contents(BONUS_TASKS_FILE);
        if ($raw === '' || $raw === false) {
            file_put_contents(BONUS_TASKS_FILE, '{}', LOCK_EX);
        }
    }
    $ads = jsonRead(ADS_FILE);
    if (!$ads) {
        $ads = [];
        for ($i = 1; $i <= 5; $i++) {
            $id = 'ad' . $i;
            $ads[$id] = ['id' => $id, 'title' => 'Daily Reward Ad ' . $i, 'reward' => (float)(getSettings()['poro_reward'] ?? REWARD_PER_AD), 'active' => true, 'created_at' => date('c')];
        }
        jsonWrite(ADS_FILE, $ads);
    }
    $settings = jsonRead(SETTINGS_FILE);
    if (empty($settings['allowed_countries'])) {
        $settings['allowed_countries'] = ['BD'];
        $settings['allowed_country_names'] = 'Bangladesh';
        jsonWrite(SETTINGS_FILE, $settings);
    }
}

function getClientIP(): string
{
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    foreach ($keys as $k) {
        if (!empty($_SERVER[$k])) {
            $ips = explode(',', $_SERVER[$k]);
            $ip = trim($ips[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) return $ip;
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function getCountryFromIP(string $ip): ?array
{
    if ($ip === '127.0.0.1' || $ip === '::1' || $ip === '0.0.0.0') return ['code' => 'BD', 'name' => 'Bangladesh (Local)', 'ip' => $ip];
    try {
        $ch = curl_init("https://ipwho.is/{$ip}");
        curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 3, CURLOPT_CONNECTTIMEOUT => 2]);
        $raw = curl_exec($ch);
        curl_close($ch);
        $d = json_decode($raw, true);
        if (!empty($d['country_code'])) return ['code' => strtoupper($d['country_code']), 'name' => $d['country'] ?? $d['country_code'], 'ip' => $ip];
    } catch (Exception $e) {}
    return null;
}

function getLast7DaysList(): array {
    $list = [];
    $tz = new DateTimeZone('Asia/Dhaka');
    $now = new DateTimeImmutable('now', $tz);
    // Earnings day follows the same 6 AM reset boundary as today().
    if ((int)$now->format('H') < 6) $now = $now->modify('-1 day');
    for ($i=6;$i>=0;$i--) {
        $d = $now->modify("-{$i} days");
        $list[] = $d->format('Y-m-d');
    }
    return $list;
}

function buildEarningsHistory(array $user): array {
    $history = [];
    $daily = $user['daily_earnings'] ?? [];
    foreach (getLast7DaysList() as $dateStr) {
        $dayNum = (new DateTimeImmutable($dateStr))->format('d');
        $earn = (float)($daily[$dateStr] ?? 0.00);
        $history[] = ['date' => $dayNum, 'full_date' => $dateStr, 'earn' => $earn];
    }
    return $history;
}

function userDefault(int $id, string $name = '', string $photo_url = ''): array
{
    return [
        'id' => $id, 'name' => $name ?: 'User',
        'photo_url' => $photo_url ?: '',
        'balance' => 0.00, 'earned' => 0.00,
        'referrals' => 0, 'ref_earned' => 0.00,
        'referrer' => null,
        'ad_views' => [],
        'daily_total_views' => 0,
        'daily_total_views_date' => getTodayDate(),
        'fake_count' => 0,
        'good_count' => 0,
        'last_active' => 0,
        'last_country' => 'BD',
        'country' => 'BD',
        'daily_earnings' => [],
        'banned' => false,
        'withdraw_state' => null, 'withdraw_method' => null, 'withdraw_account' => null,
        'created_at' => date('c')
    ];
}

function ensureUser(int $id, string $name = '', ?int $referrer = null, string $photo_url = ''): array
{
    $users = jsonRead(USERS_FILE);
    $key = (string)$id;
    if (!isset($users[$key])) {
        $users[$key] = userDefault($id, $name, $photo_url);
        if ($referrer && $referrer !== $id && isset($users[(string)$referrer])) {
            $users[$key]['referrer'] = $referrer;
            $users[(string)$referrer]['referrals'] = (int)$users[(string)$referrer]['referrals'] + 1;
        }
        jsonWrite(USERS_FILE, $users);
    } else {
        $updated = false;
        if ($name !== '' && $users[$key]['name'] !== $name) { $users[$key]['name'] = $name; $updated = true; }
        if ((!isset($users[$key]['photo_url']) || $users[$key]['photo_url'] === '' || $users[$key]['photo_url'] !== $photo_url) && $photo_url !== '') { $users[$key]['photo_url'] = $photo_url; $updated = true; }
        if (!isset($users[$key]['fake_count'])) { $users[$key]['fake_count'] = 0; $updated = true; }
        if (!isset($users[$key]['good_count'])) { $users[$key]['good_count'] = 0; $updated = true; }
        if (!isset($users[$key]['daily_earnings'])) { $users[$key]['daily_earnings'] = []; $updated = true; }
        if (!isset($users[$key]['banned'])) { $users[$key]['banned'] = false; $updated = true; }
        if (!isset($users[$key]['last_active'])) { $users[$key]['last_active'] = time(); $updated = true; }
        if ($updated) jsonWrite(USERS_FILE, $users);
    }
    return $users[$key];
}

function getUser(int $id): ?array { $users = jsonRead(USERS_FILE); return $users[(string)$id] ?? null; }
function saveUser(array $user): bool { $users = jsonRead(USERS_FILE); $users[(string)$user['id']] = $user; return jsonWrite(USERS_FILE, $users); }

function baseUrl(): string { 
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'https';
    $host = $_SERVER['HTTP_HOST'] ?? 'example.com'; 
    $path = $_SERVER['SCRIPT_NAME'] ?? '/bot.php'; 
    return $scheme . '://' . $host . $path; 
}

function validateInitData(string $initData): ?array
{
    if ($initData === '') return null;
    parse_str($initData, $data);
    $hash = $data['hash'] ?? '';
    if ($hash === '') return null;
    unset($data['hash']);
    ksort($data);
    $pairs = [];
    foreach ($data as $k => $v) $pairs[] = $k . '=' . $v;
    $checkString = implode("\n", $pairs);
    $secret = hash_hmac('sha256', BOT_TOKEN, 'WebAppData', true);
    $calc = hash_hmac('sha256', $checkString, $secret);
    if (!hash_equals($calc, $hash)) return null;
    $user = [];
    if (!empty($data['user'])) $user = json_decode($data['user'], true) ?: [];
    if (empty($user['id'])) return null;
    return $user;
}

function logDailyActive(int $userId, string $name): void {
    $today = getTodayDate();
    $active = jsonRead(DAILY_ACTIVE_FILE);
    if (!is_array($active)) $active = [];
    $found = false;
    foreach ($active as &$entry) {
        if ((int)($entry['id'] ?? 0) === $userId && ($entry['date'] ?? '') === $today) {
            $entry['last'] = time();
            $entry['views'] = (int)($entry['views'] ?? 0) + 1;
            $entry['name'] = $name;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $active[] = ['id'=>$userId,'name'=>$name,'date'=>$today,'views'=>1,'last'=>time()];
    }
    jsonWrite(DAILY_ACTIVE_FILE, $active);
}

function apiUser(): ?array
{
    $initData = '';
    $possibleHeaders = ['HTTP_X_TELEGRAM_INIT_DATA', 'HTTP_X_TELEGRAM_INITDATA', 'HTTP_TELEGRAM_INIT_DATA'];
    foreach ($possibleHeaders as $h) { if (!empty($_SERVER[$h])) { $initData = (string)$_SERVER[$h]; if ($initData !== '') break; } }
    if ($initData === '' && function_exists('getallheaders')) { 
        $headers = getallheaders(); 
        foreach ($headers as $k => $v) { 
            $lk = strtolower($k); 
            if ($lk === 'x-telegram-init-data' || $lk === 'x-telegram-initdata') { $initData = (string)$v; break; } 
        } 
    }
    if ($initData === '') $initData = (string)($_POST['initData'] ?? '');
    if ($initData === '') $initData = (string)($_GET['initData'] ?? '');
    if ($initData === '') {
        $raw = file_get_contents('php://input');
        if ($raw) {
            $j = json_decode($raw, true);
            if (is_array($j) && !empty($j['initData'])) $initData = (string)$j['initData'];
        }
    }
    $tgUser = validateInitData((string)$initData); 
    if (!$tgUser) return null;
    $ref = null; 
    if (!empty($_POST['start_param'])) $ref = (int)$_POST['start_param']; 
    if (!empty($_GET['start_param'])) $ref = (int)$_GET['start_param'];
    $photoUrl = (string)($tgUser['photo_url'] ?? '');
    $fullName = trim(($tgUser['first_name'] ?? '') . ' ' . ($tgUser['last_name'] ?? ''));
    if ($fullName === '') $fullName = (string)($tgUser['first_name'] ?? 'User');
    $apiUser = ensureUser((int)$tgUser['id'], $fullName, $ref, $photoUrl);
    // Keep Telegram's actual @username available for the User Ads Tracker only.
    $apiUser['telegram_username'] = trim((string)($tgUser['username'] ?? ''));
    return $apiUser;
}

function apiResponse(array $data, int $code = 200): never
{
    http_response_code($code); 
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0'); 
    echo json_encode($data, JSON_UNESCAPED_UNICODE); 
    exit;
}

function apiHandle(): never
{
    $payload = array_merge($_GET, $_POST);
    $action = (string)($payload['action'] ?? 'bootstrap');
    $user = apiUser(); 
    if (!$user) apiResponse(['ok' => false, 'message' => 'Telegram authentication failed. Open the app from Telegram.'], 401);
    if (!empty($user['banned'])) apiResponse(['ok' => false, 'message' => '🚫 Apni ban khaisen! Bot chalate parben na. Admin er sathe contact korun.', 'banned'=>true], 403);
    // === BOT STOP CHECK FOR MINI APP API ===
    $settingsMaintenanceApi = getSettings();
    if (!empty($settingsMaintenanceApi['bot_stopped']) && (int)$user['id'] !== ADMIN_ID) {
        $msg = $settingsMaintenanceApi['stop_message'] ?? "🚧 Bot Update চলতেছে!\n\n⏳ একটু Wait করেন!";
        apiResponse(['ok'=>false,'message'=>'BOT_STOPPED','stop_message'=>$msg,'maintenance'=>true], 403);
    }
    checkDailyReset();

    // User Ads Tracker: authenticated heartbeat and ad activity events.
    if ($action === 'tracker_heartbeat' || $action === 'tracker_event') {
        $tracker = jsonRead(ADS_TRACKER_FILE);
        if (!isset($tracker['users']) || !is_array($tracker['users'])) $tracker = ['users'=>[]];
        $uid = (string)(int)$user['id'];
        $todayTracker = today();
        $row = $tracker['users'][$uid] ?? [
            'id'=>(int)$user['id'], 'name'=>(string)($user['name'] ?? 'User'),
            'country_code'=>(string)($user['last_country'] ?? $user['country'] ?? 'BD'),
            'country_name'=>'', 'last_seen'=>0, 'daily_date'=>$todayTracker,
            'daily_views'=>0, 'daily_clicks'=>0, 'total_views'=>0, 'total_clicks'=>0, 'history'=>[]
        ];
        if (($row['daily_date'] ?? '') !== $todayTracker) {
            $row['daily_date'] = $todayTracker; $row['daily_views'] = 0; $row['daily_clicks'] = 0;
        }
        // Tracker shows the Telegram @username. If no username is set, show only 'User'.
        // This is derived from Telegram's validated initData, not from client-supplied labels.
        $telegramUsername = trim((string)($user['telegram_username'] ?? ''));
        $row['name'] = $telegramUsername !== '' ? '@' . ltrim($telegramUsername, '@') : 'User';
        $row['last_seen'] = time();
        $countryCode = strtoupper(trim((string)($payload['country_code'] ?? '')));
        $countryName = trim((string)($payload['country_name'] ?? ''));
        if ($countryCode !== '' && preg_match('/^[A-Z]{2}$/', $countryCode)) $row['country_code'] = $countryCode;
        if ($countryName !== '') $row['country_name'] = mb_substr($countryName, 0, 80);
        if ($action === 'tracker_event') {
            $event = (string)($payload['event'] ?? '');
            if ($event === 'view') { $row['daily_views']++; $row['total_views']++; }
            elseif ($event === 'click') { $row['daily_clicks']++; $row['total_clicks']++; }
            else apiResponse(['ok'=>false,'message'=>'Invalid tracker event'],400);
            $row['history'][] = ['event'=>$event,'time'=>time(),'date'=>$todayTracker];
            if (count($row['history']) > 100) $row['history'] = array_slice($row['history'], -100);
        }
        $tracker['users'][$uid] = $row;
        if (!jsonWrite(ADS_TRACKER_FILE, $tracker)) apiResponse(['ok'=>false,'message'=>'Tracker save failed'],500);
        apiResponse(['ok'=>true]);
    }

    $isAdmin = ((int)$user['id'] === ADMIN_ID);
    if (str_starts_with($action, 'admin_')) {
        if (!$isAdmin) apiResponse(['ok' => false, 'message' => 'Admin access denied.'], 403);
        $settings = getSettings();

        if ($action === 'admin_get_settings') {
            apiResponse(['ok'=>true,'settings'=>[
                'poro_reward'=>(float)$settings['poro_reward'],
                'lijent_reward'=>(float)$settings['lijent_reward'],
                'poro_limit'=>(int)$settings['poro_limit'],
                'lijent_limit'=>(int)$settings['lijent_limit'],
                'min_withdraw'=>(float)$settings['min_withdraw'],
                'min_usdt'=>(float)($settings['min_usdt'] ?? 1.00),
                'min_recharge'=>(float)($settings['min_recharge'] ?? 20.00),
                'payment_methods'=>(string)($settings['payment_methods'] ?? 'bk,ng,rk'),
                'allowed_countries'=>$settings['allowed_countries'],
                'allowed_country_names'=>$settings['allowed_country_names'] ?? implode(', ', $settings['allowed_countries']),
                'welcome_notice'=>$settings['welcome_notice'] ?? '',
                'earning_popup'=>$settings['earning_popup'] ?? '',
                'bonus_text'=>$settings['bonus_text'] ?? '',
                'monetag_code'=>(string)($settings['monetag_code'] ?? ''),
                'adspark_code'=>(string)($settings['adspark_code'] ?? ''),
                'notice_ad_set'=>(int)($settings['notice_ad_set'] ?? 5),
                'notice_add_second_set'=>(float)($settings['notice_add_second_set'] ?? 30),
                'home_notice'=>(string)($settings['home_notice'] ?? ''),
                'home_notice_country'=>(string)($settings['home_notice_country'] ?? 'Australia'),
                'home_notice_text'=>(string)($settings['home_notice_text'] ?? ''),
                'bot_stopped'=>(bool)($settings['bot_stopped'] ?? false),
                'stop_message'=>(string)($settings['stop_message'] ?? '')
            ]]);
        }
        if ($action === 'admin_save_settings') {
            $raw = (string)($_POST['settings'] ?? $_GET['settings'] ?? '');
            if ($raw !== '') {
                $p = json_decode($raw, true);
                if (is_array($p)) {
                    if (isset($p['poro_reward'])) $settings['poro_reward'] = (float)$p['poro_reward'];
                    if (isset($p['lijent_reward'])) $settings['lijent_reward'] = (float)$p['lijent_reward'];
                    if (isset($p['poro_limit'])) $settings['poro_limit'] = (int)$p['poro_limit'];
                    if (isset($p['lijent_limit'])) $settings['lijent_limit'] = (int)$p['lijent_limit'];
                    if (isset($p['next_poro_limit'])) $settings['next_poro_limit'] = (int)$p['next_poro_limit'];
                    if (isset($p['next_lijent_limit'])) $settings['next_lijent_limit'] = (int)$p['next_lijent_limit'];                                                         
                    if (isset($p['min_withdraw'])) $settings['min_withdraw'] = (float)$p['min_withdraw'];
                    if (isset($p['min_usdt'])) $settings['min_usdt'] = (float)$p['min_usdt'];
                    if (isset($p['min_recharge'])) $settings['min_recharge'] = (float)$p['min_recharge'];
                    if (isset($p['payment_methods'])) {
                        $methodsRaw = trim((string)$p['payment_methods']);
                        $parts = preg_split('/[,]+/', $methodsRaw);
                        $cleanMethods = [];
                        $aliases = [
                            'bkas'=>'bk','bkash'=>'bk','bk'=>'bk',
                            'ng'=>'ng','nk'=>'ng','nagad'=>'ng',
                            'rk'=>'rk','rocket'=>'rk',
                            'bc'=>'bc','binance'=>'bc',
                            'rc'=>'rc','recharge'=>'rc','mobile_recharge'=>'rc','mobile recharge'=>'rc'
                        ];
                        foreach ($parts as $part) {
                            $part = strtolower(trim((string)$part));
                            if ($part === '') continue;
                            $code = $aliases[$part] ?? preg_replace('/[^a-z0-9_-]/', '', $part);
                            if ($code !== '' && !in_array($code, $cleanMethods, true)) $cleanMethods[] = $code;
                        }
                        if (!$cleanMethods) apiResponse(['ok'=>false,'message'=>'No valid payment method found.'],400);
                        $settings['payment_methods'] = implode(',', $cleanMethods);
                    }
                    if (isset($p['bot_stopped'])) $settings['bot_stopped'] = (bool)$p['bot_stopped'];
                    if (array_key_exists('stop_message', $p)) $settings['stop_message'] = trim((string)$p['stop_message']);
                    if (array_key_exists('monetag_code', $p)) $settings['monetag_code'] = trim((string)$p['monetag_code']);
                    if (array_key_exists('adspark_code', $p)) $settings['adspark_code'] = trim((string)$p['adspark_code']);
                    if (isset($p['notice_ad_set'])) {
                        $noticeAdSet = (int)$p['notice_ad_set'];
                        if ($noticeAdSet < 1) $noticeAdSet = 5;
                        $settings['notice_ad_set'] = $noticeAdSet;
                    }
                    if (isset($p['home_notice'])) $settings['home_notice'] = (string)$p['home_notice'];
                    if (isset($p['home_notice_country'])) $settings['home_notice_country'] = trim((string)$p['home_notice_country']);
                    if (isset($p['home_notice_text'])) $settings['home_notice_text'] = (string)$p['home_notice_text'];
                    if (isset($p['notice_add_second_set'])) {                        $noticeAddSecondSet = (float)$p['notice_add_second_set'];
                        if ($noticeAddSecondSet < 1) $noticeAddSecondSet = 30;
                        $settings['notice_add_second_set'] = $noticeAddSecondSet;
                    }
                    if (isset($p['allowed_countries'])) {
                        $codes = $p['allowed_countries'];
                        if (is_string($codes)) $codes = explode(',', $codes);
                        $codes = array_values(array_unique(array_filter(array_map(fn($c)=>strtoupper(trim((string)$c)), (array)$codes), fn($c)=>preg_match('/^[A-Z]{2}$/',$c))));
                        if ($codes) $settings['allowed_countries'] = $codes;
                    }
                    $settings['allowed_country_names'] = implode(', ', $settings['allowed_countries']);
                    $settings['updated_at'] = date('c');
                    if (!saveSettings($settings)) apiResponse(['ok'=>false,'message'=>'Could not save settings.'],500);
                    apiResponse(['ok'=>true,'message'=>'Settings saved.','settings'=>$settings]);
                }
            }
            apiResponse(['ok'=>false,'message'=>'Invalid data'],400);
        }
        if ($action === 'admin_get_withdraws') {
            $status = (string)($_GET['status'] ?? $_POST['status'] ?? 'all');
            $withdraws = jsonRead(WITHDRAWS_FILE);
            $list = array_values($withdraws);
            if ($status !== 'all') {
                $list = array_filter($list, fn($w)=>($w['status']??'')===$status);
                $list = array_values($list);
            }
            usort($list, fn($a,$b)=>strtotime($b['created_at']??'')<=>strtotime($a['created_at']??''));
            apiResponse(['ok'=>true,'withdraws'=>$list]);
        }
        if ($action === 'admin_withdraw_process') {
            $id = preg_replace('/[^a-f0-9]/','',(string)($_POST['id']??$_GET['id']??''));
            $decision = strtolower(trim((string)($_POST['decision']??$_GET['decision']??'')));
            if (!in_array($decision,['approve','reject'],true)) apiResponse(['ok'=>false,'message'=>'Invalid decision.'],400);
            $withdraws = jsonRead(WITHDRAWS_FILE);
            if (!isset($withdraws[$id]) || ($withdraws[$id]['status']??'')!=='pending') apiResponse(['ok'=>false,'message'=>'Pending withdrawal not found.'],404);
            $w = $withdraws[$id]; $uid = (int)$w['user_id']; $users = jsonRead(USERS_FILE);
            if (!isset($users[(string)$uid])) apiResponse(['ok'=>false,'message'=>'User not found.'],404);
            // Balance already deducted at request time, so no need to deduct again on approve/reject
            // User chay approve/reject korleo balance back jabe na, okhanei ses
            if ($decision==='approve') {
                // No deduction here - already deducted
            }
            $users[(string)$uid]['withdraw_state'] = null;
            $users[(string)$uid]['withdraw_method'] = null;
            $users[(string)$uid]['withdraw_account'] = null;
            if (!jsonWrite(USERS_FILE,$users)) apiResponse(['ok'=>false,'message'=>'Could not update user.'],500);
            $withdraws[$id]['status'] = $decision==='approve'?'approved':'rejected';
            $withdraws[$id]['processed_at'] = date('c');
            jsonWrite(WITHDRAWS_FILE,$withdraws);
            $userMethod = paymentMethodLabel((string)($w['method'] ?? ''));
            $isBinanceNotice = strtolower((string)($w['method'] ?? '')) === 'bc';
            $userAmount = money((float)($w['amount'] ?? 0));
            $userAmountLabel = $isBinanceNotice ? ($userAmount . ' USDT') : ($userAmount . ' TK');
            $userAccount = esc((string)($w['account'] ?? ''));
            if ($decision === 'approve') {
                $userNotice = "🎉 <b>Withdrawal Approved!</b>\n\n".
                              "💰 Amount: <b>".$userAmountLabel."</b>\n".
                              "💳 Method: <b>".esc($userMethod)."</b>\n".
                              "📱 Account: <code>".$userAccount."</code>\n\n".
                              "✅ আপনার withdrawal request admin approve করেছে।";
            } else {
                $userNotice = "❌ <b>Withdrawal Rejected!</b>\n\n".
                              "💰 Amount: <b>".$userAmountLabel."</b>\n".
                              "💳 Method: <b>".esc($userMethod)."</b>\n".
                              "📱 Account: <code>".$userAccount."</code>\n\n".
                              "⚠️ আপনার withdrawal request admin reject করেছে।";
            }
            tg('sendMessage', ['chat_id' => $uid, 'text' => $userNotice, 'parse_mode' => 'HTML']);
            apiResponse(['ok'=>true,'message'=>'Withdrawal '.$decision.'.']);
        }
        if ($action === 'get_user_balance') {
            // REALTIME FIX: force fresh, no cache
            fb_cache_invalidate('json_users');
            try { firebase_load('users'); } catch(Throwable $e) {}
            // Add no-cache headers
            header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
            header('Pragma: no-cache');
            $freshBalanceUser = getUser((int)$user['id']);
            // If getUser still cached, reload directly from Firebase/file
            if(!$freshBalanceUser){
                $all = jsonRead(USERS_FILE);
                $freshBalanceUser = $all[(string)(int)$user['id']] ?? null;
            }
            if(!$freshBalanceUser){
                try {
                    $fb = firebase_load('users/'.(int)$user['id']);
                    if(is_array($fb)) $freshBalanceUser = $fb;
                } catch(Throwable $e) {}
            }
            if(!$freshBalanceUser) apiResponse(['ok'=>false,'message'=>'User not found'],404);
            $freshDay = today();
            apiResponse([
                'ok'=>true,
                'balance'=>(float)($freshBalanceUser['balance'] ?? 0),
                'earned'=>(float)($freshBalanceUser['earned'] ?? 0),
                'daily_total_views'=>(int)(($freshBalanceUser['daily_total_views_date'] ?? '') === $freshDay ? ($freshBalanceUser['daily_total_views'] ?? 0) : 0),
                'total_views'=>(int)(($freshBalanceUser['daily_total_views_date'] ?? '') === $freshDay ? ($freshBalanceUser['daily_total_views'] ?? 0) : 0),
                'daily_earnings'=>buildEarningsHistory($freshBalanceUser),
                'good_count'=>(int)($freshBalanceUser['good_count'] ?? 0),
                'fake_count'=>(int)($freshBalanceUser['fake_count'] ?? 0),
                'referrals'=>(int)($freshBalanceUser['referrals'] ?? 0),
                'timestamp'=>time(),
                'realtime'=>true
            ]);
        }
        if ($action === 'admin_get_users') {
            fb_cache_invalidate('json_users');
            $users = jsonRead(USERS_FILE);
            // Merge Firebase fresh if available
            try {
                $fbUsers = firebase_load('users');
                if(is_array($fbUsers) && count($fbUsers)>count($users)) $users = $fbUsers;
            } catch(Throwable $e) {}
            $list = array_values($users);
            foreach ($list as &$u) {
                $last = (int)($u['last_active'] ?? 0);
                $u['is_online'] = (time() - $last) < 300;
            }
            usort($list, fn($a,$b)=>(float)($b['balance']??0) <=> (float)($a['balance']??0));
            header('Cache-Control: no-store, no-cache, must-revalidate');
            apiResponse(['ok'=>true,'users'=>array_slice($list,0,200),'realtime'=>true,'timestamp'=>time()]);
        }
        if ($action === 'admin_edit_user') {
            $uid = (int)($_POST['user_id'] ?? $_GET['user_id'] ?? 0);
            $newBal = isset($_POST['balance']) ? (float)$_POST['balance'] : (isset($_GET['balance']) ? (float)$_GET['balance'] : null);
            $ban = isset($_POST['ban']) ? (string)$_POST['ban'] : (isset($_GET['ban']) ? (string)$_GET['ban'] : null);
            // REALTIME FIX: invalidate cache first to get fresh data
            fb_cache_invalidate('json_users');
            try { fb_cache_invalidate('json_'.'users'); } catch(Throwable $e) {}
            $users = jsonRead(USERS_FILE);
            // Try fresh from Firebase if available (bypass cache)
            try {
                $fbUsers = firebase_load('users');
                if(is_array($fbUsers) && !empty($fbUsers)) $users = $fbUsers;
            } catch(Throwable $e) {}
            if (!$uid || !isset($users[(string)$uid])) apiResponse(['ok'=>false,'message'=>'User not found.'],404);
            if ($newBal !== null) {
                $users[(string)$uid]['balance'] = $newBal;
                // Also ensure earned keeps sync if balance edited
                if(!isset($users[(string)$uid]['earned'])) $users[(string)$uid]['earned'] = $newBal;
            }
            if ($ban !== null) $users[(string)$uid]['banned'] = ($ban==='1' || $ban==='true');
            // Force write without cache delay
            fb_cache_invalidate('json_users');
            $users[(string)$uid]['last_balance_update'] = time();
            if (!jsonWrite(USERS_FILE,$users)) apiResponse(['ok'=>false,'message'=>'Save failed'],500);
            // REALTIME FIX: push to Firebase instantly + invalidate all caches
            try {
                firebase_save('users', $users);
                // Also push single user realtime node for onValue listeners
                firebase_save('users/'.$uid, $users[(string)$uid]);
            } catch(Throwable $e) {}
            fb_cache_invalidate('json_users');
            try { fb_cache_invalidate('all'); } catch(Throwable $e) {}
            // Return new balance instantly
            $updated = $users[(string)$uid];
            apiResponse([
                'ok'=>true,
                'message'=>'User updated - Realtime pushed',
                'user'=>$updated,
                'balance'=>(float)($updated['balance']??0),
                'earned'=>(float)($updated['earned']??0),
                'realtime'=>true,
                'timestamp'=>time()
            ]);
        }
        if ($action === 'admin_reset_all_ads') {
            $users = jsonRead(USERS_FILE);
            $day = today();
            foreach ($users as $k=>&$u) { $u['ad_views'][$day] = []; }
            jsonWrite(USERS_FILE,$users);
            jsonWrite(SESSIONS_FILE,[]);
            // Daily Active reset hobe na - oita vor 6 tay nijei reset hobe
            apiResponse(['ok'=>true,'message'=>'All ads reset for today ('.$day.') - Daily Active reset hoy nai, vor 6 tay nije reset hobe']);
        }
        if ($action === 'admin_save_payment_methods') {
            $methodsRaw = trim((string)($payload['methods'] ?? ''));
            if ($methodsRaw === '') apiResponse(['ok'=>false,'message'=>'Payment methods cannot be empty.'],400);
            $parts = preg_split('/[,]+/', $methodsRaw);
            $clean = [];
            $aliases = [
                'bkas'=>'bk','bkash'=>'bk','bk'=>'bk',
                'ng'=>'ng','nk'=>'ng','nagad'=>'ng',
                'rk'=>'rk','rocket'=>'rk',
                'bc'=>'bc','binance'=>'bc'
            ];
            foreach ($parts as $part) {
                $part = strtolower(trim((string)$part));
                if ($part === '') continue;
                $code = $aliases[$part] ?? preg_replace('/[^a-z0-9_-]/', '', $part);
                if ($code !== '' && !in_array($code, $clean, true)) $clean[] = $code;
            }
            if (!$clean) apiResponse(['ok'=>false,'message'=>'No valid payment method found.'],400);
            $settings = getSettings();
            $settings['payment_methods'] = implode(',', $clean);
            $settings['updated_at'] = date('c');
            if (!saveSettings($settings)) apiResponse(['ok'=>false,'message'=>'Could not save payment methods.'],500);
            apiResponse(['ok'=>true,'message'=>'Payment methods saved: '.$settings['payment_methods'],'payment_methods'=>$settings['payment_methods']]);
        }
        if ($action === 'admin_search_user') {
            $searchIdRaw = trim($payload['user_id'] ?? '');
            $searchId = (string)$searchIdRaw;
            $users = jsonRead(USERS_FILE);
            $u = $users[$searchId] ?? null;
            if (!$u) {
                // Try int key, try loop search
                foreach ($users as $k=>$v) {
                    if ((string)($v['id'] ?? '') === $searchId || (string)$k === $searchId) { $u=$v; break; }
                }
            }
            if (!$u) {
                // Admin ID may not be in users yet, create dummy entry so search works
                if ($searchId === (string)ADMIN_UID || $searchId === '6560485203') {
                    $u = ['id'=>(int)$searchId,'name'=>'Admin','balance'=>0,'good_count'=>0,'fake_count'=>0,'last_country'=>'BD','country'=>'BD','banned'=>false,'last_active'=>time(),'is_online'=>true];
                }
            }
            if (!$u) apiResponse(['ok'=>false,'message'=>'User not found ID: '.$searchId],404);
            $last = (int)($u['last_active'] ?? 0);
            $u['is_online'] = (time() - $last) < 300;
            if (!isset($u['last_country'])) $u['last_country'] = $u['country'] ?? 'BD';
            apiResponse(['ok'=>true,'user'=>$u]);
        }
        if ($action === 'admin_reset_all_user_data') {
            $users = jsonRead(USERS_FILE);
            foreach ($users as $k=>&$u) {
                $u['ad_views'] = [];
                $u['withdraw_state'] = null;
                $u['withdraw_method'] = null;
                $u['withdraw_account'] = null;
            }
            jsonWrite(USERS_FILE, $users);
            jsonWrite(WITHDRAWS_FILE, []);
            jsonWrite(SESSIONS_FILE, []);
            jsonWrite(DAILY_ACTIVE_FILE, []);
            apiResponse(['ok'=>true,'message'=>'All user data reset done - withdraw requests, history, daily active cleared. Balance, Good, Fake, Referrals untouched.']);
        }
        if ($action === 'admin_save_notices') {
            $settings = getSettings();
            if (isset($_POST['welcome_notice'])) $settings['welcome_notice'] = (string)$_POST['welcome_notice'];
            if (isset($_POST['earning_popup'])) $settings['earning_popup'] = (string)$_POST['earning_popup'];
            if (isset($_POST['bonus_text'])) $settings['bonus_text'] = (string)$_POST['bonus_text'];
            if (!saveSettings($settings)) apiResponse(['ok'=>false,'message'=>'Save failed'],500);
            apiResponse(['ok'=>true,'message'=>'Notices saved','settings'=>$settings]);
        }
        if ($action === 'admin_get_ads_tracker') {
            $tracker = jsonRead(ADS_TRACKER_FILE);
            $tracked = is_array($tracker['users'] ?? null) ? $tracker['users'] : [];
            $users = jsonRead(USERS_FILE);
            $online = [];
            $now = time();
            foreach ($tracked as $uid => $row) {
                $lastSeen = (int)($row['last_seen'] ?? 0);
                if ($lastSeen <= 0 || ($now - $lastSeen) > 90) continue;
                $userInfo = $users[(string)$uid] ?? [];
                $date = today();
                $dailyDate = (string)($row['daily_date'] ?? '');
                $dailyViews = $dailyDate === $date ? (int)($row['daily_views'] ?? 0) : 0;
                $dailyClicks = $dailyDate === $date ? (int)($row['daily_clicks'] ?? 0) : 0;
                $code = strtoupper((string)($row['country_code'] ?? $userInfo['last_country'] ?? $userInfo['country'] ?? 'BD'));
                $online[] = [
                    'id'=>(int)($row['id'] ?? $uid), 'name'=>(string)($row['name'] ?? $userInfo['name'] ?? 'User'),
                    'country_code'=>$code, 'country_name'=>(string)($row['country_name'] ?? ''),
                    'daily_views'=>$dailyViews, 'daily_clicks'=>$dailyClicks,
                    'total_views'=>(int)($row['total_views'] ?? 0), 'total_clicks'=>(int)($row['total_clicks'] ?? 0),
                    'last_seen'=>$lastSeen, 'history'=>array_slice(is_array($row['history'] ?? null) ? $row['history'] : [], -20)
                ];
            }
            usort($online, fn($a,$b)=>$b['last_seen']<=>$a['last_seen']);
            apiResponse(['ok'=>true,'users'=>$online,'date'=>today(),'online_window_seconds'=>90]);
        }
        if ($action === 'admin_get_daily_active') {
            $today = today();
            $dailyData = jsonRead(DAILY_ACTIVE_FILE);
            $active = [];
            $users = jsonRead(USERS_FILE);
            foreach ($dailyData as $entry) {
                if (($entry['date'] ?? '') !== $today) continue;
                $uid = (int)($entry['id'] ?? 0);
                $u = $users[(string)$uid] ?? null;
                $lastActive = (int)($u['last_active'] ?? $entry['last'] ?? 0);
                $isOnline = (time() - $lastActive) < 300; // 5 min er moddhe thakle sobuj, na hole holud
                $active[] = [
                    'id'=>$uid,
                    'name'=>$entry['name']??$u['name']??'User',
                    'views'=>(int)($entry['views']??0),
                    'balance'=>(float)($u['balance']??0),
                    'last'=>(int)($entry['last']??0),
                    'last_active'=>$lastActive,
                    'is_online'=>$isOnline,
                    'photo_url'=>$u['photo_url']??''
                ];
            }
            usort($active, fn($a,$b)=>$b['last']<=>$a['last']);
            apiResponse(['ok'=>true,'active'=>$active,'date'=>$today]);
        }
        // === BONUS TASKS ADMIN - FIXED INSIDE ADMIN BLOCK ===
        if ($action === 'admin_bonus_get') {
            $tasks = jsonRead(BONUS_TASKS_FILE);
            foreach ($tasks as &$t) {
                $t['task_type'] = (isset($t['task_type']) && $t['task_type'] === 'video') ? 'video' : 'subscribe';
                $t['required_watch_time'] = max(0.15, min(3600, (float)($t['required_watch_time'] ?? 5)));
            }
            unset($t);
            apiResponse(['ok'=>true,'tasks'=>array_values($tasks)]);
        }
        if ($action === 'admin_bonus_add') {
            $title = trim((string)($_POST['title'] ?? $_GET['title'] ?? ''));
            $url = trim((string)($_POST['url'] ?? $_GET['url'] ?? ''));
            $reward = (float)($_POST['reward'] ?? $_GET['reward'] ?? 0.5);
            $taskType = (string)($_POST['task_type'] ?? $_GET['task_type'] ?? 'subscribe');
            if (!in_array($taskType, ['subscribe','video'], true)) $taskType = 'subscribe';
            $requiredWatchTime = (float)($_POST['required_watch_time'] ?? $_GET['required_watch_time'] ?? 5);
            if ($requiredWatchTime < 0.15 || $requiredWatchTime > 3600) $requiredWatchTime = 5;
            if ($reward <= 0) $reward = 0.5;
            if ($title === '') $title = 'Bonus Task';
            if ($url === '') apiResponse(['ok'=>false,'message'=>'URL lagbe'],400);
            if (!file_exists(BONUS_TASKS_FILE)) {
                file_put_contents(BONUS_TASKS_FILE, '{}', LOCK_EX);
                @chmod(BONUS_TASKS_FILE, 0666);
            }
            $tasks = jsonRead(BONUS_TASKS_FILE);
            $id = 'task_'.bin2hex(random_bytes(4));
            $tasks[$id] = ['id'=>$id,'title'=>$title,'url'=>$url,'reward'=>$reward,'task_type'=>$taskType,'required_watch_time'=>$requiredWatchTime,'created_at'=>date('c')];
            if (!jsonWrite(BONUS_TASKS_FILE,$tasks)) {
                $ok = file_put_contents(BONUS_TASKS_FILE, json_encode($tasks, JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE), LOCK_EX);
                if ($ok === false) apiResponse(['ok'=>false,'message'=>'File write failed - data folder permission 777 korun'],500);
            }
            apiResponse(['ok'=>true,'message'=>'Task added ✅','task'=>$tasks[$id]]);
        }
        if ($action === 'admin_bonus_delete') {
            $id = (string)($_POST['id'] ?? $_GET['id'] ?? '');
            $tasks = jsonRead(BONUS_TASKS_FILE);
            if (!isset($tasks[$id])) apiResponse(['ok'=>false,'message'=>'Not found'],404);
            unset($tasks[$id]);
            jsonWrite(BONUS_TASKS_FILE,$tasks);
            apiResponse(['ok'=>true,'message'=>'Task deleted']);
        }
        apiResponse(['ok'=>false,'message'=>'Unknown admin action'],400);
    }

    if ($action === 'fake_log') {
        $fresh = getUser((int)$user['id']);
        if (!$fresh) apiResponse(['ok' => false, 'message' => 'User not found.'], 404);
        $fresh['fake_count'] = (int)($fresh['fake_count'] ?? 0) + 1;
        saveUser($fresh);
        apiResponse(['ok' => true, 'fake_count' => $fresh['fake_count'], 'good_count' => $fresh['good_count'] ?? 0]);
    }
    if ($action === 'checkCountry') {
        $settings = getSettings(); $allowed = $settings['allowed_countries'] ?? ['BD'];
        $clientIp = getClientIP(); $country = getCountryFromIP($clientIp); $allowedFlag = true; $msg = '';
        if ($country && !empty($allowed) && !in_array($country['code'], $allowed, true)) { $allowedFlag = false; $msg = "Location blocked! You are from {$country['name']} ({$country['code']})."; }
        apiResponse(['ok' => true, 'allowed' => $allowedFlag, 'user_country' => $country, 'allowed_countries' => $allowed, 'message' => $msg, 'client_ip' => $clientIp]);
    }
    if ($action === 'ad_start') {
        $task = (string)($_GET['task'] ?? $_POST['task'] ?? 'poro');
        if (!in_array($task, ['poro', 'lijent'], true)) apiResponse(['ok'=>false,'message'=>'Invalid ad network.'],400);
        $fresh = getUser((int)$user['id']);
        if (!$fresh) apiResponse(['ok'=>false,'message'=>'User not found.'],404);
        if (!empty($fresh['banned'])) apiResponse(['ok'=>false,'message'=>'You are banned.'],403);
        $nextAdNumber = (int)($fresh['good_count'] ?? 0) + 1;
        $settings = getSettings();
        $noticeAdSet = max(1, (int)($settings['notice_ad_set'] ?? 5));
        $strict = ($nextAdNumber % $noticeAdSet === 0);
        $noticeAddSecondSet = max(1, (float)($settings['notice_add_second_set'] ?? 30));
        $sessions = jsonRead(SESSIONS_FILE);
        $uid = (string)$fresh['id'];
        if (!isset($sessions[$uid]) || !is_array($sessions[$uid])) $sessions[$uid] = [];
        $sessions[$uid] = [
            'task' => $task,
            'started_at' => microtime(true),
            'required_seconds' => $strict ? $noticeAddSecondSet : 15,
            'strict' => $strict,
            'ad_number' => $nextAdNumber
        ];
        jsonWrite(SESSIONS_FILE, $sessions);
        apiResponse(['ok'=>true,'strict'=>$strict,'required_seconds'=>$strict ? $noticeAddSecondSet : 15,'ad_number'=>$nextAdNumber]);
    }

    if ($action === 'reward') {
        $task = (string)($_GET['task'] ?? $_POST['task'] ?? 'poro'); 
        $fresh = getUser((int)$user['id']);
        if (!$fresh) apiResponse(['ok' => false, 'message' => 'User not found.'], 404);
        if (!empty($fresh['banned'])) apiResponse(['ok'=>false,'message'=>'You are banned.'],403);
        $sessions = jsonRead(SESSIONS_FILE);
        $uid = (string)$fresh['id'];
        $session = (isset($sessions[$uid]) && is_array($sessions[$uid])) ? $sessions[$uid] : null;
        if (!$session || ($session['task'] ?? '') !== $task) {
            apiResponse(['ok'=>false,'message'=>'Ad session missing. Please watch the ad again.'],400);
        }
        $requiredSeconds = (float)($session['required_seconds'] ?? 15);
        $startedAt = (float)($session['started_at'] ?? 0);
        $elapsed = microtime(true) - $startedAt;
        if ($elapsed + 0.05 < $requiredSeconds) {
            unset($sessions[$uid]);
            jsonWrite(SESSIONS_FILE, $sessions);
            $msg = !empty($session['strict']) ? 'Vul kaj! Puro 30 second ad dekhte hobe.' : 'Vul kaj! Puro ad dekhte hobe.';
            apiResponse(['ok'=>false,'message'=>$msg,'required_seconds'=>$requiredSeconds,'watched_seconds'=>round($elapsed,1)],400);
        }
        unset($sessions[$uid]);
        jsonWrite(SESSIONS_FILE, $sessions);
        $settings = getSettings();
        // Ad Network Control: an empty network code means that network is OFF.
        if (!in_array($task, ['poro', 'lijent'], true)) apiResponse(['ok'=>false,'message'=>'Invalid ad network.'],400);
        $networkCode = $task === 'poro' ? trim((string)($settings['monetag_code'] ?? '')) : trim((string)($settings['adspark_code'] ?? ''));
        if ($networkCode === '') {
            $networkName = $task === 'poro' ? 'Poro' : 'Lijent';
            apiResponse(['ok'=>false,'message'=>'Ad SDK akhono add kora hoy nai.']);
        }
        // FIXED: Country check fast, no long wait
        $day = today(); 
        // Update last_active for online status
        $fresh['last_active'] = time();
        $usersTmp = jsonRead(USERS_FILE);
        if (isset($usersTmp[(string)$fresh['id']])) {
            $usersTmp[(string)$fresh['id']]['last_active'] = time();
            jsonWrite(USERS_FILE, $usersTmp);
        }
        logDailyActive((int)$fresh['id'], $fresh['name'] ?? 'User');
        $dayViews = $fresh['ad_views'][$day] ?? [];
        $poroCount = 0; $lijentCount = 0;
        foreach ($dayViews as $k => $v) {
            if (str_starts_with((string)$k, 'poro_')) $poroCount++;
            elseif (str_starts_with((string)$k, 'lijent_')) $lijentCount++;
        }
        $poroLim = (int)($settings['poro_limit'] ?? 100); $lijentLim = (int)($settings['lijent_limit'] ?? 100);
        if ($task === 'poro' && $poroCount >= $poroLim) apiResponse(['ok' => false, 'message' => 'Poro limit ses! '.$poroLim.'/'.$poroLim.' - 6AM por abar parben']);
        if ($task === 'lijent' && $lijentCount >= $lijentLim) apiResponse(['ok' => false, 'message' => 'Lijent limit ses! '.$lijentLim.'/'.$lijentLim.' - 6AM por abar parben']);
        $totalLimit = $poroLim + $lijentLim;
        $todayCount = $poroCount + $lijentCount;
        if ($todayCount >= $totalLimit) apiResponse(['ok' => false, 'message' => 'Daily limit ses!']);

        // FIXED: Cooldown 2 sec only - no more Claiming stuck
        $lastView = 0; if (!empty($fresh['ad_views'][$day])) $lastView = max(array_values($fresh['ad_views'][$day]));
        if (time() - $lastView < 2) { apiResponse(['ok' => false, 'message' => 'Ektu wait korun 2s...']); }

        if ($task === 'lijent') $reward = (float)($settings['lijent_reward'] ?? 7.00); else $reward = (float)($settings['poro_reward'] ?? 5.00);
        if (!isset($fresh['ad_views'][$day])) $fresh['ad_views'][$day] = [];
        $fresh['ad_views'][$day][$task . '_' . time() . '_' . bin2hex(random_bytes(3))] = time();
        $fresh['balance'] = (float)$fresh['balance'] + $reward; $fresh['earned'] = (float)$fresh['earned'] + $reward;
        $fresh['good_count'] = (int)($fresh['good_count'] ?? 0) + 1;

        // Daily TOTAL VIEW is separate from Good/Fake and from per-network daily limits.
        // It is never cleared by Admin Reset All Ads; it resets automatically at 6 AM.
        if (($fresh['daily_total_views_date'] ?? '') !== $day) {
            $fresh['daily_total_views'] = 0;
            $fresh['daily_total_views_date'] = $day;
        }
        $fresh['daily_total_views'] = (int)($fresh['daily_total_views'] ?? 0) + 1;

        if (!isset($fresh['daily_earnings'])) $fresh['daily_earnings'] = [];
        if (!isset($fresh['daily_earnings'][$day])) $fresh['daily_earnings'][$day] = 0.00;
        $fresh['daily_earnings'][$day] = (float)$fresh['daily_earnings'][$day] + $reward;
        // REALTIME FIX: invalidate cache before saving
        fb_cache_invalidate('json_users');
        if (!empty($fresh['referrer'])) {
            $users = jsonRead(USERS_FILE); $refId = (string)$fresh['referrer'];
            if (isset($users[$refId])) {
                $refBonus = round($reward * (float)(getSettings()['referral_rate'] ?? REFERRAL_RATE), 2);
                $users[$refId]['balance'] += $refBonus; $users[$refId]['earned'] += $refBonus; $users[$refId]['ref_earned'] = (float)($users[$refId]['ref_earned'] ?? 0) + $refBonus;
                $users[(string)$fresh['id']] = $fresh; jsonWrite(USERS_FILE, $users);
            } else { saveUser($fresh); }
        } else { saveUser($fresh); }
        apiResponse(['ok' => true, 'message' => 'Reward added! +' . $reward . ' TK', 'reward' => $reward, 'balance' => $fresh['balance'], 'good_count' => $fresh['good_count'], 'fake_count' => $fresh['fake_count'] ?? 0, 'daily_total_views' => (int)($fresh['daily_total_views'] ?? 0), 'daily_earnings' => buildEarningsHistory($fresh)]);
    }
    if ($action === 'bootstrap') {
        $fresh = getUser((int)$user['id']);
        $users = jsonRead(USERS_FILE);
        // Update last_active and store the user's current IP country + FIX User name if it's 'User'
        if (isset($users[(string)$user['id']])) {
            $currentIpCountry = getCountryFromIP(getClientIP());
            $detectedCountry = is_array($currentIpCountry)
                ? ($currentIpCountry['code'] ?? ($users[(string)$user['id']]['last_country'] ?? 'BD'))
                : ($users[(string)$user['id']]['last_country'] ?? 'BD');

            $users[(string)$user['id']]['last_active'] = time();
            $users[(string)$user['id']]['last_country'] = $detectedCountry;
            $users[(string)$user['id']]['country'] = $detectedCountry;
            // FIX: If saved name is 'User' or empty, update with real Telegram name
            $currentName = trim((string)($user['name'] ?? ''));
            $savedName = trim((string)($users[(string)$user['id']]['name'] ?? ''));
            if ($currentName !== '' && ($savedName === '' || strtolower($savedName) === 'user')) {
                $users[(string)$user['id']]['name'] = $currentName;
            }
            // Also update photo if empty
            if (empty($users[(string)$user['id']]['photo_url']) && !empty($user['photo_url'])) {
                $users[(string)$user['id']]['photo_url'] = $user['photo_url'];
            }
            jsonWrite(USERS_FILE, $users);
            logDailyActive((int)$user['id'], $users[(string)$user['id']]['name'] ?? $user['name'] ?? 'User');
        }
        $refTop = array_values($users); usort($refTop, fn($a,$b)=>(int)($b['referrals'] ?? 0) <=> (int)($a['referrals'] ?? 0));
        $topReferrers = array_slice(array_map(fn($x)=>['id'=>(int)($x['id']??0),'name'=>$x['name']??'User','referrals'=>(int)($x['referrals']??0),'photo_url'=>$x['photo_url']??''], $refTop),0,10);
        $earnTop = array_values($users); usort($earnTop, fn($a,$b)=>(float)($b['earned']??0) <=> (float)($a['earned']??0));
        $topEarners = array_slice(array_map(fn($x)=>['id'=>(int)($x['id']??0),'name'=>$x['name']??'User','earned'=>(float)($x['earned']??0),'balance'=>(float)($x['balance']??0),'photo_url'=>$x['photo_url']??''], $earnTop),0,10);
        $day = today();
        $dayViewsArr = $user['ad_views'][$day] ?? [];
        $poroViews = 0; $lijentViews = 0;
        foreach ($dayViewsArr as $k=>$v) {
            if (str_starts_with((string)$k, 'poro_')) $poroViews++;
            elseif (str_starts_with((string)$k, 'lijent_')) $lijentViews++;
        }
        $dayViews = $poroViews + $lijentViews;

        // TOTAL VIEW = today's all successful ads. It survives Admin Reset All Ads
        // and resets automatically at 6 AM.
        $dailyTotalViews = (int)($user['daily_total_views'] ?? 0);
        if (($user['daily_total_views_date'] ?? '') !== $day) {
            $dailyTotalViews = 0;
        }

        $totalLifetime = 0;
        foreach (($user['ad_views'] ?? []) as $d => $arr) {
            $totalLifetime += count($arr);
        }
        $settings = getSettings();
        apiResponse([
            'ok' => true,
            'user' => [
                'id' => (int)$user['id'], 'name' => $user['name'], 'photo_url' => $user['photo_url'] ?? '',
                'balance' => (float)$user['balance'], 'earned' => (float)$user['earned'],
                'referrals' => (int)$user['referrals'], 'ref_earned' => (float)$user['ref_earned'],
                'today_views' => $dayViews, 
                'total_views' => $dailyTotalViews,
                'daily_total_views' => $dailyTotalViews,
                'lifetime_views' => $totalLifetime,
                'poro_views' => $poroViews,
                'lijent_views' => $lijentViews,
                'max_daily' => (int)(($settings['poro_limit']??70)+($settings['lijent_limit']??37)),
                'fake_count' => (int)($user['fake_count'] ?? 0), 'good_count' => (int)($user['good_count'] ?? 0)
            ],
            'top_referrers' => $topReferrers, 'top_earners' => $topEarners,
            'ref_link' => 'https://t.me/' . BOT_USERNAME . '?start=' . $user['id'],
            'min_withdraw' => (float)($settings['min_withdraw'] ?? MIN_WITHDRAW),
            'min_usdt' => (float)($settings['min_usdt'] ?? 1.00),
            'min_recharge' => (float)($settings['min_recharge'] ?? 20.00),
            'payment_methods' => (string)($settings['payment_methods'] ?? 'bk,ng,rk'),
            'settings' => [
                'payment_methods' => (string)($settings['payment_methods'] ?? 'bk,ng,rk'),
                'min_usdt' => (float)($settings['min_usdt'] ?? 1.00),
                'min_recharge' => (float)($settings['min_recharge'] ?? 20.00),
                'poro_limit' => (int)($settings['poro_limit'] ?? 70),
                'lijent_limit' => (int)($settings['lijent_limit'] ?? 37),
                'notice_ad_set' => (int)($settings['notice_ad_set'] ?? 5),
                'notice_add_second_set' => (float)($settings['notice_add_second_set'] ?? 30),
                'home_notice_country' => (string)($settings['home_notice_country'] ?? 'Australia'),
                'home_notice_text' => (string)($settings['home_notice_text'] ?? '')
            ],
            'ad_networks' => [
                'monetag' => ['enabled' => trim((string)($settings['monetag_code'] ?? '')) !== '', 'code' => (string)($settings['monetag_code'] ?? '')],
                'adspark' => ['enabled' => trim((string)($settings['adspark_code'] ?? '')) !== '', 'code' => (string)($settings['adspark_code'] ?? '')]
            ],
            'poro_limit' => (int)($settings['poro_limit'] ?? 70),
            'lijent_limit' => (int)($settings['lijent_limit'] ?? 37),
            'allowed_countries' => $settings['allowed_countries'] ?? ['BD'],
            'allowed_country_names' => $settings['allowed_country_names'] ?? 'Bangladesh',
            'welcome_notice' => $settings['welcome_notice'] ?? '',
            'earning_popup' => $settings['earning_popup'] ?? '',
            'bonus_text' => $settings['bonus_text'] ?? '',
            'earnings_history' => buildEarningsHistory($fresh ?: $user)
        ]);
    }
    if ($action === 'withdraw') {
        $settings = getSettings();
        $amount = (float)($_POST['amount'] ?? $_GET['amount'] ?? 0);
        $methodRaw = strtolower(trim((string)($_POST['method'] ?? '')));
        $methodAliases = [
            'bkas'=>'bk','bkash'=>'bk','bk'=>'bk',
            'ng'=>'ng','nk'=>'ng','nagad'=>'ng',
            'rk'=>'rk','rocket'=>'rk',
            'bc'=>'bc','binance'=>'bc',
            'rc'=>'rc','recharge'=>'rc','mobile_recharge'=>'rc','mobile recharge'=>'rc'
        ];
        $method = $methodAliases[$methodRaw] ?? preg_replace('/[^a-z0-9_-]/', '', $methodRaw);
        $configured = [];
        foreach (preg_split('/[,]+/', (string)($settings['payment_methods'] ?? 'bk,ng,rk')) as $part) {
            $part = strtolower(trim($part));
            if ($part === '') continue;
            $configured[] = $methodAliases[$part] ?? preg_replace('/[^a-z0-9_-]/', '', $part);
        }
        $configured = array_values(array_unique(array_filter($configured)));
        if (!in_array($method, $configured, true)) apiResponse(['ok' => false, 'message' => 'Invalid payment method.']);
        $rawAccount = trim((string)($_POST['account'] ?? ''));
        if (in_array($method, ['bk','ng','rk','rc'], true)) {
            $account = preg_replace('/\D+/', '', $rawAccount);
            if (!preg_match('/^01[3-9]\d{8}$/', $account)) apiResponse(['ok' => false, 'message' => 'Enter a valid wallet number.']);
        } else {
            $account = preg_replace('/\s+/', ' ', $rawAccount);
            if ($account === '' || strlen($account) < 3 || strlen($account) > 120) apiResponse(['ok' => false, 'message' => 'Enter a valid account/UID.']);
        }
        $isBinance = ($method === 'bc');
        $minimumInput = $isBinance ? (float)($settings['min_usdt'] ?? 1.00) : (in_array($method, ['rc'], true) ? (float)($settings['min_recharge'] ?? 20.00) : (float)($settings['min_withdraw'] ?? MIN_WITHDRAW));
        $minimumLabel = $isBinance ? money($minimumInput) . ' USDT' : money($minimumInput) . ' TK';
        if ($amount < $minimumInput) apiResponse(['ok' => false, 'message' => 'Minimum withdrawal is ' . $minimumLabel . '.']);
        $debitAmount = $isBinance ? ($amount * 130.00) : $amount;
        if ($isBinance) $debitAmount = round($debitAmount, 2);
        $fresh = getUser((int)$user['id']); 
        if (!$fresh) apiResponse(['ok' => false, 'message' => 'User not found.']);
        if (!empty($fresh['banned'])) apiResponse(['ok'=>false,'message'=>'Banned'],403);
        if (!empty($fresh['withdraw_state'])) apiResponse(['ok' => false, 'message' => 'You already have a pending withdrawal.']);
        if ((float)$fresh['balance'] < $debitAmount) apiResponse(['ok' => false, 'message' => $isBinance ? 'Insufficient balance. 1 USDT = 130 TK.' : 'Insufficient balance.']);
        $withdraws = jsonRead(WITHDRAWS_FILE); $id = bin2hex(random_bytes(8));
        $good = (int)($fresh['good_count'] ?? 0); $fake = (int)($fresh['fake_count'] ?? 0);
        // User chay withdraw dilei balance katbe, ar approve/reject korleo balance back jabe na
        $balanceBefore = (float)$fresh['balance'];
        $fresh['balance'] = $balanceBefore - $debitAmount;
        if ($fresh['balance'] < 0) $fresh['balance'] = 0;
        $withdraws[$id] = ['id' => $id, 'user_id' => (int)$fresh['id'], 'name' => $fresh['name'], 'method' => $method, 'account' => $account, 'amount' => $amount, 'debit_amount' => $debitAmount, 'status' => 'pending', 'created_at' => date('c'), 'good_count' => $good, 'fake_count' => $fake, 'balance_at_withdraw' => $balanceBefore, 'balance_after' => (float)$fresh['balance']];
        $fresh['good_count'] = 0; $fresh['fake_count'] = 0;
        $fresh['withdraw_state'] = $id; $fresh['withdraw_method'] = $method; $fresh['withdraw_account'] = $account;
        if (!saveUser($fresh) || !jsonWrite(WITHDRAWS_FILE, $withdraws)) {
            $fresh['balance'] = (float)$fresh['balance'] + $debitAmount; // rollback
            $fresh['withdraw_state'] = null; saveUser($fresh);
            apiResponse(['ok' => false, 'message' => 'Could not create withdrawal.'], 500);
        }
        apiResponse(['ok' => true, 'message' => 'Withdrawal request submitted. Balance deducted.', 'balance' => $fresh['balance']]);
    }

    if ($action === 'get_bonus_tasks') {
        $fresh = getUser((int)$user['id']);
        $tasks = jsonRead(BONUS_TASKS_FILE);
        $list = array_values($tasks);
        $claimed = $fresh['claimed_tasks'] ?? [];
        foreach ($list as &$t) {
            $t['task_type'] = (isset($t['task_type']) && $t['task_type'] === 'video') ? 'video' : 'subscribe';
            $t['required_watch_time'] = max(0.15, min(3600, (float)($t['required_watch_time'] ?? 5)));
            $t['claimed'] = in_array($t['id'] ?? '', $claimed, true);
        }
        apiResponse(['ok'=>true,'tasks'=>$list]);
    }
    if ($action === 'start_bonus_task') {
        $taskId = (string)($_POST['task_id'] ?? $_GET['task_id'] ?? '');
        if ($taskId === '') apiResponse(['ok'=>false,'message'=>'Task ID required'],400);
        $tasks = jsonRead(BONUS_TASKS_FILE);
        if (!isset($tasks[$taskId])) apiResponse(['ok'=>false,'message'=>'Task not found'],404);
        $task = $tasks[$taskId];
        $fresh = getUser((int)$user['id']);
        $claimed = $fresh['claimed_tasks'] ?? [];
        if (in_array($taskId, $claimed, true)) apiResponse(['ok'=>false,'message'=>'Already claimed']);
        if (!isset($fresh['bonus_task_starts']) || !is_array($fresh['bonus_task_starts'])) $fresh['bonus_task_starts'] = [];
        $startedAt = time();
        $fresh['bonus_task_starts'][$taskId] = $startedAt;
        saveUser($fresh);
        apiResponse(['ok'=>true,'started_at'=>$startedAt,'task_type'=>($task['task_type'] ?? 'subscribe'),'required_watch_time'=>(float)($task['required_watch_time'] ?? 5)]);
    }

    if ($action === 'claim_bonus_task') {
        $taskId = (string)($_POST['task_id'] ?? $_GET['task_id'] ?? '');
        if ($taskId === '') apiResponse(['ok'=>false,'message'=>'Task ID required'],400);
        $tasks = jsonRead(BONUS_TASKS_FILE);
        if (!isset($tasks[$taskId])) apiResponse(['ok'=>false,'message'=>'Task not found'],404);
        $task = $tasks[$taskId];
        $fresh = getUser((int)$user['id']);
        $claimed = $fresh['claimed_tasks'] ?? [];
        if (in_array($taskId, $claimed, true)) apiResponse(['ok'=>false,'message'=>'Already claimed']);
        $taskType = (string)($task['task_type'] ?? 'subscribe');
        $requiredWatchTime = (float)($task['required_watch_time'] ?? 5);
        if ($requiredWatchTime < 0.15) $requiredWatchTime = 5;
        if ($requiredWatchTime > 3600) $requiredWatchTime = 3600;
        $starts = $fresh['bonus_task_starts'] ?? [];
        $startedAt = (int)($starts[$taskId] ?? 0);
        if ($startedAt <= 0) apiResponse(['ok'=>false,'message'=>'Task timer not started'],400);
        $elapsed = time() - $startedAt;
        if ($elapsed + 0.01 < $requiredWatchTime) apiResponse(['ok'=>false,'message'=>'Please wait until the required time is complete.','remaining'=>max(0,$requiredWatchTime-$elapsed)],400);
        unset($fresh['bonus_task_starts'][$taskId]);
        $reward = (float)($task['reward'] ?? 0.5);
        $fresh['balance'] = (float)$fresh['balance'] + $reward;
        $fresh['earned'] = (float)$fresh['earned'] + $reward;
        $fresh['claimed_tasks'][] = $taskId;
        if (!isset($fresh['daily_earnings'])) $fresh['daily_earnings'] = [];
        $day = today();
        if (!isset($fresh['daily_earnings'][$day])) $fresh['daily_earnings'][$day] = 0.0;
        $fresh['daily_earnings'][$day] += $reward;
        saveUser($fresh);
        apiResponse(['ok'=>true,'message'=>'Bonus claimed! +'.$reward.' TK','reward'=>$reward,'balance'=>$fresh['balance']]);
    }
    if ($action === 'withdraw_history')    if ($action === 'withdraw_history') {
        $fresh = getUser((int)$user['id']);
        if (!$fresh) apiResponse(['ok' => false, 'message' => 'User not found.'], 404);
        $withdraws = jsonRead(WITHDRAWS_FILE);
        $my = [];
        foreach ($withdraws as $w) { if ((int)($w['user_id'] ?? 0) === (int)$fresh['id']) $my[] = $w; }
        usort($my, fn($a,$b)=>strtotime($b['created_at']??'') <=> strtotime($a['created_at']??''));
        apiResponse(['ok' => true, 'history' => $my]);
    }
    apiResponse(['ok' => false, 'message' => 'Unknown action.'], 400);
}

ensureStorage();

$rawInput = file_get_contents('php://input');
$update = json_decode((string)$rawInput, true);

if (is_array($update)) {
    if (!empty($update['callback_query'])) {
        $cb = $update['callback_query'];
        $cbId = $cb['id'] ?? '';
        $cbData = $cb['data'] ?? '';
        $fromId = (int)($cb['from']['id'] ?? 0);
        // New Start button: show the normal Welcome Notice only after the user taps it.
        if ($cbData === 'newstart_welcome') {
            tg('answerCallbackQuery', ['callback_query_id' => $cbId]);
            $userName = trim((string)($cb['from']['first_name'] ?? 'User').' '.(string)($cb['from']['last_name'] ?? ''));
            if ($userName === '') $userName = 'User';

            $appUrl = baseUrl() . '?app=1';
            $keyboard = [
                'inline_keyboard' => [
                    [['text' => '🚀 Open Bangla Taka Bot 💰', 'web_app' => ['url' => $appUrl]]],
                    [['text' => '📢 Official Channel', 'url' => 'https://t.me/SmartWorkCommunity'], ['text' => '👤 Admin ID', 'url' => 'https://t.me/noyonfb1020']]
                ]
            ];
            $settingsWelcome = getSettings();
            $customWelcome = trim($settingsWelcome['welcome_notice'] ?? '');
            if ($customWelcome !== '') {
                $welcome = "💎 <b>BANGLA TAKA BOT 💰</b>

".
                           "👋 Hello <b>".esc($userName)."</b>!

".
                           $customWelcome."

".
                           "👇 নিচের বাটনে ক্লিক করে বট ওপেন করুন:";
            } else {
                $welcome = "💎 <b>BANGLA TAKA BOT 💰</b>

".
                           "👋 Hello <b>".esc($userName)."</b>!

".
                           "✅ VPN দিয়ে কাজ করতে হবে (AU Country)
".
                           "✅ 10 টা রেফার করলে Withdraw দিতে পারবেন
".
                           "✅ মিনিমাম ".money((float)($settingsWelcome['min_withdraw'] ?? MIN_WITHDRAW))." TK

".
                           "👇 নিচের বাটনে ক্লিক করে বট ওপেন করুন:";
            }
            tg('sendMessage', [
                'chat_id' => $fromId,
                'text' => $welcome,
                'parse_mode' => 'HTML',
                'reply_markup' => json_encode($keyboard, JSON_UNESCAPED_UNICODE)
            ]);
            return;
        }

        if ($fromId === ADMIN_ID && str_starts_with($cbData, 'approve_') || str_starts_with($cbData, 'reject_')) {
            $parts = explode('_', $cbData, 2);
            $decision = $parts[0] ?? '';
            $wid = preg_replace('/[^a-f0-9]/','',$parts[1] ?? '');
            if ($wid !== '' && in_array($decision, ['approve','reject'], true)) {
                $withdraws = jsonRead(WITHDRAWS_FILE);
                if (isset($withdraws[$wid]) && ($withdraws[$wid]['status'] ?? '') === 'pending') {
                    $w = $withdraws[$wid];
                    $uid = (int)$w['user_id'];
                    $users = jsonRead(USERS_FILE);
                    if (isset($users[(string)$uid])) {
                        if ($decision === 'approve') {
                            $amount = (float)$w['amount'];
                            if ((float)$users[(string)$uid]['balance'] >= $amount) {
                                $users[(string)$uid]['balance'] = (float)$users[(string)$uid]['balance'] - $amount;
                            }
                        }
                        $users[(string)$uid]['withdraw_state'] = null;
                        $users[(string)$uid]['withdraw_method'] = null;
                        $users[(string)$uid]['withdraw_account'] = null;
                        jsonWrite(USERS_FILE, $users);
                        $withdraws[$wid]['status'] = $decision === 'approve' ? 'approved' : 'rejected';
                        $withdraws[$wid]['processed_at'] = date('c');
                        jsonWrite(WITHDRAWS_FILE, $withdraws);
                        tg('answerCallbackQuery', ['callback_query_id' => $cbId, 'text' => 'Withdrawal '.$decision.'d!']);
                        tg('sendMessage', ['chat_id' => ADMIN_ID, 'text' => '✅ Withdrawal '.$decision.': '.$wid.' ('.$w['amount'].' TK)']);
                        $userMethod = paymentMethodLabel((string)($w['method'] ?? ''));
                        $userAmount = money((float)($w['amount'] ?? 0));
                        $userAccount = esc((string)($w['account'] ?? ''));
                        if ($decision === 'approve') {
                            $userNotice = "🎉 <b>Withdrawal Approved!</b>\n\n".
                                          "💰 Amount: <b>".$userAmount." TK</b>\n".
                                          "💳 Method: <b>".esc($userMethod)."</b>\n".
                                          "📱 Account: <code>".$userAccount."</code>\n\n".
                                          "✅ আপনার withdrawal request admin approve করেছে।";
                        } else {
                            $userNotice = "❌ <b>Withdrawal Rejected!</b>\n\n".
                                          "💰 Amount: <b>".$userAmount." TK</b>\n".
                                          "💳 Method: <b>".esc($userMethod)."</b>\n".
                                          "📱 Account: <code>".$userAccount."</code>\n\n".
                                          "⚠️ আপনার withdrawal request admin reject করেছে।";
                        }
                        tg('sendMessage', ['chat_id' => $uid, 'text' => $userNotice, 'parse_mode' => 'HTML']);
                    }
                }
            }
        }
    }
    if (!empty($update['message'])) {
        $msg = $update['message'];
        $chatId = (int)($msg['chat']['id'] ?? 0);
        $text = trim((string)($msg['text'] ?? ''));
        $from = $msg['from'] ?? [];
        $fromId = (int)($from['id'] ?? $chatId);
        $firstName = (string)($from['first_name'] ?? 'User');
        $lastName = (string)($from['last_name'] ?? '');
        $fullName = trim($firstName.' '.$lastName);
        if ($fullName === '') $fullName = $firstName;

        // === BOT STOP / MAINTENANCE CHECK - ADDED ===
        $settingsMaintenance = getSettings();
        if (!empty($settingsMaintenance['bot_stopped']) && $fromId !== ADMIN_ID) {
            $stopMsg = $settingsMaintenance['stop_message'] ?? "🚧 <b>Bot Update চলতেছে!</b>

⏳ একটু Wait করেন, খুব শীঘ্রই চালু হবে!

💎 Bangla Taka Team কাজ করছে!";
            tg('sendMessage', [
                'chat_id' => $chatId,
                'text' => $stopMsg,
                'parse_mode' => 'HTML'
            ]);
            return;
        }
        // === END MAINTENANCE CHECK ===

        // === ADMIN-ONLY CUSTOM COMMAND MENU ===
        // Commands are visible only to ADMIN_ID, but when Admin uses them,
        // the message/action is delivered to all registered users.
        if ($fromId === ADMIN_ID) {
            tg('setMyCommands', [
                'commands' => json_encode([
                    ['command' => 'newstart', 'description' => '🤖 Bot notun update hoyese'],
                    ['command' => 'hello', 'description' => '👋 Hello everyone kaj koren sobai'],
                    ['command' => 'personal', 'description' => '📝 Personal Text'],
                    ['command' => 'alltopicsms', 'description' => '📝 Broadcast styled topic SMS'],
                    ['command' => 'ratedown', 'description' => '🔻 Rate down: /ratedown 10'],
                    ['command' => 'rateup', 'description' => '💎 Rate up: /rateup 10'],
                    ['command' => 'bednotice', 'description' => '📢 Broadcast bed notice'],
                    ['command' => 'important', 'description' => '⚠️ Broadcast important notice'],
                    ['command' => 'payment', 'description' => '💳 Broadcast payment notice'],
                    ['command' => 'payrunning', 'description' => '🔄 Broadcast payment running notice'],
                    ['command' => 'allpayment', 'description' => '💰 Broadcast all payment details'],
                    ['command' => 'goodmorning', 'description' => '🌅 Send Good Morning message'],
                ], JSON_UNESCAPED_UNICODE),
                'scope' => json_encode(['type' => 'chat', 'chat_id' => ADMIN_ID], JSON_UNESCAPED_UNICODE),
                'language_code' => 'en'
            ]);

            $usersForCommand = jsonRead(USERS_FILE);
            $broadcastPremium = function (string $body, string $title = 'BANGLA TAKA BOT NOTICE', bool $withStartButton = false) use ($usersForCommand): void {
                $message = "╭━━━━━━━━━━━━━━━━━━╮\n💎 <b>" . esc($title) . "</b> 💰\n╰━━━━━━━━━━━━━━━━━━╯\n\n" . $body . "\n\n━━━━━━━━━━━━━━━━━━\n🤖 <b>BANGLA TAKA BOT</b>";
                $replyMarkup = null;
                if ($withStartButton) {
                    $replyMarkup = json_encode([
                        'inline_keyboard' => [[['text' => '▶️ /start', 'url' => 'https://t.me/' . BOT_USERNAME . '?start=work']]]
                    ], JSON_UNESCAPED_UNICODE);
                }
                foreach ($usersForCommand as $u) {
                    $uid = (int)($u['id'] ?? 0);
                    if ($uid > 0 && empty($u['banned'])) {
                        $params = ['chat_id' => $uid, 'text' => $message, 'parse_mode' => 'HTML'];
                        if ($replyMarkup !== null) $params['reply_markup'] = $replyMarkup;
                        tg('sendMessage', $params);
                    }
                }
            };

            if ($text === '/newstart' || str_starts_with($text, '/newstart ')) {
                // Keep the existing /newstart behavior unchanged.
                $newStartKeyboard = [
                    'inline_keyboard' => [
                        [['text' => '🆕 New Start', 'callback_data' => 'newstart_welcome']]
                    ]
                ];
                foreach ($usersForCommand as $u) {
                    $uid = (int)($u['id'] ?? 0);
                    if ($uid <= 0 || !empty($u['banned'])) continue;
                    tg('sendMessage', [
                        'chat_id' => $uid,
                        'text' => "🤖 <b>Bot updated করা হয়েছে</b>",
                        'parse_mode' => 'HTML',
                        'reply_markup' => json_encode($newStartKeyboard, JSON_UNESCAPED_UNICODE)
                    ]);
                }
                return;
            }
            elseif ($text === '/hello' || str_starts_with($text, '/hello ')) {
                $helloText = trim(substr($text, 6));
                if ($helloText === '') $helloText = 'Hello everyone kaj koren sobai 👋';
                foreach ($usersForCommand as $u) {
                    $uid = (int)($u['id'] ?? 0);
                    if ($uid > 0 && empty($u['banned'])) {
                        tg('sendMessage', ['chat_id' => $uid, 'text' => styleAdminBroadcast($helloText, 'hello'), 'parse_mode' => 'HTML']);
                    }
                }
                return;
            } elseif ($text === '/personal' || str_starts_with($text, '/personal ')) {
                $personalText = trim(substr($text, 9));
                if ($personalText === '') {
                    tg('sendMessage', ['chat_id' => $chatId, 'text' => '📝 /personal এর পরে যে text পাঠাবেন, সেটাই সব user-এর কাছে পাঠানো হবে।']);
                } else {
                    foreach ($usersForCommand as $u) {
                        $uid = (int)($u['id'] ?? 0);
                        if ($uid > 0 && empty($u['banned'])) {
                            tg('sendMessage', ['chat_id' => $uid, 'text' => styleAdminBroadcast($personalText, 'personal'), 'parse_mode' => 'HTML']);
                        }
                    }
                }
                return;
            } elseif (preg_match('~^/alltopicsms(?:@\w+)?(?:\s+(.*))?$~is', $text, $m)) {
                $topicText = trim((string)($m[1] ?? ''));
                if ($topicText === '') {
                    tg('sendMessage', ['chat_id' => $chatId, 'text' => '📝 ব্যবহার: /alltopicsms আপনার মেসেজ']);
                } else {
                    foreach ($usersForCommand as $u) {
                        $uid = (int)($u['id'] ?? 0);
                        if ($uid > 0 && empty($u['banned'])) {
                            tg('sendMessage', ['chat_id' => $uid, 'text' => $topicText]);
                        }
                    }
                }
                return;
            }

            if (preg_match('~^/ratedown(?:@\w+)?\s+(\d+(?:\.\d{1,2})?)$~i', $text, $m)) {
                $rate = $m[1];
                $broadcastPremium('💸 <b>𝐑𝐚𝐭𝐞 𝐃𝐨𝐰𝐧: ' . esc($rate) . ' TK</b>', '💎 𝐑𝐀𝐓𝐄 𝐃𝐎𝐖𝐍');
                return;
            } elseif (preg_match('~^/ratedown(?:@\w+)?$~i', $text)) {
                tg('sendMessage', ['chat_id' => $chatId, 'text' => 'ব্যবহার: /ratedown 10']);
                return;
            }

            if (preg_match('~^/rateup(?:@\w+)?\s+(\d+(?:\.\d{1,2})?)$~i', $text, $m)) {
                $rate = $m[1];
                $broadcastPremium('💸 <b>𝐑𝐚𝐭𝐞 𝐔𝐩: ' . esc($rate) . ' TK</b>', '💎 𝐑𝐀𝐓𝐄 𝐔𝐏');
                return;
            } elseif (preg_match('~^/rateup(?:@\w+)?$~i', $text)) {
                tg('sendMessage', ['chat_id' => $chatId, 'text' => 'ব্যবহার: /rateup 10']);
                return;
            }

            // === NEW: STOP / START BOT COMMANDS ===
            if (preg_match('~^/stopbot(?:@\w+)?(?:\s+(.*))?$~is', $text, $mStop)) {
                $customStopMsg = trim((string)($mStop[1] ?? ''));
                $s = getSettings();
                $s['bot_stopped'] = true;
                $s['bot_stopped_date'] = (new DateTimeImmutable('now', new DateTimeZone('Asia/Dhaka')))->format('Y-m-d');
                $s['stop_message'] = $customStopMsg !== '' ? $customStopMsg : "🚧 <b>Bot Update চলতেছে!</b>

🛠️ আমরা Bot কে আরও ভালো করছি!
⏳ 10-15 মিনিট Wait করেন!

💎 Bangla Taka Team";
                if (!isset($s['poro_limit'])) $s['poro_limit'] = $s['poro_limit'] ?? 100;
                // Save via jsonWrite which also saves to Firebase
                $settingsFile = SETTINGS_FILE;
                jsonWrite($settingsFile, $s);
                tg('sendMessage', ['chat_id'=>$chatId,'text'=>"🛑 <b>Bot বন্ধ করা হলো!</b>

✅ এখন সাধারণ User রা Bot ওপেন করলে Update মেসেজ দেখবে!
✅ তোমার Admin ID (".ADMIN_ID.") তে সব চলবে, Admin Panel ও চলবে!",'parse_mode'=>'HTML']);
                return;
            }
            if (preg_match('~^/startbot(?:@\w+)?$~is', $text)) {
                $s = getSettings();
                $s['bot_stopped'] = false;
                jsonWrite(SETTINGS_FILE, $s);
                $broadcastPremium('🟢 <b>বট এখন সম্পূর্ণ চালু!</b>

🎉 সবাই এখন আবার কাজ শুরু করতে পারবেন।
💎 BANGLA TAKA BOT-এ স্বাগতম!

👇 বট start করে কাজ শুরু করুন।', '🚀 BOT IS NOW LIVE', true);
                tg('sendMessage', ['chat_id'=>$chatId,'text'=>"✅ <b>Bot চালু করা হলো!</b>

📢 সব User-কে চালু হওয়ার নোটিশ পাঠানো হয়েছে।",'parse_mode'=>'HTML']);
                return;
            }

            $commandMap = [
                'bednotice' => ['📢 BED NOTICE', '📢 <b>Notice:</b> কাজ সংক্রান্ত নতুন নোটিশ। বিস্তারিত জানতে Admin-এর নির্দেশনা অনুসরণ করুন।'],
                'important' => ['⚠️ IMPORTANT NOTICE', '⚠️ <b>Important:</b> সবাই অনুগ্রহ করে Bot-এর সর্বশেষ নিয়ম মেনে কাজ করুন।'],
                'payment' => ['💳 PAYMENT NOTICE', '💳 <b>Payment Update:</b> পেমেন্ট সংক্রান্ত আপডেটের জন্য অপেক্ষা করুন এবং সঠিক তথ্য অনুসরণ করুন।'],
                'payrunning' => ['🔄 PAYMENT RUNNING', "📣 <b>𝐉𝐚𝐫𝐚 𝐚𝐤𝐡𝐨𝐧𝐨 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 𝐫𝐞𝐪𝐮𝐞𝐬𝐭 𝐝𝐞𝐧 𝐧𝐚𝐢 𝐭𝐚𝐫𝐚𝐭𝐚𝐫𝐢 𝐝𝐞𝐧</b>\n\n💰 <b>𝐀𝐥𝐥 𝐏𝐚𝐲𝐦𝐞𝐧𝐭 𝐑𝐮𝐧𝐧𝐢𝐧𝐠</b>"],
                'allpayment' => ['💰 ALL PAYMENT DETAILS', "💳🔤🔤💯💯💯\n\n😴<b>𝐀𝐥𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐢𝐡 𝐅𝐨𝐫 𝐄𝐯𝐞𝐫𝐲𝐭𝐡𝐢𝐧𝐠</b>🤲\n🥢🥢🥢🥢🥢🥢🥢🥢🥢🥢🥢\n\n📣 এই পর্যন্ত যতগুলো রিকোস্ট দিয়ে ছিলেন সকল পেমেন্ট ক্লিয়ার 💎\n\n👍 সবাই সবার একাউন্ট চেক করেন 🌟🌟💸 পেমেন্ট চলে গেছে 🔔\n\n💲 যারা উইথড্র দিয়েছিলেন সবার উইড্র রিকোয়েস্ট এপ্রুভ করা হয়েছে, পেমেন্ট চলে গেছে—চেক করেন।\n\n➡️ এবং যারা এখনো উইথড্র দেন নাই আপনারা উইথড্র দিয়ে দিবেন, এপ্রুভ করে নেওয়া হবে ✔️\n\n🙏<b>𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐲𝐨𝐮𝐫 𝐬𝐮𝐩𝐩𝐨𝐫𝐭</b>💝"],
            ];
            foreach ($commandMap as $command => [$title, $defaultBody]) {
                if (preg_match('~^/' . preg_quote($command, '~') . '(?:@\w+)?(?:\s+(.*))?$~is', $text, $m)) {
                    $customBody = trim((string)($m[1] ?? ''));
                    if ($customBody !== '') $defaultBody = esc($customBody);
                    $broadcastPremium($defaultBody, $title);
                    return;
                }
            }
                if (preg_match('~^/goodmorning(?:@\w+)?$~i', $text)) {
        $settingsGM = getSettings();
        $poroGM = $settingsGM['poro_limit'] ?? 100;
        $lijentGM = $settingsGM['lijent_limit'] ?? 100;
        $broadcastPremium("🌅 <b>GOOD MORNING, BANGLA TAKA FAMILY!</b> ☀️\n💎 নতুন দিনের কাজ শুরু করুন!\n🎯 আজকের Ad Limit: <b>{$poroGM} + {$lijentGM} Ads</b>\n💰 নিয়ম মেনে কাজ করুন।", '🌅 GOOD MORNING');
        return;
    }
        }

        if (str_starts_with($text, '/start')) {
            $parts = explode(' ', $text, 2);
            $ref = null;
            if (!empty($parts[1])) {
                $ref = (int)trim($parts[1]);
                if ($ref === $fromId) $ref = null;
            }
            $photoUrl = '';
            try {
                $res = tg('getUserProfilePhotos', ['user_id' => $fromId, 'limit' => 1]);
                if (!empty($res['ok']) && !empty($res['result']['photos'][0])) {
                    $photos = $res['result']['photos'][0];
                    $best = end($photos);
                    if (!empty($best['file_id'])) {
                        $fileRes = tg('getFile', ['file_id' => $best['file_id']]);
                        if (!empty($fileRes['ok']) && !empty($fileRes['result']['file_path'])) {
                            $photoUrl = 'https://api.telegram.org/file/bot' . BOT_TOKEN . '/' . $fileRes['result']['file_path'];
                        }
                    }
                }
            } catch (Exception $e) {}

            $user = ensureUser($fromId, $fullName, $ref, $photoUrl);

            // Check if banned - instant ban
            if (!empty($user['banned'])) {
                tg('sendMessage', [
                    'chat_id' => $chatId,
                    'text' => "🚫 <b>Apni ban khaisen!</b>\n\n❌ Apni bot chalate parben na.\n📞 Admin er sathe contact korun: @noyonfb1020",
                    'parse_mode' => 'HTML'
                ]);
                return;
            }

            $appUrl = baseUrl() . '?app=1';
            $keyboard = [
                'inline_keyboard' => [
                    [['text' => '🚀 Open Bangla Taka Bot 💰', 'web_app' => ['url' => $appUrl]]],
                    [['text' => '📢 Official Channel', 'url' => 'https://t.me/SmartWorkCommunity'], ['text' => '👤 Admin ID', 'url' => 'https://t.me/noyonfb1020']]
                ]
            ];

            $settingsWelcome = getSettings();
            $customWelcome = trim($settingsWelcome['welcome_notice'] ?? '');
            if ($customWelcome !== '') {
                // Admin panel theke edit kore dile oita dekhabe /start e - 3 sec pore update
                $welcome = "💎 <b>BANGLA TAKA BOT 💰</b>\n\n".
                           "👋 Hello <b>".esc($fullName)."</b>!\n\n".
                           $customWelcome."\n\n".
                           "👇 নিচের বাটনে ক্লিক করে বট ওপেন করুন:";
            } else {
                $welcome = "💎 <b>BANGLA TAKA BOT 💰</b>\n\n".
                           "👋 Hello <b>".esc($fullName)."</b>!\n\n".
                           "✅ VPN দিয়ে কাজ করতে হবে (AU Country)\n".
                           "✅ 10 টা রেফার করলে Withdraw দিতে পারবেন\n".
                           "✅ মিনিমাম ".money((float)(getSettings()['min_withdraw'] ?? MIN_WITHDRAW))." TK\n\n".
                           "👇 নিচের বাটনে ক্লিক করে বট ওপেন করুন:";
            }

            tg('sendMessage', [
                'chat_id' => $chatId,
                'text' => $welcome,
                'parse_mode' => 'HTML',
                'reply_markup' => json_encode($keyboard, JSON_UNESCAPED_UNICODE)
            ]);
        }
    }
}

if (isset($_GET['asset'])) {
    $asset = (string)$_GET['asset']; 
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0'); 
    if ($asset === 'css') { 
        header('Content-Type: text/css; charset=utf-8'); 
        $candidates = [__DIR__ . '/app/style.css', __DIR__ . '/style.css', '/app/app/style.css', '/app/style.css'];
        $file = null; foreach ($candidates as $p) { if (is_file($p)) { $file = $p; break; } }
        if (!$file) { http_response_code(404); exit('CSS not found'); } 
        readfile($file); exit; 
    }
    if ($asset === 'js') { 
        header('Content-Type: application/javascript; charset=utf-8'); 
        $candidates = [__DIR__ . '/app/app.js', __DIR__ . '/app.js', __DIR__ . '/index.js', '/app/app/app.js'];
        $file = null; foreach ($candidates as $p) { if (is_file($p)) { $file = $p; break; } }
        if (!$file) { http_response_code(404); exit('JS not found'); } 
        readfile($file); exit; 
    }
    http_response_code(404); exit('Asset not found');
}
if (isset($_GET['app'])) {
    header('Content-Type: text/html; charset=utf-8'); 
    $candidates = [
        __DIR__ . '/app/index.html',
        __DIR__ . '/index.html',
        '/app/app/index.html',
        '/app/index.html'
    ];
    $html = false;
    foreach ($candidates as $p) {
        if (is_file($p)) { $html = file_get_contents($p); break; }
    }
    if ($html === false) { http_response_code(500); exit('Mini App unavailable - index.html not found at ' . implode(', ', $candidates)); }
    $html = preg_replace('/href=[\x22\x27]style\.css[^\x22\x27]*[\x22\x27]/i', 'href="?asset=css&v=' . APP_VERSION . '"', $html);
    $html = preg_replace('/src=[\x22\x27]app\.js[^\x22\x27]*[\x22\x27]/i', 'src="?asset=js&v=' . APP_VERSION . '"', $html);
    echo $html; exit;
}
if (isset($_GET['api']) || isset($_POST['api'])) apiHandle();

http_response_code(200); echo 'OK';
