<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php';

// Check if form data is available
if (isset($_POST['name'], $_POST['brand'], $_POST['price'], $_FILES['image'])) {
    $name = $_POST['name'];
    $brand = $_POST['brand'];
    $price = $_POST['price'];
    $image = $_FILES['image']['name'];
    $target_dir = "uploads/";

    // Ensure image is uploaded successfully
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $image)) {
        $sql = "INSERT INTO products (name, brand, price, image) VALUES ('$name', '$brand', '$price', '$image')";
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
