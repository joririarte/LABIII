<?php
    require_once('Database.class.php');
    require_once('JsonFormatter.class.php');

class Preguntas {
    public static function AddPregunta($texto) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL AddPregunta(:texto)');
            $stmt->bindParam(':texto', $texto);

            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 201 Created', ['success' => 'Pregunta creada correctamente']);
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    public static function DeletePregunta($id) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL DeletePregunta(:id)');
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', ['success' => 'Pregunta eliminada exitosamente']);
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    public static function GetAllPreguntas() {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL GetAllPreguntas()');

            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $result);
                } else {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Preguntas no encontradas', ['error' => 'Preguntas no encontradas']);
                }
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 404 Preguntas no válidas', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    public static function GetPregunta($id) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL GetPregunta(:id)');
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                $pregunta = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$pregunta) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Pregunta no encontrada', ['error' => 'Pregunta no encontrada']);
                    return;
                }

                JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $pregunta);
            } else {
                JsonFormatter::printJsonAnswer('HTTP/1.1 404 Pregunta no válida', ['error' => 'Pregunta no válida']);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    public static function UpdatePregunta($id, $texto) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL UpdatePregunta(:id, :texto)');
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':texto', $texto);

            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', ['success' => 'Pregunta actualizada correctamente']);
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