<?php
require_once('../includes/Cuestionarios.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['id_cuestionario'])) {
        $idCuestionario = (int)$_GET['id_cuestionario'];

        Cuestionarios::GetPreguntasDelCuestionario($idCuestionario);

    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Falta el parámetro id_cuestionario']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>