<?php
require_once('Database.class.php');
require_once('JsonFormatter.class.php');

class Cuestionarios {
    public static function AddCuestionario($fecha, $categoria, $dificultad, $cantPreguntas) {
        try {
            $database = new Database();
            $conn = $database->getConnection();

            // Preparar la consulta
            $stmt = $conn->prepare('CALL AddCuestionario(:fecha, :categoria, :dificultad, :cantPreguntas)');
            $stmt->bindParam(':fecha', $fecha);
            $stmt->bindParam(':categoria', $categoria);
            $stmt->bindParam(':dificultad', $dificultad);
            $stmt->bindParam(':cantPreguntas', $cantPreguntas);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Devolver éxito si todo salió bien
                JsonFormatter::printJsonAnswer('HTTP/1.1 201 Created', ['success' => 'Cuestionario creado correctamente']);
            } else {
                // Obtener el error de la base de datos
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            // Capturar y manejar la excepción
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
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Cuestionarios no encontrados',['error' => 'Cuestionarios no encontrados']);
                }
            } else {
                // Obtener y mostrar el error de la base de datos
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

            // Primero, obtener los datos del cuestionario
            $stmtCuestionario = $conn->prepare('CALL GetCuestionario(:id)');
            $stmtCuestionario->bindParam(':id', $id);

            if ($stmtCuestionario->execute()) {
                $cuestionario = $stmtCuestionario->fetch(PDO::FETCH_ASSOC);
                $stmtCuestionario->closeCursor();

                if (!$cuestionario) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Cuestionario no encontrado', ['error' => 'Cuestionario no encontrado']);
                    return;
                }

                // Obtener las preguntas del cuestionario
                $stmtPreguntas = $conn->prepare('CALL GetPreguntasDelCuestionario(:id)');
                $stmtPreguntas->bindParam(':id', $id);

                if ($stmtPreguntas->execute()) {
                    $preguntas = $stmtPreguntas->fetchAll(PDO::FETCH_ASSOC);
                    
                    // Crear un array para almacenar las preguntas con sus opciones
                    $result = [];

                    foreach ($preguntas as $pregunta) {
                        // Agregar opciones a cada pregunta
                        $preguntaID = $pregunta['pregunta_id'];
                        $opciones = self::GetOpcionesPorPregunta($preguntaID); // Función para obtener opciones

                        // Agregar opciones a la pregunta
                        $pregunta['pregunta_opciones'] = $opciones;

                        // Agregar pregunta al resultado
                        $result[] = $pregunta;
                    }

                    // Añadir las preguntas al array del cuestionario
                    $cuestionario['cuestionario_preguntas'] = $result;

                    // Devolver el cuestionario con las preguntas y opciones
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
            // Obtener conexión a la base de datos
            $database = new Database();
            $conn = $database->getConnection();

            // Llamar al procedimiento almacenado DeleteCuestionario
            $stmt = $conn->prepare('CALL DeleteCuestionario(:id)');
            $stmt->bindParam(':id', $id, PDO::PARAM_INT); // Enlazar el ID como entero

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Si la ejecución fue exitosa, devolver respuesta positiva
                JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', ['success' => 'Cuestionario eliminado exitosamente']);
            } else {
                // Si ocurrió un error, obtener el mensaje de error
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    // Función para obtener opciones por ID de pregunta
    private static function GetOpcionesPorPregunta($preguntaID) {
        $database = new Database();
        $conn = $database->getConnection();
        
        $stmt = $conn->prepare('CALL GetOpciones(:preguntaID)');
        $stmt->bindParam(':preguntaID', $preguntaID);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Devuelve un array de opciones
    } 
}
?>