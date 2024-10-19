<?php
require_once('../includes/Cuestionarios.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if (!$id) {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($data && isset($data['id'])) {
            $id = $data['id'];
        }
    }

    if ($id && is_numeric($id)) {
        Cuestionarios::DeleteCuestionario((int)$id);
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'ID de cuestionario no proporcionado o inválido']);
    }

} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>