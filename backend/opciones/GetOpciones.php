<?php
require_once('../includes/Opciones.class.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['idPregunta'])) {
        $idPregunta = intval($_GET['idPregunta']);
        Opciones::GetOpciones($idPregunta);
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Falta el parámetro idPregunta']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>