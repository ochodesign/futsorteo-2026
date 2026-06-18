# Guía de Uso del Repositorio y Despliegue Automático

¡Hola! Esta guía te explica cómo trabajar con este repositorio y cómo funciona el flujo de despliegue automático hacia Hostinger.

## ⚙️ Configuración Inicial en GitHub (¡Muy Importante!)

Para que el despliegue automático funcione, debés configurar las credenciales de FTP como secretos en tu repositorio de GitHub. 

Seguí estos pasos:
1. Andá a tu repositorio en GitHub: [futsorteo-2026](https://github.com/ochodesign/futsorteo-2026).
2. Entrá a **Settings** (Configuración) -> **Secrets and variables** -> **Actions**.
3. Hacé clic en **New repository secret** para crear cada una de las siguientes variables:
   * **`FTP_SERVER`**: El servidor FTP de tu hosting (por ejemplo, `ftp.tudominio.com` o la IP del servidor).
   * **`FTP_USERNAME`**: El usuario de FTP configurado en Hostinger.
   * **`FTP_PASSWORD`**: La contraseña del usuario de FTP.

---

## 💻 Flujo de Trabajo Diario

Siempre que vayas a trabajar en el proyecto, seguí estos pasos desde la terminal en la raíz de tu proyecto:

### 1. Descargar los últimos cambios
Antes de empezar a codear, asegurate de tener la última versión del código para evitar conflictos:
```bash
git pull origin main
```

### 2. Guardar y subir tus cambios
Una vez que hiciste tus modificaciones y querés guardarlas y subirlas:

1. **Agregar los archivos modificados:**
   ```bash
   git add .
   ```
2. **Crear el commit (guardar la versión con un mensaje descriptivo):**
   ```bash
   git commit -m "Explicación breve de lo que cambiaste"
   ```
3. **Subir los cambios a GitHub (rama `main`):**
   ```bash
   git push origin main
   ```

---

## 🚀 ¿Qué pasa al hacer `git push origin main`?

Al hacer el push a la rama `main`, se activa automáticamente **GitHub Actions** configurado en [.github/workflows/deploy.yml](file:///.github/workflows/deploy.yml).

El servidor de GitHub realizará los siguientes pasos de forma automática:
1. Descargará la última versión de tu código.
2. Usará **Node.js 22** para instalar las dependencias con `npm ci`.
3. Compilará la aplicación ejecutando `npm run build` para generar la carpeta de producción `dist/`.
4. Subirá el contenido de `dist/` a tu servidor de Hostinger por FTP de manera ultra rápida usando las credenciales secretas que configuraste.

---

¡Listo! Ya tenés un flujo de trabajo profesional y automatizado configurado para **Futsorteo 2026**.
