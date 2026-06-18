import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
        // Si no hay token, redirigir al login del admin
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;
