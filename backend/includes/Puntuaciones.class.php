<?php
require_once('Database.class.php');
require_once('JsonFormatter.class.php');

class Puntuaciones {
    public static function AddPuntuacion($id_usuario, $id_cuestionario, $puntaje, $tiempo) {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL AddPuntuacion(:id_usuario, :id_cuestionario, :puntaje, :tiempo)');
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->bindParam(':id_cuestionario', $id_cuestionario);
            $stmt->bindParam(':puntaje', $puntaje);
            $stmt->bindParam(':tiempo', $tiempo);

            if ($stmt->execute()) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 201 OK', ['success' => 'Puntuación creada correctamente']);
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error al crear la Puntuación', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }

    public static function GetAllPuntuaciones() {
        try {
            $database = new Database();
            $conn = $database->getConnection();
            $stmt = $conn->prepare('CALL GetAllPuntuaciones()');

            if ($stmt->execute()) {
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (!empty($result)) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $result);
                } else {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 404 Puntuaciones no encontradas', ['error' => 'Puntuaciones no encontrados']);
                }
            } else {
                $errorInfo = $stmt->errorInfo();
                $errorMessage = $errorInfo[2];
                JsonFormatter::printJsonAnswer('HTTP/1.1 404 Puntuaciones no válidas', ['error' => $errorMessage]);
            }
        } catch (PDOException $e) {
            JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
        }
    }
}
?>