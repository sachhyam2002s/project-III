<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}
include 'db.php';

$name = $_POST['name'];
$price = $_POST['price'];

if (isset($_FILES['image'])) {
  $image = $_FILES['image'];
  $imagePath = 'uploads/' . uniqid() . '_' . basename($image['name']);
  move_uploaded_file($image['tmp_name'], $imagePath);
  
  $stmt = $conn->prepare("INSERT INTO products (name, price, image) VALUES (?, ?, ?)");
  $stmt->bind_param("sds", $name, $price, $imagePath);
  $stmt->execute();
  
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error", "message" => "No image uploaded"]);
}
?>
