import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MapPin,
    PhoneCall,
    Navigation,
    ExternalLink,
    Info,
    ChevronRight,
    Trophy,
    AlertCircle,
    Loader2
} from 'lucide-react';

const Canchas = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [mapQuery, setMapQuery] = useState('canchas de futbol');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(false);
    const [isAutoLocating, setIsAutoLocating] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapQuery(`${latitude},${longitude}`);
                    setIsAutoLocating(false);
                },
                (err) => {
                    console.error("Error de geolocalización:", err);
                    setMapQuery('canchas de futbol');
                    setIsAutoLocating(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            setIsAutoLocating(false);
        }
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();

        if (!searchQuery.trim()) {
            setError(true);
            setTimeout(() => setError(false), 3000);
            return;
        }

        setIsSearching(true);

        setTimeout(() => {
            setMapQuery(`canchas de futbol en ${searchQuery}`);
            setIsSearching(false);
            setError(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-fut-dark text-white pb-20 font-sans relative">
            {/* Animación de Búsqueda con la Pelota Oficial */}
            <AnimatePresence>
                {isSearching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-fut-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-12"
                        >
                            {/* Pelota de Fútbol Oficial (SVG de public) */}
                            <div className="relative w-32 h-64 mx-auto flex flex-col items-center justify-end">
                                <motion.div
                                    animate={{
                                        y: [0, -150, 0],
                                        rotate: [0, 360],
                                        scaleY: [1, 0.95, 1, 1.02, 1]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-24 h-24 relative z-10"
                                >
                                    <img
                                        src="/pelota-futsorteo.svg"
                                        alt="Pelota FutSorteo"
                                        className="w-full h-full drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                                    />
                                </motion.div>

                                {/* Sombra Proyectada */}
                                <motion.div
                                    animate={{
                                        scale: [1.2, 0.4, 1.2],
                                        opacity: [0.7, 0.1, 0.7],
                                        filter: ["blur(6px)", "blur(16px)", "blur(6px)"]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-20 h-4 bg-black/90 rounded-[100%] absolute -bottom-6"
                                ></motion.div>
                            </div>

                            <div className="space-y-5">
                                <motion.h2
                                    className="text-4xl md:text-6xl font-[1000] italic uppercase tracking-tighter"
                                >
                                    Buscando <span className="text-fut-primary">Cancha Cercana...</span>
                                </motion.h2>
                                <div className="flex items-center justify-center gap-3">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="w-3 h-3 bg-fut-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                                    ></motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                        className="w-3 h-3 bg-fut-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                                    ></motion.div>
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                        className="w-3 h-3 bg-fut-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                                    ></motion.div>
                                </div>
                                <motion.p
                                    className="text-white/20 text-[11px] font-black uppercase tracking-[0.6em] italic"
                                >
                                    El picado no se mancha
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Section */}
            <div className="relative pt-24 pb-12 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-fut-primary/10 to-transparent pointer-events-none"></div>

                <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 bg-fut-primary/10 border border-fut-primary/20 text-fut-primary text-[10px] font-black uppercase tracking-[0.4em] rounded-full italic mb-6">
                            Radar de Potreros
                        </span>
                        <h1 className="text-5xl md:text-8xl font-[1000] italic uppercase tracking-tighter leading-[0.85] text-white">
                            ¿Donde se arma el <br />
                            <span className="text-fut-primary">picado hoy?</span>
                        </h1>
                        <p className="mt-6 text-white/50 text-lg md:text-2xl font-medium max-w-2xl leading-tight">
                            Encontrá las mejores sedes para tu equipo. No te quedes afuera de la cancha.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.form
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        onSubmit={handleSearch}
                        className={`glass p-2 md:p-3 rounded-full border shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto md:mx-0 transition-all duration-300 ${error ? 'border-red-500/50 bg-red-500/5 drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10'}`}
                    >
                        <div className="flex-[2] bg-white/5 p-5 rounded-full flex items-center gap-4 border border-white/5 focus-within:border-fut-primary/30 transition-all group">
                            <MapPin className={`${error ? 'text-red-500' : 'text-fut-primary'} group-hover:scale-125 transition-transform`} />
                            <input
                                type="text"
                                placeholder={error ? "¡TENÉS QUE ELEGIR UNA CIUDAD!" : "¿En qué ciudad mandan? (ej: San Martín, Rosario)..."}
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    if (error) setError(false);
                                }}
                                className={`bg-transparent border-none outline-none w-full text-white font-black uppercase tracking-widest text-[11px] placeholder:transition-colors ${error ? 'placeholder:text-red-500' : 'placeholder:text-white/20'}`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-fut-primary text-fut-dark px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 italic shadow-lg shadow-fut-primary/20"
                        >
                            <Trophy size={18} />
                            ¡Salir a la cancha!
                        </button>
                    </motion.form>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-2"
                            >
                                <AlertCircle size={12} /> Completá el campo para seguir la jugada
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Maps View Section */}
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-[3rem] md:rounded-[4rem] border border-white/10 overflow-hidden shadow-2xl relative"
                >
                    <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/2">
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-fut-primary/10 rounded-2xl flex items-center justify-center text-fut-primary shadow-inner">
                                {isAutoLocating ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <Navigation size={24} />
                                )}
                            </div>
                            <div>
                                <h3 className="text-base font-[1000] italic uppercase tracking-tighter">
                                    {isAutoLocating ? "Pidieron el VAR..." : "Radar de Potreros Activo"}
                                </h3>
                                <p className="text-[11px] text-white/30 font-black uppercase tracking-[0.2em]">
                                    {isAutoLocating ? "Sintonizando la señal..." : (mapQuery.includes('en') ? `Fichando el césped en ${searchQuery}` : "Escaneando canchas en tu zona")}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href={`https://www.google.com/maps/search/${encodeURIComponent(mapQuery)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white/5 hover:bg-white text-white hover:text-fut-dark rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border border-white/10 flex items-center gap-2 italic"
                            >
                                <ExternalLink size={14} /> Abrir en Maps
                            </a>
                        </div>
                    </div>

                    <div className="h-[650px] w-full bg-fut-dark/50 relative">
                        {isAutoLocating ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-fut-dark/40 backdrop-blur-sm z-10 transition-opacity duration-1000">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-fut-primary font-black uppercase tracking-[0.3em] text-xs italic"
                                >
                                    Fichando tu zona...
                                </motion.div>
                            </div>
                        ) : null}
                        <iframe
                            key={mapQuery}
                            title="FutSorteo Radar"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.3)' }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                        ></iframe>

                        <div className="absolute inset-0 pointer-events-none border-[12px] border-fut-dark/20 rounded-[4rem]"></div>
                    </div>
                </motion.div>
            </div>

            {/* CTA for Predios */}
            <div className="max-w-6xl mx-auto px-6 mt-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass p-16 rounded-[4rem] border border-fut-primary/20 text-center relative overflow-hidden group shadow-2xl shadow-fut-primary/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-fut-primary/10 via-transparent to-fut-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-7xl font-[1000] italic uppercase tracking-tighter text-white leading-[0.9]">
                            ¿Tenés un <span className="text-fut-primary">predio?</span>
                        </h2>
                        <p className="text-white/40 text-xl font-bold max-w-2xl mx-auto italic uppercase tracking-tight">
                            Sumá tu cancha al radar de FutSorteo y llená todos los turnos.
                        </p>
                        <div className="pt-6">
                            <a
                                href="mailto:contacto@ochodesignweb.com?subject=Quiero sumar mi predio a FutSorteo"
                                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-fut-dark rounded-full font-[1000] uppercase tracking-widest text-sm hover:scale-110 hover:rotate-2 transition-all shadow-2xl italic"
                            >
                                <PhoneCall size={20} /> ¡Quiero sumar mi predio!
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Canchas;
