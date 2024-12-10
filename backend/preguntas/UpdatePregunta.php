<?php
require_once('../includes/Preguntas.class.php');

header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id']) && isset($input['texto'])) {
    Preguntas::UpdatePregunta($input['id'], $input['texto']);
} else {
    echo json_encode(['error' => 'Faltan el ID o el texto de la pregunta']);
}
?>