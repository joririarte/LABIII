<?php
require_once('../includes/Usuarios.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['username']) && isset($input['newPass']) && isset($input['newEmail'])) {
        $username = $input['username'];
        $newPass = $input['newPass'];
        $newEmail = $input['newEmail'];
        
        Usuarios::UpdateUser($username, $newPass, $newEmail);
        http_response_code(200); 
        echo json_encode(['message' => 'Usuario actualizado correctamente.']);
    } else {
        http_response_code(400); 
        echo json_encode(['error' => 'Faltan parámetros necesarios.']);
    }
} else {
    http_response_code(405); 
    echo json_encode(['error' => 'Método no permitido.']);
}
?>