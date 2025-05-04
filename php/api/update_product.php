<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
include 'db.php';

$id    = intval($_POST['id']);
$name  = $_POST['name'];
$price = $_POST['price'];

if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
  $image = $_FILES['image'];
  $imagePath = 'uploads/' . uniqid() . '_' . basename($image['name']);
  move_uploaded_file($image['tmp_name'], $imagePath);

  $stmt = $conn->prepare(
    "UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?"
  );
  $stmt->bind_param("sdsi", $name, $price, $imagePath, $id);
} else {
  $stmt = $conn->prepare(
    "UPDATE products SET name = ?, price = ? WHERE id = ?"
  );
  $stmt->bind_param("sdi", $name, $price, $id);
}

$success = $stmt->execute();
echo json_encode([ 'success' => $success ]);
?>
