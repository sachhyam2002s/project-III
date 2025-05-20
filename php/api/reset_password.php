<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require 'db.php';

// 1) Read token & new password from request
$data      = json_decode(file_get_contents('php://input'), true);
$token     = trim($data['token'] ?? '');
$newPass   = $data['password'] ?? '';

if (!$token || !$newPass) {
  http_response_code(400);
  echo json_encode(['success'=>false,'message'=>'Token and new password are required']);
  exit;
}

// 2) Look up token
$stmt = $conn->prepare("
    SELECT pr.user_id, pr.expires_at 
    FROM password_resets pr 
    WHERE pr.token = ? 
      AND pr.expires_at > NOW()
");
$stmt->bind_param("s", $token);
$stmt->execute();
$stmt->bind_result($userId, $expiresAt);

if (!$stmt->fetch()) {
    echo json_encode(['success'=>false,'message'=>'Invalid or expired token']);
    exit;
}
$stmt->close();

// 3) Hash new password & update user
$hash = password_hash($newPass, PASSWORD_BCRYPT);
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$stmt->bind_param("si", $hash, $userId);
$ok = $stmt->execute();
$stmt->close();

if (!$ok) {
  echo json_encode(['success'=>false,'message'=>'Failed to update password']);
  exit;
}

// 4) Cleanup: remove used token
$stmt = $conn->prepare("DELETE FROM password_resets WHERE token = ?");
$stmt->bind_param("s", $token);
$stmt->execute();
$stmt->close();

echo json_encode(['success'=>true,'message'=>'Password has been reset']);
