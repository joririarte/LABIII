<?php
require_once('../includes/Usuarios.class.php');
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['username']) && isset($input['newPass']) && isset($input['newEmail'])) {
    $username = $input['username'];
    $newPass = $input['newPass'];
    $newEmail = $input['newEmail'];
    Usuarios::UpdateUser($username, $newPass, $newEmail);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan parámetros necesarios.']);
}
?>