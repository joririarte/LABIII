<?php
    require_once('Database.class.php');
    require_once('JsonFormatter.class.php');

    class Cuestionarios{
        public static function AddCuestionario($fecha,$categoria,$dificultad,$cantPreguntas,$nombre) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
                $stmt = $conn->prepare('CALL AddCuestionario(:fecha,:categoria,:dificultad,:cantPreguntas, :nombre)');
                $stmt->bindParam(':fecha', $fecha);
                $stmt->bindParam(':categoria', $categoria);
                $stmt->bindParam(':dificultad', $dificultad);
                $stmt->bindParam(':cantPreguntas', $cantPreguntas);
                $stmt->bindParam(':nombre', $nombre);
        
                if ($stmt->execute()) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 201 OK', ['success' => 'pregunta creada correctamente']);
                } else {
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error al crear el Cuestionario', ['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
            }
        }
        

        public static function GetAllCuestionario() {
            try {
                $database = new Database();
                $conn = $database->getConnection();
        
                $stmt = $conn->prepare('CALL GetAllCuestionario()');
        
                if ($stmt->execute()) {
                    // Fetch all results immediately
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $stmt->closeCursor(); // Close the cursor to free up the connection
        
                    foreach ($result as &$cuestionario) {
                        $cuestionarioId = $cuestionario['cuestionario_id'];
                        $expectedQuestions = $cuestionario['cuestionario_cantidad_preguntas'];
        
                        // Query to count actual questions in `preguntas_del_cuestionario` for this `cuestionario_id`
                        $stmtCount = $conn->prepare('
                            SELECT COUNT(*) AS actualQuestions
                            FROM PREGUNTAS_DEL_CUESTIONARIO
                            WHERE pdc_cuestionario_id = :cuestionarioId
                        ');
                        $stmtCount->bindParam(':cuestionarioId', $cuestionarioId, PDO::PARAM_INT);
                        $stmtCount->execute();
        
                        $actualQuestions = $stmtCount->fetch(PDO::FETCH_ASSOC)['actualQuestions'];
                        $stmtCount->closeCursor(); // Close after each query
        
                        // Determine if cuestionario is complete
                        $cuestionario['cuestionario_completo'] = $actualQuestions >= $expectedQuestions;
                    }
        
                    JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $result);
                } else {
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Cuestionario no válido', ['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
            }
        }
        
        

        public static function GetCuestionario($id) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
                $stmtCuestionario = $conn->prepare('CALL GetCuestionario(:id)');
                $stmtCuestionario->bindParam(':id', $id);
        
                if ($stmtCuestionario->execute()) {
                    $cuestionario = $stmtCuestionario->fetch(PDO::FETCH_ASSOC);
                    $stmtCuestionario->closeCursor();
        
                    if (!$cuestionario) {
                        JsonFormatter::printJsonAnswer('HTTP/1.1 404 Cuestionario no encontrado', ['error' => 'Cuestionario no encontrado']);
                        return;
                    }
        
                    $stmtPreguntas = $conn->prepare('CALL GetPreguntasDelCuestionario(:id)');
                    $stmtPreguntas->bindParam(':id', $id);
        
                    if ($stmtPreguntas->execute()) {
                        $preguntas = $stmtPreguntas->fetchAll(PDO::FETCH_ASSOC);
                        $result = [];
        
                        foreach ($preguntas as $pregunta) {
                            $preguntaID = $pregunta['pregunta_id'];
                            $opciones = self::GetOpcionesPorPregunta($preguntaID);
                            $pregunta['pregunta_opciones'] = $opciones;
                            $result[] = $pregunta;
                        }

                        $cuestionario['cuestionario_preguntas'] = $result;
                        JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $cuestionario);
                    } else {
                        JsonFormatter::printJsonAnswer('HTTP/1.1 404 Preguntas no encontradas', ['error' => 'Preguntas no encontradas']);
                    }
                } else {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Cuestionario no encontrado', ['error' => 'Cuestionario no encontrado']);
                }
            } catch (PDOException $e) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
            }
        }
        
        private static function GetOpcionesPorPregunta($preguntaID) {
            $database = new Database();
            $conn = $database->getConnection();
            
            $stmt = $conn->prepare('CALL GetOpciones(:preguntaID)');
            $stmt->bindParam(':preguntaID', $preguntaID);
            $stmt->execute();
            
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 


    }
?>