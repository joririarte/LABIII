<?php
require_once('../includes/Opciones.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id'])) {
        $id = intval($input['id']);
        Opciones::DeleteOpcion($id);
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Falta el parámetro id']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>