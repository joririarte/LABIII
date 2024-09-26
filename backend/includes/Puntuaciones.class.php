<?php
    require_once('Database.class.php');
    class Puntuaciones{//hay que modificar todo para puntuaciones
        public static function AddPregunta($texto) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL AddPregunta(:texto)');
                $stmt->bindParam(':texto', $texto);
        
                if ($stmt->execute()) {
                    header('HTTP/1.1 201 Pregunta creada correctamente');
                } else {
                    // Obtener el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2]; // Mensaje de error de la base de datos
        
                    // Enviar el error como parte de la respuesta HTTP
                    header('HTTP/1.1 500 Error al crear la Pregunta');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                // Captura de excepciones y manejo de errores de PDO
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        

        public static function GetAllPreguntas() {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL GetAllPreguntas()');
        
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll();
                    echo json_encode($result);
                    header('HTTP/1.1 200 OK');
                } else {
                    // Obtener y mostrar el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 No válido');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }

        public static function GetPregunta($id) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL GetPregunta(:id)');
                $stmt->bindParam(':id', $id);
        
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll();
                    echo json_encode($result);
                    header('HTTP/1.1 200 OK');
                } else {
                    // Obtener y mostrar el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 No válido');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        

        public static function DeletePregunta($id) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL DeletePregunta(:id)');
                $stmt->bindParam(':id', $id);
        
                if ($stmt->execute()) {
                    header('HTTP/1.1 200 Pregunta borrada correctamente');
                } else {
                    // Obtener y mostrar el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 Pregunta no se ha borrado correctamente');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        

        public static function UpdatePregunta($id, $texto) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL UpdateUser(:id, :texto)');
                $stmt->bindParam(':id', $id);
                $stmt->bindParam(':texto', $texto);
        
                if ($stmt->execute()) {
                    header('HTTP/1.1 200 Pregunta actualizada correctamente');
                } else {
                    // Obtener y mostrar el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 Pregunta no se ha actualizado correctamente');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        
    }
?>