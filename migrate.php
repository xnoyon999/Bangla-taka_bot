<?php
// Set ADMIN_MAINTENANCE_KEY in your hosting environment before using this maintenance endpoint.
$ADMIN_KEY = (string) getenv('ADMIN_MAINTENANCE_KEY');
if ($ADMIN_KEY === '' || !isset($_GET['key']) || !hash_equals($ADMIN_KEY, (string) $_GET['key'])) {
    http_response_code(403);
    exit('Forbidden');
}
require_once __DIR__ . '/firebase_helper.php';
$files = ['users','ads','withdraws','ad_sessions','settings','bonus_tasks','daily_active'];
$results = [];
foreach ($files as $base) {
    $path = __DIR__ . "/data/{$base}.json";
    if (!file_exists($path)) $path = __DIR__ . "/{$base}.json";
    if (!file_exists($path)) { $results[$base] = 'local file not found'; continue; }
    $data = json_decode(file_get_contents($path), true);
    if (!is_array($data)) $data = [];
    $ok = firebase_save($base, $data);
    $results[$base] = $ok ? 'Pushed OK - '.count($data).' items' : 'FAILED';
}
echo "<h2>Migration Result</h2><pre>"; print_r($results); echo "</pre>";
