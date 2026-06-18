<?php
// track_visit.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

// Obtener datos del post (página visitada)
$data = json_decode(file_get_contents("php://input"), true);
$page = isset($data['page']) ? $data['page'] : '/';

// Validar y limpiar
$page = filter_var($page, FILTER_SANITIZE_URL);
if (strlen($page) > 255) {
    $page = substr($page, 0, 255);
}

try {
    // Insertar visita en tabla 'visitas'
    $stmt = $pdo->prepare("INSERT INTO visitas (pagina, ip) VALUES (:page, :ip)");
    $stmt->execute([
        'page' => $page,
        'ip' => $_SERVER['REMOTE_ADDR']
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Visita registrada']);
} catch (PDOException $e) {
    // No fallar visiblemente si no se puede trackear
    error_log("Error al trackear visita: " . $e->getMessage());
    http_response_code(200); // Responder OK para no bloquear frontend
    echo json_encode(['status' => 'error', 'message' => 'Error, aunque continuamos']);
}
?>
