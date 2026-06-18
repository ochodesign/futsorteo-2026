-- COPIA Y PEGA ESTO EN LA PESTAÑA "SQL" DE TU PHPMYADMIN
-- No borrará tus datos actuales, solo agregará lo que falta.

-- 1. Crear tabla de usuarios para el admin
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insertar usuario 'Lucas' con contraseña 'Armani11'
-- (Si ya existe, no hace nada)
INSERT IGNORE INTO users (username, password_hash) 
VALUES ('Lucas', '$2y$10$qSVuGm4CfASU78VmIYrGmOTX6YfifQo1TZhr9TyWuVYSZH359WLfG');

-- 3. Actualizar tu tabla 'mensajes' existente
-- Agregamos la columna whatsapp (si no existe) y leido
ALTER TABLE mensajes ADD COLUMN IF NOT EXISTS whatsapp VARCHAR(50) DEFAULT '';
ALTER TABLE mensajes ADD COLUMN IF NOT EXISTS leido BOOLEAN DEFAULT FALSE;

-- 4. Crear tabla para las visitas (Métricas)
CREATE TABLE IF NOT EXISTS visitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pagina VARCHAR(100) DEFAULT '/',
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(45)
);
