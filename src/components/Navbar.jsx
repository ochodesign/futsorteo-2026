import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, Info, Mail, Users, MapPin } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Sorteo', path: '/', icon: <Trophy size={18} /> },
        { name: 'Arma Tu Equipo', path: '/equipo-ideal', icon: <Users size={18} /> },
        { name: 'Canchas', path: '/canchas', icon: <MapPin size={18} /> },
        { name: 'Sobre FutSorteo', path: '/sobre-nosotros', icon: <Info size={18} /> },
        { name: 'Contacto', path: '/contacto', icon: <Mail size={18} /> },
    ];

    const activeStyles = "text-fut-primary bg-fut-primary/10 border-fut-primary/20";
    const baseStyles = "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold uppercase tracking-tighter transition-all hover:bg-white/5 text-sm";

    return (
        <nav className="sticky top-0 z-[100] px-4 py-4 md:py-6">
            <div className="max-w-6xl mx-auto flex items-center justify-between glass rounded-3xl px-6 py-3 border-white/10 shadow-2xl">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 group">
                    <img src="/_icon-192.png" alt="Logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-black italic uppercase tracking-tighter text-gradient">
                        Fut<span className="text-fut-primary">Sorteo</span>
                    </span>
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative flex items-center gap-3 px-4 py-3 rounded-2xl font-bold uppercase tracking-tighter transition-all hover:text-white text-sm z-10 ${isActive ? "text-fut-primary" : "text-white/60 hover:bg-white/5"}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-fut-primary/10 border border-fut-primary/20 rounded-2xl -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {link.icon}
                                    {link.name}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-fut-primary bg-white/5 rounded-xl border border-white/10"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-24 left-4 right-4 glass rounded-3xl p-4 border border-white/10 shadow-3xl overflow-hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `${baseStyles} ${isActive ? activeStyles : "text-white/60"}`
                                    }
                                >
                                    {link.icon}
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
