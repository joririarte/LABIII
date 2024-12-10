<?php
require_once('../includes/Preguntas.class.php');

header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['texto'])) {
    Preguntas::AddPregunta($input['texto']);
} else {
    echo json_encode(['error' => 'Falta el texto de la pregunta']);
}
?>