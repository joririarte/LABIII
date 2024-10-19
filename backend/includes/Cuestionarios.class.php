<?php
require_once('Database.class.php');
require_once('JsonFormatter.class.php');

class Cuestionarios {
    public static function AddCuestionario($fecha, $categoria, $dificultad, $cantPreguntas) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL AddCuestionario(:fecha, :categoria, :dificultad, :cantPreguntas)');
            $stmt->bindParam(':fecha', $fecha);
            $stmt->bindParam(':categoria', $categoria);
            $stmt->bindParam(':dificultad', $dificultad);
            $stmt->bindParam(':cantPreguntas', $cantPreguntas);

            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 201 Created', ['success' => 'Cuestionario creado correctamente']);
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
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
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $result);
                } else {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Cuestionarios no encontrados', ['error' => 'Cuestionarios no encontrados']);
                }
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

    public static function DeleteCuestionario($id) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL DeleteCuestionario(:id)');
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', ['success' => 'Cuestionario eliminado exitosamente']);
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
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

    public static function AddPreguntasCuestionario($id_cuestionario, $id_pregunta) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL AddPreguntasCuestionario(:id_cuestionario, :id_pregunta)');
            $stmt->bindParam(':id_cuestionario', $id_cuestionario, PDO::PARAM_INT);
            $stmt->bindParam(':id_pregunta', $id_pregunta, PDO::PARAM_INT);
    
            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 201 Created', ['success' => 'Pregunta añadida al cuestionario correctamente']);
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    public static function DeletePreguntasCuestionario($id_cuestionario, $id_pregunta) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL DeletePreguntasCuestionario(:id_cuestionario, :id_pregunta)');
            $stmt->bindParam(':id_cuestionario', $id_cuestionario, PDO::PARAM_INT);
            $stmt->bindParam(':id_pregunta', $id_pregunta, PDO::PARAM_INT);

            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', ['success' => 'Pregunta eliminada del cuestionario correctamente']);
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    public static function GetPreguntasDelCuestionario($id_cuestionario) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL GetPreguntasDelCuestionario(:id_cuestionario)');
            $stmt->bindParam(':id_cuestionario', $id_cuestionario, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $result);
                } else {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 No se encontraron preguntas', ['error' => 'No se encontraron preguntas para el cuestionario']);
                }
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }
    
    public static function GetPuntuacionesCuestionario($id_cuestionario) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL GetPuntuacionesCuestionario(:id_cuestionario)');
            $stmt->bindParam(':id_cuestionario', $id_cuestionario, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $result);
                } else {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 No se encontraron puntuaciones', ['error' => 'No se encontraron puntuaciones para el cuestionario']);
                }
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }
    
}
?>