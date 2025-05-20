<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require 'db.php';

// 1) Read incoming email
$data  = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email'] ?? '');

if (!$email) {
  http_response_code(400);
  echo json_encode(['success'=>false, 'message'=>'Email is required']);
  exit;
}

// 2) Look up the user
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($userId);

if (!$stmt->fetch()) {
    // Always respond with success to avoid disclosing user existence
    echo json_encode(['success'=>true,'message'=>'Reset link generated.', 'resetLink' => $resetLink]);
    exit;
}
$stmt->close();

// 3) Generate a secure token & expiry (1 hour from now)
$token   = bin2hex(random_bytes(32)); 
$expires = date('Y-m-d H:i:s', time() + 3600);

// 4) Store it
$stmt = $conn->prepare("
    INSERT INTO password_resets (user_id, token, expires_at) 
    VALUES (?, ?, ?)
");
$stmt->bind_param("iss", $userId, $token, $expires);
$stmt->execute();
$stmt->close();

// 5) Send the reset email (simple mail(); replace with PHPMailer in prod)
$resetLink = "https://your-domain.com/reset_password.php?token={$token}";
$subject   = "Your password reset link";
$message   = "Click here to reset your password:\n\n{$resetLink}\n\n"
           . "This link will expire in 1 hour.";
// mail($email, $subject, $message);  // uncomment in real use

echo json_encode([
  'success' => true,
  'message' => 'Reset link generated.',
  'resetLink' => $resetLink
]);
