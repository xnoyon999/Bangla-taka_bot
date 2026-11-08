<?php
declare(strict_types=1);

// Minimal ad-test bot. Token comes from the BOT_TOKEN environment variable (never write it in this file).
$token = getenv('BOT_TOKEN');
if (!$token) { http_response_code(503); exit('BOT_TOKEN missing'); }

// Public URL of this site (Render sets RENDER_EXTERNAL_URL automatically; WEBAPP_URL overrides it).
$base = rtrim((string)(getenv('WEBAPP_URL') ?: getenv('RENDER_EXTERNAL_URL')), '/');

function tg(string $token, string $method, array $params): array {
    $ch = curl_init("https://api.telegram.org/bot{$token}/{$method}");
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($params),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
    ]);
    $res = curl_exec($ch);
    curl_close($ch);
    return is_string($res) ? (json_decode($res, true) ?: []) : [];
}

$raw = file_get_contents('php://input');
$update = $raw ? json_decode($raw, true) : null;
if (!is_array($update)) { echo 'OK'; exit; }   // opening the URL in a browser just shows OK

$msg = $update['message'] ?? null;
if ($msg && isset($msg['chat']['id'])) {
    $chatId = $msg['chat']['id'];
    if ($base === '') {
        tg($token, 'sendMessage', ['chat_id' => $chatId, 'text' => 'WEBAPP_URL set kora nai.']);
    } else {
        tg($token, 'sendMessage', [
            'chat_id' => $chatId,
            'text' => "AdSpark SDK test\nNiche button chaple test page khulbe.",
            'reply_markup' => ['inline_keyboard' => [[
                ['text' => '📢 Ad Test', 'web_app' => ['url' => $base . '/index.html']],
            ]]],
        ]);
    }
}
http_response_code(200);
echo 'OK';
