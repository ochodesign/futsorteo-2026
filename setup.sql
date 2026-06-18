-- Tabla para Usuarios (Administradores)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para Mensajes de Contacto
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Tabla para Visitas (Métricas)
CREATE TABLE IF NOT EXISTS visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page VARCHAR(100) DEFAULT '/',
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) -- Para contar visitas únicas si se desea
);

-- Insertar un usuario admin por defecto (usuario: 'Lucas', password: 'Armani11')
INSERT INTO users (username, password_hash) 
SELECT 'Lucas', '$2y$10$qSVuGm4CfASU78VmIYrGmOTX6YfifQo1TZhr9TyWuVYSZH359WLfG'
WHERE NOT EXISTS (SELECT * FROM users WHERE username = 'Lucas');
