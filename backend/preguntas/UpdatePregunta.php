<?php
require_once('../includes/Preguntas.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id']) && isset($input['texto'])) {
        Preguntas::UpdatePregunta($input['id'], $input['texto']);
    } else {
        echo json_encode(['error' => 'Faltan el ID o el texto de la pregunta']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>