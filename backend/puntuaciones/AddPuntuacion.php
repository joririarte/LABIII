<?php
    require_once('../includes/Puntuaciones.class.php');

    if( $_SERVER['REQUEST_METHOD'] == 'POST' &&
        isset($_POST['idUsuario'])           &&
        isset($_POST['idCuestionario'])      &&
        isset($_POST['puntaje'])             &&
        isset($_POST['tiempo'])){
            Usuarios::AddPuntuacion(    $_POST['idUsuario'], 
                                        $_POST['idCuestionario'], 
                                        $_POST['puntaje'],
                                        $_POST['tiempo']);
        }
?>
