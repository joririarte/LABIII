<?php
// Permitir acceso desde cualquier origen (dominio)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Permitir métodos HTTP específicos (GET, POST, etc.)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

// Permitir encabezados personalizados
header('Access-Control-Allow-Headers: Content-Type, Authorization');
// Incluir la clase de la base de datos
require_once('../includes/Database.class.php');

// Establecer el encabezado para que la respuesta sea en formato JSON
header('Content-Type: application/json');

// Crear la conexión a la base de datos
$database = new Database();
$conn = $database->getConnection();

// Consulta para obtener el número de cuestionarios
$stmt = $conn->prepare('SELECT AVG(puntuacion_puntaje) as puntaje FROM PUNTUACIONES');
if ($stmt->execute()) {
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

}

// Enviar la respuesta JSON
echo json_encode($result);
?>
