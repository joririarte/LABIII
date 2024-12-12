<?php
    require_once('../includes/Puntuaciones.class.php');
    if( $_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
        Puntuaciones::GetPuntuacionesCuestionario($_GET['id']);
    }
?>