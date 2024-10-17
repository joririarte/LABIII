<?php
require_once('../includes/Opciones.class.php');

// Verificar que los datos se hayan enviado correctamente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos del cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);

    // Verificar que todos los parámetros estén presentes
    if (isset($input['idPregunta'], $input['texto'], $input['correcta'])) {
        // Llamar a la función para agregar la opción
        Opciones::AddOpcion($input['idPregunta'], $input['texto'], $input['correcta']);
    } else {
        // Responder con un error si faltan parámetros
        JsonFormatter::printJsonAnswer('HTTP/1.1 400 Bad Request', ['error' => 'Parámetros incompletos']);
    }
} else {
    // Responder con un error si no se está utilizando el método POST
    JsonFormatter::printJsonAnswer('HTTP/1.1 405 Method Not Allowed', ['error' => 'Método no permitido']);
}
?>