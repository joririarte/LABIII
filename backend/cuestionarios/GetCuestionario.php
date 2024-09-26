<?php
    require_once('../includes/Cuestionarios.class.php');

    if( $_SERVER['REQUEST_METHOD'] == 'GET' &&
        isset($_GET['id'])){
            Cuestionarios::GetCuestionario($_GET['id']);
        }
?>