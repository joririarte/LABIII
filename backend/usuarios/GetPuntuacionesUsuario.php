<?php
require_once('../includes/Usuarios.class.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if (isset($_GET['id_usuario'])) {
        $idUsuario = (int)$_GET['id_usuario'];

        Usuarios::GetPuntuacionesUsuario($idUsuario);

    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'Falta el parámetro id_usuario']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Método no permitido']);
}
?>