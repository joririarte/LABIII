<?php
    require_once('Database.class.php');
    class Usuarios{
        public static function addUser($username, $password, $email) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL AddUser(:username, :password, :email)');
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':email', $email);
        
                if ($stmt->execute()) {
                    header('HTTP/1.1 201 Usuario creado correctamente');
                } else {
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 500 Error al crear el usuario');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }      

        public static function verifyUser($username, $password) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL VerifyUser(:username, :password)');
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password', $password);
        
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    if (!empty($result)) {
                        header('HTTP/1.1 200 OK');
                        echo json_encode($result[0]);
                    } else {
                        header('HTTP/1.1 404 Usuario no válido');
                        echo json_encode(['error' => 'Usuario no encontrado']);
                    }
                } else {
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 Usuario no válido');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        

        public static function DeleteUser($username) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL DeleteUser(:username)');
                $stmt->bindParam(':username', $username);
        
                if ($stmt->execute()) {
                    header('HTTP/1.1 200 Usuario borrado correctamente');
                } else {
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 Usuario no se ha borrado correctamente');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        

        public static function UpdateUser($username, $password, $email) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL UpdateUser(:username, :password, :email)');
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':email', $email);
        
                if ($stmt->execute()) {
                    header('HTTP/1.1 200 Usuario actualizado correctamente');
                } else {
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 Usuario no se ha actualizado correctamente');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        
    }
?>