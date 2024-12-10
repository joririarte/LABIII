<?php
require_once('../includes/Usuarios.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['action']) && $_GET['action'] === 'delete') {
    $input = json_decode(file_get_contents('php://input'), true);
    $username = isset($input['username']) ? $input['username'] : null;

    if ($username) {
        Usuarios::DeleteUser($username);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Falta el nombre de usuario.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido.']);
}
?>