<?php
// save_message.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

// Obtener datos del post
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['whatsapp']) || !isset($data['message'])) {
    http_response_code(400); 
    echo json_encode(['status' => 'error', 'message' => 'Faltan campos obligatorios.']);
    exit;
}

// Validación básica de email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
     http_response_code(400);
     echo json_encode(['status' => 'error', 'message' => 'Email inválido.']);
     exit;
}

// Validación de WhatsApp (simple regex para números)
if (!preg_match("/^[0-9+ ]{8,20}$/", $data['whatsapp'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Número de WhatsApp inválido (solo números y +).']);
    exit;
}

// Limpieza básica (aunque prepared statements protegen de SQL Injection, mejor prevenir XSS si se muestra en admin)
$name = htmlspecialchars(strip_tags($data['name']));
$email = htmlspecialchars(strip_tags($data['email']));
$whatsapp = htmlspecialchars(strip_tags($data['whatsapp']));
$message = htmlspecialchars(strip_tags($data['message']));

try {
    // Insertar en tu tabla 'mensajes'
    // Asumimos 'fecha' se llena default
    $stmt = $pdo->prepare("INSERT INTO mensajes (nombre, email, whatsapp, mensaje) VALUES (:name, :email, :whatsapp, :message)");
    
    $stmt->execute([
        'name' => $name,
        'email' => $email,
        'whatsapp' => $whatsapp,
        'message' => $message
    ]);

    http_response_code(201);
    echo json_encode(['status' => 'success', 'message' => 'Mensaje guardado correctamente.']);
    
} catch(PDOException $e) {
    http_response_code(500);
    error_log($e->getMessage()); 
    echo json_encode(['status' => 'error', 'message' => 'Error al guardar el mensaje. Intente nuevamente.']);
}
?>
