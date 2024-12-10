<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require_once('../includes/Database.class.php');

$database = new Database();
$conn = $database->getConnection();

$stmt = $conn->prepare('SELECT 
    cuestionario_categoria, 
    COUNT(*) AS cantidad_cuestionarios,
    (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM CUESTIONARIO)) AS porcentaje_cuestionarios
FROM 
    CUESTIONARIO
GROUP BY 
    cuestionario_categoria;
');
if ($stmt->execute()) {
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Preparar los datos en un formato que JavaScript pueda leer
$categorias = [];
$cantidades = [];
$porcentajes =[];

// Usar foreach en lugar de while
foreach ($result as $row) {
    $categorias[] = $row['cuestionario_categoria'];
    $cantidades[] = $row['cantidad_cuestionarios'];
    $porcentajes[] = $row['porcentaje_cuestionarios'];
}

// Convertir los datos a formato JSON
$response_data = [
    'categoria' => $categorias,
    'cantidades' => $cantidades,
    'porcentaje' => $porcentajes
];

echo json_encode($response_data);

?>
