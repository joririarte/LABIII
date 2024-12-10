<?php 
    require_once('../includes/Usuarios.class.php');

  if( $_SERVER['REQUEST_METHOD'] == 'POST' && 
        isset($_POST['username']) &&
        isset($_POST['password'])){
        Usuarios::verifyUser($_POST['username'],
                             $_POST['password']);
    }
?>
