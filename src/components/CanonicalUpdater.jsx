import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CanonicalUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        // Definir la URL base del sitio
        const baseUrl = 'https://futsorteo.com';

        // Construir la URL canónica actual basada en la ruta
        // Eliminamos la barra final si existe para mantener consistencia, excepto en la raíz
        let path = location.pathname;
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0, -1);
        }

        const canonicalUrl = `${baseUrl}${path === '/' ? '' : path}`;

        // Buscar el elemento link rel="canonical" existente
        let link = document.querySelector("link[rel='canonical']");

        // Si existe, actualizarlo. Si no, crearlo.
        if (link) {
            link.setAttribute('href', canonicalUrl);
        } else {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            link.setAttribute('href', canonicalUrl);
            document.head.appendChild(link);
        }

        // También es buena práctica actualizar og:url para redes sociales si es posible
        let ogUrl = document.querySelector("meta[property='og:url']");
        if (ogUrl) {
            ogUrl.setAttribute('content', canonicalUrl);
        }

    }, [location]); // Se ejecuta cada vez que cambia la ruta (location)

    return null; // Este componente no renderiza nada visualmente
};

export default CanonicalUpdater;
