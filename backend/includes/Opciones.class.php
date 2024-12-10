<?php
    require_once('Database.class.php');
    require_once('JsonFormatter.class.php');

    class Opciones {
        public static function AddOpcion($idPregunta, $texto, $correcta) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
                $stmt = $conn->prepare('CALL AddOpcion(:idPregunta, :texto, :correcta)');
                $stmt->bindParam(':idPregunta', $idPregunta, PDO::PARAM_INT);
                $stmt->bindParam(':texto', $texto, PDO::PARAM_STR);
                $stmt->bindParam(':correcta', $correcta, PDO::PARAM_BOOL);

                if ($stmt->execute()) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 201 Created', ['success' => 'Opción agregada correctamente']);
                } else {
                    $errorInfo = $stmt->errorInfo();
                    $errorMessage = $errorInfo[2];
                    JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error', ['error' => $errorMessage]);
                }
            } catch (PDOException $e) {
                JsonFormatter::printJsonAnswer('HTTP/1.1 500 Error del servidor', ['error' => $e->getMessage()]);
            }
        }

        public static function GetOpciones($idPregunta) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
                $stmt = $conn->prepare('CALL GetOpciones(:idPregunta)');
                $stmt->bindParam(':idPregunta', $idPregunta, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    $opciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    if (!empty($opciones)) {
                        JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', $opciones);
                    } else {
                        JsonFormatter::printJsonAnswer('HTTP/1.1 404 Opciones no encontradas', ['error' => 'Opciones no encontradas']);
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

        public static function DeleteOpcion($id) {
            try {
                $database = new Database();
                $conn = $database->getConnection();
                $stmt = $conn->prepare('CALL DeleteOpcion(:id)');
                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                if ($stmt->execute()) {
                    JsonFormatter::printJsonAnswer('HTTP/1.1 200 OK', ['success' => 'Opción eliminada correctamente']);
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