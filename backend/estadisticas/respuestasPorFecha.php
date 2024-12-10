<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require_once('../includes/Database.class.php');

$database = new Database();
$conn = $database->getConnection();

$stmt = $conn->prepare('SELECT puntuacion_fecha, COUNT(*) AS cantidad_respuestas FROM PUNTUACIONES GROUP BY puntuacion_fecha');
if ($stmt->execute()) {
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Preparar los datos en un formato que JavaScript pueda leer
$fechas = [];
$cantidades = [];

// Usar foreach en lugar de while
foreach ($result as $row) {
    $fechas[] = $row['puntuacion_fecha'];
    $cantidades[] = $row['cantidad_respuestas'];
}

// Convertir los datos a formato JSON
$response_data = [
    'fechas' => $fechas,
    'cantidades' => $cantidades
];

echo json_encode($response_data);

?>
