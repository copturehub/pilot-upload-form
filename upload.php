<?php
$pilot = $_POST['pilot'] ?? 'unknown';
$project = $_POST['project'] ?? 'unknown';
$uploadDir = "uploads/$pilot/$project/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

foreach ($_FILES['files']['tmp_name'] as $index => $tmpName) {
    $name = basename($_FILES['files']['name'][$index]);
    move_uploaded_file($tmpName, $uploadDir . $name);
}

echo "Uppladdning klar!";
?>
