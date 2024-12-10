<?php
    class JsonFormatter{
        public static function printJsonAnswer($httpHeadder, $jsonAnswer){
            header($httpHeadder);
            header('Content-Type: application/json');
            echo json_encode($jsonAnswer, JSON_UNESCAPED_UNICODE);
        }
    }
?>