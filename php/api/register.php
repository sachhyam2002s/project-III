<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require 'db.php';

// Read JSON payload
$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username'] ?? '');
$email    = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

// Basic validation
if (!$username || !$email || !$password) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'All fields required']);
  exit;
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
  echo json_encode(['success' => false, 'message' => 'Email already registered']);
  exit;
}

// Hash password
$hash = password_hash($password, PASSWORD_BCRYPT);

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hash);
$ok = $stmt->execute();

echo json_encode([
  'success' => (bool)$ok,
  'message' => $ok ? 'Registration successful' : 'Registration failed'
]);
?>
