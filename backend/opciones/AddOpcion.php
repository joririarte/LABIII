<?php
require_once('../includes/Opciones.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['idPregunta'], $input['texto'], $input['correcta'])) {
        Opciones::AddOpcion($input['idPregunta'], $input['texto'], $input['correcta']);
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Parámetros incompletos']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>