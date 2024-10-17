<?php
require_once('../includes/Opciones.class.php');

// Verificar que se esté utilizando el método GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Verificar si se ha enviado el parámetro idPregunta
    if (isset($_GET['idPregunta'])) {
        // Obtener el ID de la pregunta
        $idPregunta = intval($_GET['idPregunta']);
        
        // Llamar a la función para obtener las opciones
        Opciones::GetOpciones($idPregunta);
    } else {
        // Responder con un error si el parámetro idPregunta no está presente
        JsonFormatter::printJsonAnswer('HTTP/1.1 400 Bad Request', ['error' => 'Falta el parámetro idPregunta']);
    }
} else {
    // Responder con un error si no se está utilizando el método GET
    JsonFormatter::printJsonAnswer('HTTP/1.1 405 Method Not Allowed', ['error' => 'Método no permitido']);
}
?>