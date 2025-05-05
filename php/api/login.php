<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Email and password required']);
  exit;
}

// Fetch user by email
$stmt = $conn->prepare("SELECT id, username, password, is_admin FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
  // Verify password
  if (password_verify($password, $row['password'])) {
    // Successful login
    echo json_encode([
      'success' => true,
      'user' => [
        'id'       => (int)$row['id'],
        'username' => $row['username'],
        'email'    => $email,
        'is_admin' => (bool)$row['is_admin']
      ]
    ]);
  } else {
    // Wrong password
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
  }
} else {
  // No such email
  echo json_encode(['success' => false, 'message' => 'User not found']);
}
?>
