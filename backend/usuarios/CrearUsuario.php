<?php
    require_once('../includes/Usuarios.class.php');

    if( $_SERVER['REQUEST_METHOD'] == 'POST' &&
        isset($_POST['username']) &&
        isset($_POST['password']) &&
        isset($_POST['email'])){
            Usuarios::addUser(  $_POST['username'], 
                                $_POST['password'], 
                                $_POST['email']);
        }
?>