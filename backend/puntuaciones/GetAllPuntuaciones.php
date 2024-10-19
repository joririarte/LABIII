<?php
    require_once('../includes/Puntuaciones.class.php');
    if( $_SERVER['REQUEST_METHOD'] == 'GET'){
        Puntuaciones::GetAllPuntuaciones();
    }
?>