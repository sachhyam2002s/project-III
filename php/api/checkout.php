<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

include 'db.php';

// Read JSON
$data = json_decode(file_get_contents('php://input'), true);

$user_id  = intval($data['user_id']);
$customer = $data['customer'];  // ['fullname','number','email','city','payment']
$items    = $data['items'];     // [{product_id,quantity,price},…]
$total    = floatval($data['total']);

// --- 1. Insert order ---
$orderStmt = $conn->prepare("
  INSERT INTO orders
    (user_id, total, fullname, contact, email, city, payment)
  VALUES (?,?,?,?,?,?,?)
");
$orderStmt->bind_param(
  "idsssss",
  $user_id,
  $total,
  $customer['fullname'],
  $customer['number'],
  $customer['email'],
  $customer['city'],
  $customer['payment']
);

if (!$orderStmt->execute()) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'error'   => "Order insert failed: " . $orderStmt->error
  ]);
  exit;
}

$order_id = $conn->insert_id;

// --- 2. Insert order items ---
$itemStmt = $conn->prepare("
  INSERT INTO order_items 
    (order_id, product_id, quantity, price)
  VALUES (?,?,?,?)
");

foreach ($items as $it) {
  $pid = intval($it['product_id']);
  $qty = intval($it['quantity']);
  $prc = floatval($it['price']);

  $itemStmt->bind_param("iiid", $order_id, $pid, $qty, $prc);
  if (!$itemStmt->execute()) {
    error_log("Failed to insert item (order $order_id, product $pid): " . $itemStmt->error);
    // Continue inserting others, or break out if you prefer
  }
}

// --- 3. Return success ---
echo json_encode([
  'success'  => true,
  'order_id' => $order_id
]);
