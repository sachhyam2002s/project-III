<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php';

// Check if form data is available
if (isset($_POST['name'], $_POST['brand'], $_POST['price'], $_FILES['image'], $_POST['discount'] )) {
    $name = $_POST['name'];
    $brand = $_POST['brand'];
    $price = $_POST['price'];
    $image = $_FILES['image']['name'];
    $discount = $_POST['discount'] ?? 0;
    $discount_type = $_POST['discount_type'] ?? 'percent';
    $target_dir = "uploads/";

    // Ensure image is uploaded successfully
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $image)) {
        $sql = "INSERT INTO products (name, brand, price, image, discount, discount_type) VALUES ('$name', '$brand', '$price', '$image', 'discount', 'discount_type')";
        if ($conn->query($sql)) {
            // Send back the image path for the frontend
            echo json_encode(['success' => true, 'image' => $target_dir . $image]);
        } else {
            echo json_encode(['success' => false]);
        }
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
