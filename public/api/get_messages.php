<?php
// get_messages.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

// Verificación básica de que es un admin
session_start();
// if (!isset($_SESSION['user_id'])) { ... } // Desactivado para simplificar

try {
    // Usamos 'fecha' en lugar de 'created_at' porque así viene en tu tabla
    $stmt = $pdo->query("SELECT * FROM mensajes ORDER BY fecha DESC");
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($messages);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener mensajes']);
}
?>
