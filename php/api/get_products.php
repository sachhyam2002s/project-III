<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php';

// Fetch all products
$sql = "SELECT id, name, brand, price, image FROM products";
$result = $conn->query($sql);

$products = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Build full URL for the image
        $image_url = 'http://192.168.1.77/product-api/uploads/' . $row['image'];
        $products[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'brand' => $row['brand'],
            'price' => $row['price'],
            'image' => $image_url,
        ];
    }
}

echo json_encode($products);
?>
