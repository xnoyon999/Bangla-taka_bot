<?php
declare(strict_types=1);
function firebase_get_service_account(): ?array {
    $envs = ['FIREBASE_SERVICE_ACCOUNT', 'FIREBASE_CREDENTIALS', 'GOOGLE_APPLICATION_CREDENTIALS_JSON'];
    foreach ($envs as $k) {
        $v = getenv($k);
        if ($v) {
            if (strlen($v) > 100 && $v[0] !== '{') {
                $decoded = base64_decode($v, true);
                if ($decoded) $v = $decoded;
            }
            $j = json_decode($v, true);
            if (is_array($j) && isset($j['private_key'])) return $j;
        }
    }
    $pathEnv = getenv('GOOGLE_APPLICATION_CREDENTIALS');
    if ($pathEnv && file_exists($pathEnv)) {
        $j = json_decode(file_get_contents($pathEnv), true);
        if (is_array($j)) return $j;
    }
    $candidates = [
        __DIR__ . '/firebase-service-account.json',
        __DIR__ . '/data/firebase-service-account.json',
        '/app/firebase-service-account.json',
    ];
    foreach ($candidates as $p) {
        if (file_exists($p)) {
            $j = json_decode(file_get_contents($p), true);
            if (is_array($j) && isset($j['private_key'])) return $j;
        }
    }
    return null;
}
function base64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}
function firebase_get_access_token(): ?string {
    $cacheFile = sys_get_temp_dir() . '/fb_token_cache.json';
    if (file_exists($cacheFile)) {
        $c = json_decode(file_get_contents($cacheFile), true);
        if ($c && isset($c['token'], $c['exp']) && $c['exp'] > time() + 300) return $c['token'];
    }
    $sa = firebase_get_service_account();
    if (!$sa) return null;
    $now = time();
    $header = base64url_encode(json_encode(['alg'=>'RS256','typ'=>'JWT']));
    $payload = base64url_encode(json_encode([
        'iss' => $sa['client_email'],
        'scope' => 'https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/cloud-platform',
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now, 'exp' => $now + 3600
    ]));
    $toSign = $header . '.' . $payload;
    $signature = '';
    if (!openssl_sign($toSign, $signature, $sa['private_key'], OPENSSL_ALGO_SHA256)) return null;
    $jwt = $toSign . '.' . base64url_encode($signature);
    $ch = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_POST => true, CURLOPT_POSTFIELDS => http_build_query(['grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer','assertion' => $jwt]), CURLOPT_TIMEOUT => 15]);
    $raw = curl_exec($ch); curl_close($ch);
    $res = json_decode($raw, true);
    if (empty($res['access_token'])) return null;
    @file_put_contents($cacheFile, json_encode(['token'=>$res['access_token'], 'exp'=> $now + 3500]));
    return $res['access_token'];
}
function firestore_request(string $method, string $path, ?array $body = null): ?array {
    $token = firebase_get_access_token();
    if (!$token) return null;
    $sa = firebase_get_service_account();
    if (!$sa) return null;
    $projectId = $sa['project_id'];
    $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/{$path}";
    $ch = curl_init($url);
    $headers = ["Authorization: Bearer {$token}", "Content-Type: application/json"];
    $opts = [CURLOPT_RETURNTRANSFER => true, CURLOPT_CUSTOMREQUEST => $method, CURLOPT_HTTPHEADER => $headers, CURLOPT_TIMEOUT => 20];
    if ($body !== null) $opts[CURLOPT_POSTFIELDS] = json_encode($body);
    curl_setopt_array($ch, $opts);
    $raw = curl_exec($ch); $code = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    if ($code >= 400) { if ($code === 404) return null; return null; }
    return json_decode($raw, true);
}
function firebase_load(string $docName): ?array {
    $res = firestore_request('GET', "bot_data/{$docName}");
    if (!$res || empty($res['fields']['json']['stringValue'])) return null;
    $data = json_decode($res['fields']['json']['stringValue'], true);
    return is_array($data) ? $data : null;
}
function firebase_save(string $docName, array $data): bool {
    $jsonStr = json_encode($data, JSON_UNESCAPED_UNICODE);
    $body = ['fields' => ['json' => ['stringValue' => $jsonStr],'updated_at' => ['stringValue' => date('c')]]];
    $res = firestore_request('PATCH', "bot_data/{$docName}", $body);
    return $res !== null;
}


// ===== V9 REALTIME FIX - ADDED =====
if (!function_exists('fb_cache_invalidate')) {
    function fb_cache_invalidate(string $key): void {
        $dir = __DIR__ . '/cache';
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        $file = $dir . '/' . md5($key) . '.json';
        if (file_exists($file)) @unlink($file);
        if ($key === 'all' || $key === 'json_users' || $key === 'json_settings') {
            // Also clear all user related caches
            $files = glob($dir.'/*.json');
            if ($files) {
                foreach($files as $cf) {
                    $name = basename($cf);
                    if (strpos($name, md5('json_users')) !== false || strpos($name, md5('json_settings')) !== false || $key === 'all') {
                        @unlink($cf);
                    }
                }
            }
            if ($key === 'all') {
                $files = glob($dir.'/*.json');
                if ($files) foreach($files as $cf) @unlink($cf);
            }
        }
    }
}

// Enhanced firebase_save with instant cache invalidation + single user realtime support
// Wraps original to add realtime behavior without breaking existing logic
function firebase_save_realtime(string $docName, array $data): bool {
    fb_cache_invalidate('json_'.$docName);
    if (strpos($docName, 'users') !== false) {
        fb_cache_invalidate('json_users');
    }
    // Support for users/{id} path - merge into main users doc for Firestore structure
    if (preg_match('#^users/(\d+)$#', $docName, $m)) {
        $uid = $m[1];
        $allUsers = firebase_load('users');
        if (is_array($allUsers)) {
            $allUsers[(string)$uid] = array_merge($allUsers[(string)$uid] ?? [], $data);
            return firebase_save('users', $allUsers);
        }
    }
    return firebase_save($docName, $data);
}

function firebase_push_balance(int $userId, float $newBalance): bool {
    fb_cache_invalidate('json_users');
    // Update main users doc for Firestore
    $allUsers = firebase_load('users');
    if (is_array($allUsers) && isset($allUsers[(string)$userId])) {
        $allUsers[(string)$userId]['balance'] = $newBalance;
        $allUsers[(string)$userId]['last_balance_update'] = time();
        firebase_save('users', $allUsers);
        return true;
    }
    return false;
}
