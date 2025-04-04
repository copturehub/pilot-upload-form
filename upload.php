<?php
header('Content-Type: application/json');

// Sanera inkommande värden för säkerhets skull
$pilot = isset($_POST['pilot']) ? preg_replace('/[^a-zA-Z0-9_\-]/', '_', $_POST['pilot']) : 'unknown';
$project = isset($_POST['project']) ? preg_replace('/[^a-zA-Z0-9_\-]/', '_', $_POST['project']) : 'unknown';

$uploadDir = __DIR__ . "/uploads/$pilot/$project/";

if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true)) {
        http_response_code(500);
        echo json_encode(["error" => "Kunde inte skapa mapp: $uploadDir"]);
        exit;
    }
}

if (!isset($_FILES['files'])) {
    http_response_code(400);
    echo json_encode(["error" => "Inga filer mottagna."]);
    exit;
}

foreach ($_FILES['files']['tmp_name'] as $index => $tmpName) {
    $name = basename($_FILES['files']['name'][$index]);
    $destination = $uploadDir . $name;

    if (!move_uploaded_file($tmpName, $destination)) {
        http_response_code(500);
        echo json_encode(["error" => "Misslyckades med att spara fil: $name"]);
        exit;
    }
}

echo json_encode(["success" => true, "message" => "Uppladdning klar!", "path" => "$pilot/$project/"]);
