# FutSorteo - Elite Edition 🏆

Aplicación premium para sortear equipos de fútbol, configurada específicamente para Hostinger.

## Tecnologías
- **Frontend:** React 19 + Vite + Tailwind CSS 4
- **Animaciones:** Framer Motion + Canvas Confetti
- **Backend:** PHP (Simple API en `/api/save.php`)
- **Persistencia:** JSON (`/api/sorteos.json`)
- **Despliegue:** Optimizado para Apache/Hostinger con `.htaccess`

## Cómo desplegar en Hostinger
1. Ejecutá el comando de build:
   ```bash
   npm run build
   ```
2. La carpeta `dist` se generará con todo lo necesario.
3. Subí el contenido de la carpeta `dist` a tu directorio `public_html` en Hostinger (vía FTP o Administrador de Archivos).
4. El archivo `.htaccess` ya está incluido para manejar las rutas de React y PHP.
5. Asegurate de que la carpeta `api` tenga permisos de escritura para que el PHP pueda crear el archivo JSON.

## Características
- Sorteo inteligente con selección de arqueros.
- Estética de transmisión deportiva (Elite Tournament).
- Guardado de resultados mediante PHP/JSON.
- Diseño responsive y oscuro premium.

---
Desarrollado para www.futsorteo.com
