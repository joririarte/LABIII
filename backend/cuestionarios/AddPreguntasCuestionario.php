<?php
require_once('../includes/Cuestionarios.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        $data = $_POST;
    }

    if (isset($data['id_cuestionario']) && isset($data['id_pregunta'])) {
        
        $idCuestionario = (int)$data['id_cuestionario'];
        $idPregunta = (int)$data['id_pregunta'];

        Cuestionarios::AddPreguntasCuestionario($idCuestionario, $idPregunta);

    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Faltan parámetros para añadir la pregunta al cuestionario']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>