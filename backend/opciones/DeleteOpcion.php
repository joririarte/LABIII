<?php
require_once('../includes/Opciones.class.php');

// Verificar que el método sea DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Obtener los datos del cuerpo de la solicitud
    parse_str(file_get_contents('php://input'), $input);

    // Verificar que se haya enviado el parámetro id
    if (isset($input['id'])) {
        // Obtener el ID de la opción
        $id = intval($input['id']);
        
        // Llamar a la función para eliminar la opción
        Opciones::DeleteOpcion($id);
    } else {
        // Responder con un error si el parámetro id no está presente
        JsonFormatter::printJsonAnswer('HTTP/1.1 400 Bad Request', ['error' => 'Falta el parámetro id']);
    }
} else {
    // Responder con un error si no se está utilizando el método DELETE
    JsonFormatter::printJsonAnswer('HTTP/1.1 405 Method Not Allowed', ['error' => 'Método no permitido']);
}
?>