<?php
    require_once('../includes/Cuestionarios.class.php');

    if( $_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id']) && !empty($_GET['id'])) {
        Cuestionarios::GetCuestionario($_GET['id']);
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'ID inválido o faltante']);
    }
    
?>