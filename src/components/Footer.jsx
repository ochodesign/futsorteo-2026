import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Trophy,
    Users,
    Info,
    Mail,
    MapPin,
    Instagram,
    Facebook,
    Twitter,
    ExternalLink,
    ShieldCheck
} from 'lucide-react';
import LegalModal from './LegalModal';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [legalModal, setLegalModal] = useState({ isOpen: false, type: '', title: '', content: [] });

    const openLegal = (type) => {
        if (type === 'privacy') {
            setLegalModal({
                isOpen: true,
                type: 'privacy',
                title: 'Privacidad',
                content: [
                    "En FutSorteo, nos tomamos el fulbito y tu privacidad muy en serio. Esta política explica cómo cuidamos tus datos mientras armás el picado.",
                    "1. Datos que Fichamos: Solo recolectamos lo básico para que el sorteo funcione: nombres de jugadores y preferencias de equipo. No le pasamos la pelota a terceros.",
                    "2. Cookies de Campo: Usamos cookies técnicas para recordar quiénes son tus jugadores fijos y que no tengas que cargarlos cada vez que se arma partido.",
                    "3. Seguridad de Selección: Aplicamos medidas técnicas para que tus listas de jugadores estén más seguras que el arco del Dibu en una final.",
                    "4. Tus Derechos: Podés borrar tus datos guardados localmente en cualquier momento simplemente limpiando la memoria de tu navegador.",
                    "Al usar nuestra app, estás aceptando que las reglas del juego son transparentes. ¡Nos vemos en la cancha!"
                ]
            });
        } else {
            setLegalModal({
                isOpen: true,
                type: 'terms',
                title: 'Políticas',
                content: [
                    "Reglamento General de FutSorteo: Si entrás a la cancha, aceptás estas condiciones.",
                    "1. Juego Limpio: FutSorteo es una herramienta de entretenimiento para organizar partidos amateur. Los sorteos son aleatorios y buscan la paridad, pero el resultado final depende de cómo se muevan en el césped.",
                    "2. Uso Responsable: El usuario es responsable de los nombres y datos que ingresa en la plataforma. No nos hacemos responsables por apodos polémicos en el grupo de WhatsApp.",
                    "3. Disponibilidad: Hacemos todo lo posible para que el radar de canchas esté siempre online, pero a veces el servidor puede pedir el cambio por mantenimiento.",
                    "4. Propiedad Intelectual: El nombre FutSorteo, su logo y la pelota oficial son propiedad nuestra. ¡Prohibido el juego brusco con nuestra marca!",
                    "Cualquier duda, podés contactarnos vía mail. ¡Que ruede la caprichosa!"
                ]
            });
        }
    };

    const sections = {
        navigation: [
            { name: 'Sorteador', path: '/', icon: <Trophy size={14} /> },
            { name: 'Equipo Ideal', path: '/equipo-ideal', icon: <Users size={14} /> },
            { name: 'Canchas', path: '/canchas', icon: <MapPin size={14} /> },
        ],
        company: [
            { name: 'Sobre Nosotros', path: '/sobre-nosotros', icon: <Info size={14} /> },
            { name: 'Contacto', path: '/contacto', icon: <Mail size={14} /> },
        ],
        legal: [
            { name: 'Privacidad', action: () => openLegal('privacy') },
            { name: 'Políticas', action: () => openLegal('terms') },
        ],
        social: [
            { name: 'Instagram', url: 'https://instagram.com/ochodesignweb', icon: <Instagram size={20} /> },
        ]
    };

    return (
        <footer className="mt-20 border-t border-white/5 bg-fut-dark relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-fut-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fut-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Branding y Logo */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3 group w-fit">
                            <motion.img
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                src="/_icon-192.png"
                                alt="FutSorteo Logo"
                                className="w-12 h-12 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                            />
                            <span className="text-2xl font-black italic uppercase tracking-tighter text-gradient">
                                Fut<span className="text-fut-primary">Sorteo</span>
                            </span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed font-medium italic">
                            La herramienta definitiva para el fútbol amateur en Argentina.
                            Sorteos justos, tácticas profesionales y todo lo que necesitás para tu próximo partido.
                        </p>
                        <div className="flex items-center gap-4">
                            {sections.social.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-fut-primary hover:border-fut-primary/30 transition-all"
                                >
                                    {item.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Navegación */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-fut-primary mb-6 italic">Herramientas</h4>
                        <ul className="space-y-4">
                            {sections.navigation.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className="text-sm font-bold text-white/40 hover:text-white flex items-center gap-3 transition-colors group italic"
                                    >
                                        <span className="text-fut-primary/30 group-hover:text-fut-primary transition-colors">
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-fut-primary mb-6 italic">Información</h4>
                        <ul className="space-y-4">
                            {sections.company.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className="text-sm font-bold text-white/40 hover:text-white flex items-center gap-3 transition-colors group italic"
                                    >
                                        <span className="text-fut-primary/30 group-hover:text-fut-primary transition-colors">
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA para Complejos */}
                    <div className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-fut-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <h4 className="text-sm font-black uppercase tracking-tighter text-white mb-3 italic leading-tight">
                                ¿Tenés un <span className="text-fut-primary">Complejo?</span>
                            </h4>
                            <p className="text-[11px] text-white/40 mb-5 font-medium leading-relaxed italic">
                                Destacá tu cancha con <strong className="text-white/60">fotos, info detallada y contacto directo</strong> para reservas.
                            </p>
                            <a
                                href="mailto:contacto@ochodesignweb.com?subject=Sumar mi complejo a FutSorteo"
                                className="inline-flex items-center gap-2 py-2.5 px-5 bg-fut-primary/10 text-fut-primary hover:bg-fut-primary hover:text-fut-dark rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic border border-fut-primary/20"
                            >
                                Publicar Cancha <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center lg:items-start gap-2">
                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                            © {currentYear} FutSorteo — Innovación en el Fulbito ⚽
                        </p>
                        <div className="flex items-center gap-6">
                            {sections.legal.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={item.action}
                                    className="text-[10px] text-white/40 hover:text-fut-primary transition-colors font-bold uppercase tracking-widest italic"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-1">
                        <p className="text-[9px] uppercase tracking-[0.3em] font-black italic text-fut-primary/40 leading-none">Directo a la Cancha</p>
                        <a
                            href="https://www.ochodesignweb.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-white/30 hover:text-fut-primary transition-all uppercase tracking-widest font-bold flex items-center gap-1.5"
                        >
                            Sitio desarrollado por <span className="text-white/60 font-black">Ocho Design</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Modal Legal */}
            <LegalModal
                isOpen={legalModal.isOpen}
                onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
                title={legalModal.title}
                content={legalModal.content}
                type={legalModal.type}
            />
        </footer>
    );
};

export default Footer;

