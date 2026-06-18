import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VisitTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // No rastrear si estamos en rutas de administración
        if (location.pathname.startsWith('/admin')) {
            return;
        }

        const trackVisit = async () => {
            try {
                await fetch('/api/track_visit.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ page: location.pathname })
                });
            } catch (error) {
                // Silently fail
            }
        };

        trackVisit();
    }, [location]);

    return null;
};

export default VisitTracker;
