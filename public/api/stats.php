<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Incrementar el contador
        $stmt = $pdo->prepare("UPDATE stats SET value = value + 1 WHERE name = 'total_sorteos'");
        $stmt->execute();
        echo json_encode(['success' => true]);
    } else {
        // Obtener el contador
        $stmt = $pdo->query("SELECT value FROM stats WHERE name = 'total_sorteos'");
        $result = $stmt->fetch();
        echo json_encode(['total' => $result ? (int)$result['value'] : 0]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
