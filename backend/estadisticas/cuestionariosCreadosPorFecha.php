<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once('../includes/Database.class.php');

$database = new Database();
$conn = $database->getConnection();

// Consulta para obtener la cantidad de cuestionarios por mes en los últimos 6 meses
$stmt = $conn->prepare('
    SELECT 
        DATE_FORMAT(cuestionario_fecha, "%Y-%m") AS mes, 
        COUNT(*) AS cantidad_cuestionarios 
    FROM 
        CUESTIONARIO 
    WHERE 
        cuestionario_fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) 
    GROUP BY 
        mes 
    ORDER BY 
        mes ASC
');

if ($stmt->execute()) {
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Preparar los datos en un formato que JavaScript pueda leer
$fechas = [];
$cuestionarios = [];

// Mapa de números de mes a nombres de mes
$meses = [
    1 => 'Enero',
    2 => 'Febrero',
    3 => 'Marzo',
    4 => 'Abril',
    5 => 'Mayo',
    6 => 'Junio',
    7 => 'Julio',
    8 => 'Agosto',
    9 => 'Septiembre',
    10 => 'Octubre',
    11 => 'Noviembre',
    12 => 'Diciembre'
];

// Usar foreach para procesar los resultados
foreach ($result as $row) {
    // Obtener el año y el mes
    list($anio, $mes) = explode('-', $row['mes']);
    
    // Mapear el número del mes al nombre del mes
    $nombre_mes = $meses[(int)$mes];
    
    // Agregar la fecha en el formato deseado (por ejemplo "Octubre 2024")
    $fechas[] = $nombre_mes . ' ' . $anio;
    
    // Agregar cantidad
    $cuestionarios[] = $row['cantidad_cuestionarios'];
}

// Convertir los datos a formato JSON
$response_data = [
    'fechas' => $fechas,
    'cuestionarios' => $cuestionarios
];

echo json_encode($response_data);
?>
