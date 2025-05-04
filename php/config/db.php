<?php
$host = 'localhost';
$dbname = 'newlook_db';
$user = 'root';
$password = '';

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
