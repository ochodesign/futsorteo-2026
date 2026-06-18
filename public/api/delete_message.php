<?php
// delete_message.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

// Auth check...

// Obtener ID del mensaje
$data = json_decode(file_get_contents("php://input"), true);
$id = (int)$data['id'];

if (!$id) {
    http_response_code(400); 
    echo json_encode(['error' => 'ID inválido']);
    exit;
}

try {
    // Usamos 'mensajes'
    $stmt = $pdo->prepare("DELETE FROM mensajes WHERE id = :id");
    $stmt->execute(['id' => $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Mensaje no encontrado']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al borrar mensaje']);
}
?>
