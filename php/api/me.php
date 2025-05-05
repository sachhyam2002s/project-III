<?php
// If using JWT or session, validate here.
// For simplicity, we’ll skip auth and always return guest.
// In a real app, parse token from headers
echo json_encode(['user'=>null]);
?>
