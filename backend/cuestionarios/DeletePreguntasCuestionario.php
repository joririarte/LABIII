<?php
require_once('../includes/Cuestionarios.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        $data = $_POST;
    }

    if (isset($data['id_cuestionario']) && isset($data['id_pregunta'])) {
        
        $idCuestionario = (int)$data['id_cuestionario'];
        $idPregunta = (int)$data['id_pregunta'];

        Cuestionarios::DeletePreguntasCuestionario($idCuestionario, $idPregunta);

    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Faltan parámetros para eliminar la pregunta del cuestionario']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>