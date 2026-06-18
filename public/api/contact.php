<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['name'], $data['email'], $data['message'])) {
        try {
            $stmt = $pdo->prepare("INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)");
            $stmt->execute([$data['name'], $data['email'], $data['message']]);
            
            echo json_encode(['status' => 'success', 'message' => '¡Mensaje enviado correctamente!']);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar en la base de datos: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Datos incompletos']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>
