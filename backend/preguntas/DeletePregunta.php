<?php
require_once('../includes/Preguntas.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id'])) {
        $id = (int) $input['id'];
        Preguntas::DeletePregunta($id);
    } else {
        echo json_encode(['error' => 'Falta el ID de la pregunta']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>