<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit(0);
}
include 'db.php';

if (!isset($_POST['id'])) {
  echo json_encode(['success' => false, 'error' => 'No ID provided']);
  exit;
}

$id = intval($_POST['id']);
$stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
$stmt->bind_param("i", $id);
$success = $stmt->execute();

echo json_encode([ 'success' => $success ]);
?>
