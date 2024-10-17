<?php
require_once('../includes/Preguntas.class.php');

header('Content-Type: application/json');
Preguntas::GetAllPreguntas();
?>