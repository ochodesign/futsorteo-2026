<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    exit;
}

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if ($data) {
        $filename = 'sorteos.json';
        $current_data = [];
        
        if (file_exists($filename)) {
            $current_data = json_decode(file_get_contents($filename), true);
            if (!is_array($current_data)) $current_data = [];
        }
        
        $data['timestamp'] = date('Y-m-d H:i:s');
        $current_data[] = $data;
        
        if (file_put_contents($filename, json_encode($current_data, JSON_PRETTY_PRINT))) {
            echo json_encode(['status' => 'success', 'message' => 'Sorteo guardado correctamente']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar el archivo']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Datos inválidos']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>
