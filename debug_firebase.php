<?php
// debug_firebase.php - check why Firebase fails.
// Set ADMIN_MAINTENANCE_KEY in your hosting environment before using this endpoint.
$ADMIN_KEY = (string) getenv('ADMIN_MAINTENANCE_KEY');
if ($ADMIN_KEY === '' || !isset($_GET['key']) || !hash_equals($ADMIN_KEY, (string) $_GET['key'])) {
    http_response_code(403);
    exit('Forbidden');
}

require_once __DIR__ . '/firebase_helper.php';

echo "<h2>Firebase Debug</h2><pre>";

$sa = firebase_get_service_account();
if (!$sa) {
    echo "❌ Service account NOT FOUND\n";
    echo "Checked env vars: FIREBASE_SERVICE_ACCOUNT, FIREBASE_CREDENTIALS\n";
    echo "Checked files: /app/firebase-service-account.json etc\n";
    echo "\nENV dump (first 100 chars):\n";
    foreach (['FIREBASE_SERVICE_ACCOUNT','FIREBASE_CREDENTIALS','GOOGLE_APPLICATION_CREDENTIALS_JSON','GOOGLE_APPLICATION_CREDENTIALS'] as $k) {
        $v = getenv($k);
        echo "$k: " . ($v ? substr($v,0,200)."..." : "empty") . "\n";
    }
} else {
    echo "✅ Service account FOUND\n";
    echo "Project ID: " . $sa['project_id'] . "\n";
    echo "Client Email: " . $sa['client_email'] . "\n";
    echo "Private key length: " . strlen($sa['private_key']) . "\n";
}

echo "\n--- Getting Token ---\n";
$token = firebase_get_access_token();
if (!$token) {
    echo "❌ Token FAILED\n";
    echo "Possible reasons:\n";
    echo "1. Private key format broken (when you pasted json, newlines \\n must stay)\n";
    echo "2. Firestore API not enabled\n";
} else {
    echo "✅ Token OK: " . substr($token,0,30) . "...\n";
}

echo "\n--- Testing Firestore Write ---\n";
// Try to create a test doc
$testData = ['test' => 'hello', 'time' => date('c')];
$body = [
    'fields' => [
        'json' => ['stringValue' => json_encode($testData)],
        'updated_at' => ['stringValue' => date('c')]
    ]
];
$res = firestore_request('PATCH', "bot_data/debug_test", $body);
if ($res) {
    echo "✅ Firestore WRITE OK\n";
    print_r($res);
} else {
    echo "❌ Firestore WRITE FAILED\n";
    echo "Check:\n";
    echo "1. Go to Firebase Console > Build > Firestore Database > Is database created? If not, click Create Database\n";
    echo "2. Firestore API enabled? Go to https://console.cloud.google.com/apis/library/firestore.googleapis.com?project=" . ($sa['project_id'] ?? 'money-max-bot-4a142') . " and enable\n";
    // try direct curl error
    $sa = firebase_get_service_account();
    if ($sa) {
        $projectId = $sa['project_id'];
        // try raw request to get error
        $token = firebase_get_access_token();
        $url = "https://firestore.googleapis.com/v1/projects/{$projectId}/databases/(default)/documents/bot_data/debug_test";
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'PATCH',
            CURLOPT_HTTPHEADER => ["Authorization: Bearer {$token}", "Content-Type: application/json"],
            CURLOPT_POSTFIELDS => json_encode($body),
            CURLOPT_TIMEOUT => 20
        ]);
        $raw = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        echo "\nRaw Firestore response: HTTP $code\n$raw\n";
    }
}

echo "</pre>";
