<?php
// Configuración de la Base de Datos
// ACTUALIZADO CON LOS DATOS DE HOSTINGER
$host = 'localhost'; 
$db   = 'u506439444_futsorteo26';
$user = 'u506439444_futsorteo26';   
$pass = 'Morellita11'; // <--- ASEGÚRATE QUE SEA ESTA, SEGUN TU CAPTURA DE PHPMYADMIN

$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    // IMPORTANTE: No hacer echo aquí para no romper el JSON del login
    // http_response_code(500);
    // echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    // exit;
    // Dejar que falle en el script principal si es necesario
    $pdo = null;
    error_log("Error de conexión: " . $e->getMessage());
}
?>
