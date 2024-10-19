<?php
    class Database{
        private $host = 'localhost';
        private $user = 'user';
        private $password = 'pass';
        private $database = 'db';
    
        public function getConnection(){
            $hostDB = "mysql:host=".$this->host.";dbname=".$this->database.";charset=utf8mb4";

            try{
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true // Habilitar el buffering
                ];
                $connection = new PDO($hostDB, $this->user, $this->password, $options);
                return $connection;
            } catch(PDOException $e){
                die("ERROR: ".$e->getMessage());
            }
        }
    }

?>
