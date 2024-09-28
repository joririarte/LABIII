<?php
    class Database{
        private $host = 'localhost';
        private $user = 'user';
        private $password = 'pass';
        private $database = 'db';
    
        public function getConnection(){
            $hostDB = "mysql:host=".$this->host.";dbname=".$this->database.";";

            try{
                $connection = new PDO($hostDB, $this->user, $this->password);
                $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $connection;
            } catch(PDOException $e){
                die("ERROR: ".$e->getMessage());
            }
        }
    }

?>
