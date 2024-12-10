<?php
    require_once('../includes/Cuestionarios.class.php');
    if( $_SERVER['REQUEST_METHOD'] == 'GET'){
        Cuestionarios::GetAllCuestionario();
    }
?>