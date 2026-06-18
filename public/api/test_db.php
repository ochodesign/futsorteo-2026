<?php
// test_db.php
// Sube este archivo a tu carpeta /api/ junto con los otros
// Visita: https://tusitio.com/api/test_db.php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>Diagnóstico de Conexión</h1>";

require 'config.php';

echo "<p>✅ Archivo config.php cargado correctamente.</p>";

if ($pdo) {
    echo "<p>✅ Conexión PDO exitosa.</p>";
    
    // Probar consulta
    try {
        $stmt = $pdo->query("SELECT count(*) FROM users");
        $count = $stmt->fetchColumn();
        echo "<p>✅ Tabla 'users' encontrada. Usuarios registrados: $count</p>";
    } catch (Exception $e) {
        echo "<p>❌ Error al consultar tabla 'users': " . $e->getMessage() . "</p>";
        echo "<p>⚠️ Asegúrate de haber importado el archivo migration.sql en phpMyAdmin.</p>";
    }

} else {
    echo "<p>❌ La variable \$pdo no está definida.</p>";
}

echo "<hr>";
echo "<h3>Datos de Configuración (Ocultando contraseña)</h3>";
echo "Host: " . $host . "<br>";
echo "DB: " . $db . "<br>";
echo "User: " . $user . "<br>";
?>
