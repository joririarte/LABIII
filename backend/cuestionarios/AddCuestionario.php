<?php
require_once('../includes/Cuestionarios.class.php');  // Incluir la clase Cuestionarios

// Verificar que la solicitud sea de tipo POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Leer los datos enviados (ya sea por x-www-form-urlencoded o JSON)
    $data = json_decode(file_get_contents("php://input"), true); // Para JSON
    if (!$data) { // Si $data es null, usar $_POST en su lugar
        $data = $_POST;
    }

    // Verificar que todos los parámetros necesarios estén presentes
    if (isset($data['fecha']) && isset($data['categoria']) && isset($data['dificultad']) && isset($data['cantPreguntas'])) {
        
        // Limpiar y asignar los parámetros
        $fecha = $data['fecha'];
        $categoria = $data['categoria'];
        $dificultad = $data['dificultad'];
        $cantPreguntas = (int)$data['cantPreguntas']; // Convertir a entero

        // Llamar al método para agregar el cuestionario
        Cuestionarios::AddCuestionario($fecha, $categoria, $dificultad, $cantPreguntas);

    } else {
        // Si faltan parámetros, devolver un error
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Faltan parámetros para crear el cuestionario']);
    }
} else {
    // Si no es una solicitud POST, devolver un error
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>