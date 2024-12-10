<?php
// Permitir acceso desde cualquier origen (dominio)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Permitir métodos HTTP específicos (GET, POST, OPTIONS)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');

// Permitir encabezados personalizados
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No content
    exit; // Salir para no procesar la solicitud
}

// Suponiendo que tienes una conexión activa a la base de datos
require_once('../includes/Database.class.php');

// Lee el JSON desde el cuerpo de la solicitud
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Verifica si los datos son válidos
if (!isset($data['cuestionario_id']) || !isset($data['cuestionario_preguntas'])) {
    echo json_encode(['error' => 'Datos de entrada inválidos']);
    exit;
}

$cuestionario_id = $data['cuestionario_id'];
$preguntas = $data['cuestionario_preguntas'];

$db = new Database();
$conn = $db->getConnection();

try {
    $conn->beginTransaction();

    foreach ($preguntas as $pregunta) {
        $pregunta_texto = $pregunta['pregunta_texto'];

        // Insertar la pregunta y obtener el ID devuelto
        $stmt = $conn->prepare('CALL AddPregunta(:pregunta_texto)');
        $stmt->bindParam(':pregunta_texto', $pregunta_texto);
        $stmt->execute();

        // Obtener el ID de la pregunta insertada
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $pregunta_id = $result['pregunta_id'] ?? null;

        if (!$pregunta_id) {
            throw new Exception("Error al obtener el ID de la pregunta ");
        }

        // Insertar las opciones de la pregunta
        foreach ($pregunta['pregunta_opciones'] as $opcion) {
            $opcion_texto = $opcion['opcion_texto'];
            $opcion_correcta = $opcion['opcion_correcta'];

            $stmt = $conn->prepare('CALL AddOpcion(:pregunta_id, :opcion_texto, :opcion_correcta)');
            $stmt->bindParam(':pregunta_id', $pregunta_id);
            $stmt->bindParam(':opcion_texto', $opcion_texto);
            $stmt->bindParam(':opcion_correcta', $opcion_correcta);
            $stmt->execute();
        }

        // Vincular la pregunta con el cuestionario en la tabla `preguntas_del_cuestionario`
        $stmt = $conn->prepare('CALL AddPreguntasCuestionario(:cuestionario_id, :pregunta_id)');
        $stmt->bindParam(':cuestionario_id', $cuestionario_id);
        $stmt->bindParam(':pregunta_id', $pregunta_id);
        $stmt->execute();
    }

    // Confirma la transacción
    $conn->commit();
    echo json_encode(['success' => 'Preguntas y opciones guardadas correctamente']);
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(['error' => 'Error al guardar los datos: ' . $e->getMessage()]);
}
?>