<?php
// login.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config.php';

// Obtener datos del post
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Falta usuario o contraseña.']);
    exit;
}

$username = $data->username;
$password = $data->password;

try {
    // Buscar usuario por username (Prepared Statement)
    $stmt = $pdo->prepare('SELECT id, password_hash FROM users WHERE username = :username LIMIT 1');
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        // En un sistema real usaríamos tokens (JWT) o sesiones, pero vamos básico pero seguro
        // Generar un token simple y guardarlo o simplemente devolver éxito para que el frontend maneje estado
        
        $token = bin2hex(random_bytes(32)); // Token de sesión temporal simulado
        
        // Aquí podrías guardar el token en la BD si quisieras invalidarlo después
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Login exitoso',
            'token' => $token,
            'user_id' => $user['id']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Credenciales inválidas.']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error en el servidor.']);
}
?>
