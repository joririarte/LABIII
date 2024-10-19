<?php
require_once('../includes/Preguntas.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    Preguntas::GetAllPreguntas();
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>