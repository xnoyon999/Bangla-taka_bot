<?php
require_once __DIR__ . '/firebase_helper.php';
$token = getenv('BOT_TOKEN');
$settings = firebase_load('settings');
$next_poro = $settings['next_poro_limit'] ?? null;
$next_lijent = $settings['next_lijent_limit'] ?? null;

if($next_poro !== null && $next_lijent !== null){
  $settings['poro_limit'] = (int)$next_poro;
  $settings['lijent_limit'] = (int)$next_lijent;
  $settings['next_poro_limit'] = null;
  $settings['next_lijent_limit'] = null;
  firebase_save('settings', $settings);
}
$nowDhaka = new DateTimeImmutable('now', new DateTimeZone('Asia/Dhaka'));
$todayDhaka = $nowDhaka->format('Y-m-d');
$timeDhaka = $nowDhaka->format('H:i');

// Do not send the daily message before 6 AM, even if this cron URL is tested manually.
if ($timeDhaka < '06:00') {
  echo 'Waiting for 6 AM Good Morning';
  exit;
}

// Allow the scheduled 6 AM run a short scheduler-delay window. Never send it later in the day.
if ($timeDhaka > '06:05') {
  if (($settings['good_morning_processed_date'] ?? '') !== $todayDhaka) {
    $settings['good_morning_processed_date'] = $todayDhaka;
    firebase_save('settings', $settings);
  }
  echo 'Skipped Good Morning: 6 AM window passed';
  exit;
}

if (($settings['good_morning_processed_date'] ?? '') === $todayDhaka) {
  echo 'Skipped Good Morning: already processed today';
  exit;
}

// Lock this date before sending so repeated cron calls cannot send duplicate messages.
$settings['good_morning_processed_date'] = $todayDhaka;
firebase_save('settings', $settings);

// Skip only if the bot is actually stopped when the 6 AM cron runs.
// Stopping earlier and restarting before 6 AM will not suppress today's message.
if (!empty($settings['bot_stopped'])) {
  echo 'Skipped Good Morning: bot is stopped at 6 AM';
  exit;
}

$poro = $settings['poro_limit'] ?? 100;
$lijent = $settings['lijent_limit'] ?? 100;
$msg = "💎 🌅 GOOD MORNING 💰\n\n🌅 GOOD MORNING, BANGLA TAKA FAMILY!\n\n🌞 নতুন দিনের কাজ শুরু করুন!\n\n🔔 আজকের Ad Limit 🔔\n💎 Poro Add - {$poro} 🚀\n⚡ Lijent Add - {$lijent} ✅\n\n💰 নিয়ম মেনে কাজ করুন, বেশি ইনকাম করুন!\n\n👇 নিচে Start বাটনে ক্লিক করে কাজ শুরু করুন! 👇";

$users = firebase_load('users');
foreach($users as $u){
  $id = $u['id'] ?? 0;
  if(!$id) continue;
  $kb = json_encode(['inline_keyboard'=>[[['text'=>'🚀 New Start','url'=>'https://t.me/'.getenv('BOT_USERNAME').'?start=newstart']]]], JSON_UNESCAPED_UNICODE);
  @file_get_contents("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$id}&text=".urlencode($msg)."&parse_mode=HTML&reply_markup=".urlencode($kb));
}
echo "OK {$poro}+{$lijent}";
?>
