<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db.php';

// Check if form data is available
if (isset($_POST['id'], $_POST['name'], $_POST['price'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $image = $_FILES['image']['name'] ?? null;
    $target_dir = "uploads/";

    if ($image) {
        // If an image is uploaded, move it to the uploads folder
        move_uploaded_file($_FILES['image']['tmp_name'], $target_dir . $image);
        // Update the database with the new image name
        $sql = "UPDATE products SET name = '$name', price = '$price', image = '$image' WHERE id = '$id'";
    } else {
        // If no image is uploaded, just update the name and price
        $sql = "UPDATE products SET name = '$name', price = '$price' WHERE id = '$id'";
    }

    if ($conn->query($sql)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
