<?php 
    require_once('../includes/Usuarios.class.php');

    //para filtrar el select bastaría con comprobar con isset los parametros que se quieren selecionar
    if( $_SERVER['REQUEST_METHOD'] == 'POST' && 
        isset($_POST['username']) &&
        isset($_POST['password'])){
        Usuarios::verifyUser($_POST['username'],
                             $_POST['password']);
    }
?>