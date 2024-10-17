<?php
require_once('../includes/Preguntas.class.php');

header('Content-Type: application/json');

if (isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    Preguntas::GetPregunta($id);
} else {
    echo json_encode(['error' => 'Falta el ID de la pregunta']);
}
?>