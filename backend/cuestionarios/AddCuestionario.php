<?php
require_once('../includes/Cuestionarios.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        $data = $_POST;
    }

    if (isset($data['fecha']) && isset($data['categoria']) && isset($data['dificultad']) && isset($data['cantPreguntas'])) {
        
        $fecha = $data['fecha'];
        $categoria = $data['categoria'];
        $dificultad = $data['dificultad'];
        $cantPreguntas = (int)$data['cantPreguntas'];

        Cuestionarios::AddCuestionario($fecha, $categoria, $dificultad, $cantPreguntas);

    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Faltan parámetros para crear el cuestionario']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>