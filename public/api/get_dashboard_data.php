<?php
// get_dashboard_data.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require 'config.php';

try {
    // 1. Total visitas
    $totalVisits = $pdo->query("SELECT COUNT(*) FROM visitas")->fetchColumn();
    // 2. Visitas últimos 7 días
    // 3. Visitas últimos 30 días
    
    // Obtener datos para gráfico por día últimos 30 días
    $stmtChart = $pdo->query("
        SELECT DATE(fecha) as date, COUNT(*) as count 
        FROM visitas 
        WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
        GROUP BY DATE(fecha) 
        ORDER BY date ASC
    ");
    $chartData = $stmtChart->fetchAll(PDO::FETCH_ASSOC);

    // Total mensajes no leídos
    $unreadMessages = $pdo->query("SELECT COUNT(*) FROM mensajes WHERE leido = 0")->fetchColumn();

    $response = [
        'stats' => [
            'total_visits' => $totalVisits,
            'unread_messages' => $unreadMessages,
            // 'weekly_growth' => '+5%' // Dummy data o calcularlo
        ],
        'chart_data' => $chartData
    ];

    echo json_encode($response);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener datos: ' . $e->getMessage()]);
}
?>
