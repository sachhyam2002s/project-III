<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}
include 'db.php';

$result = $conn->query("SELECT * FROM products ORDER BY id DESC");
$products = [];

while ($row = $result->fetch_assoc()) {
  $row['image'] = 'http://localhost/product-api/uploads/' . basename($row['image']);
  $products[] = $row;
}

echo json_encode($products);
?>
