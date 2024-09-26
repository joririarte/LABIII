<?php
    require_once('Database.class.php');
    class Cuestionarios{//hay que modificar todo para cuestionarios
        public static function AddCuestionario($fecha,$categoria,$dificultad,$cantPreguntas) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL AddCuestionario(:fecha,:categoria,:dificultad,:cantPreguntas)');
                $stmt->bindParam(':fecha', $fecha);
                $stmt->bindParam(':categoria', $categoria);
                $stmt->bindParam(':dificultad', $dificultad);
                $stmt->bindParam(':cantPreguntas', $cantPreguntas);
        
                if ($stmt->execute()) {
                    header('HTTP/1.1 201 Pregunta creada correctamente');
                } else {
                    // Obtener el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2]; // Mensaje de error de la base de datos
        
                    // Enviar el error como parte de la respuesta HTTP
                    header('HTTP/1.1 500 Error al crear el Cuestionario');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                // Captura de excepciones y manejo de errores de PDO
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
        

        public static function GetAllCuestionario() {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL GetAllCuestionario()');
        
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    if (!empty($result)) {
                        header('HTTP/1.1 200 OK');
                        echo json_encode($result);
                    } else {
                        header('HTTP/1.1 404 Cuestionarios no encontrados');
                        echo json_encode(['error' => 'Cuestionarios no encontrados']);
                    }
                } else {
                    // Obtener y mostrar el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 Cuestionario no válido');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        }

        public static function GetCuestionario($id) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL GetCuestionario(:id)');
                $stmt->bindParam(':id', $id);
        
                if ($stmt->execute()) {
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    if (!empty($result)) {
                        header('HTTP/1.1 200 OK');
                        echo json_encode($result[0]);
                    } else {
                        header('HTTP/1.1 404 Cuestionario no encontrado');
                        echo json_encode(['error' => 'Cuestionario no encontrado']);
                    }
                } else {
                    // Obtener y mostrar el error de la base de datos
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    header('HTTP/1.1 404 Cuestionario no válido');
                    echo json_encode(['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                header('HTTP/1.1 500 Error del servidor');
                echo json_encode(['error' => $e->getMessage()]);
            }
        } 
    }
?>