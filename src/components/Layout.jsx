import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Modal from './Modal';
import CanonicalUpdater from './CanonicalUpdater';
import VisitTracker from './VisitTracker';
import Footer from './Footer';

const Layout = ({ children, modal, setModal }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    useEffect(() => {
        // Bloquear indexación solo en rutas de admin por las dudas
        const meta = document.querySelector('meta[name="robots"]');
        if (isAdminRoute) {
            if (meta) meta.setAttribute('content', 'noindex, nofollow');
        } else {
            if (meta) meta.setAttribute('content', 'index, follow');
        }
    }, [isAdminRoute]);

    return (
        <div className="min-h-screen bg-fut-dark text-white font-sans selection:bg-fut-primary/30">
            <CanonicalUpdater />
            <VisitTracker />

            {!isAdminRoute && <Navbar />}

            {children}

            {!isAdminRoute && <Footer />}

            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
                showCancel={modal.showCancel}
                onConfirm={modal.onConfirm}
            />
        </div>
    );
};

export default Layout;
