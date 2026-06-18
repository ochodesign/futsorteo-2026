import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Shield, Sparkles, Cpu } from 'lucide-react';

const SorteoAnimation = ({ players, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // Lista para la rotación (más corta para velocidad)
    const rotationList = React.useMemo(() => {
        const base = [...players].sort(() => Math.random() - 0.5);
        return [...base, ...base]; // 20 elementos para mayor rapidez
    }, [players]);

    useEffect(() => {
        let timer;
        let speed = 40; // Inicio más veloz
        let step = 0;
        const totalSteps = rotationList.length - 2;

        const run = () => {
            if (step < totalSteps) {
                setCurrentIndex(step);
                step++;

                // Desaceleración más compacta
                if (step > totalSteps * 0.5) speed += 25;
                if (step > totalSteps * 0.8) speed += 60;

                timer = setTimeout(run, speed);
            } else {
                setIsFinished(true);
                setTimeout(onComplete, 600); // Pausa final corta
            }
        };

        run();
        return () => clearTimeout(timer);
    }, [rotationList, onComplete]);

    // Burbujas decorativas animadas en el fondo
    const particles = Array.from({ length: 15 });

    return (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#050b14]/98 backdrop-blur-3xl p-6 overflow-hidden">
            {/* Efecto de cuadrícula táctica en el fondo */}
            <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ 
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                }} 
            />
            
            {/* Líneas de escaneo HUD */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-fut-primary/3 to-transparent bg-[length:100%_4px] animate-pulse" />

            {/* Partículas flotantes de energía */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-fut-primary/30"
                        initial={{ 
                            x: Math.random() * window.innerWidth, 
                            y: window.innerHeight + 10,
                            scale: Math.random() * 1.5 + 0.5 
                        }}
                        animate={{ 
                            y: -20,
                            x: `calc(inherit + ${Math.sin(i) * 50}px)`,
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{ 
                            duration: Math.random() * 3 + 2, 
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
                
                {/* Gran brillo en el centro */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fut-primary/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fut-secondary/15 rounded-full blur-[90px] pointer-events-none" />
            </div>

            <div className="relative w-full max-w-md text-center z-10 flex flex-col items-center">
                
                {/* Pelota con Anillo de Energía de Carga */}
                <div className="mb-12 relative flex justify-center items-center">
                    <motion.div 
                        className="absolute w-36 h-36 border border-fut-primary/20 rounded-full"
                        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                    <motion.div 
                        className="absolute w-44 h-44 border-2 border-dashed border-fut-primary/10 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    />
                    
                    <motion.div
                        animate={{
                            rotate: 360,
                            y: [0, -8, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10 w-24 h-24 md:w-28 md:h-28"
                    >
                        <img 
                            src="/pelota-futsorteo.svg" 
                            alt="Sorteo" 
                            className="w-full h-full drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]" 
                        />
                    </motion.div>
                </div>

                <div className="space-y-2 mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-fut-primary flex items-center justify-center gap-1.5">
                        <Cpu size={12} className="animate-spin text-fut-primary/80" /> Algoritmo Fisher-Yates
                    </span>
                    <h2 className="text-3xl md:text-4xl font-[1000] italic uppercase tracking-tighter text-white">
                        Sorteando <span className="text-fut-primary">Equipos</span>
                    </h2>
                </div>

                {/* Panel de Visualización Digital del Jugador */}
                <div className="w-full glass border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl shadow-black/80 max-w-[320px] mx-auto bg-fut-dark/80">
                    <div className="absolute top-3 left-3 flex gap-1">
                        <div className="w-1.5 h-1.5 bg-fut-primary rounded-full animate-ping" />
                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    </div>
                    <div className="absolute top-3 right-3 text-[7px] font-mono tracking-widest text-white/30 uppercase">SYSTEM ACTIVE</div>
                    
                    {/* Corner Borders de estilo HUD */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-fut-primary/50" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-fut-primary/50" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-fut-primary/50" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-fut-primary/50" />

                    <div className="relative h-20 flex flex-col items-center justify-center overflow-hidden">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentIndex}
                                initial={{ y: 35, opacity: 0, filter: "blur(4px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -35, opacity: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.08, type: "spring", stiffness: 200, damping: 18 }}
                                className="flex flex-col items-center justify-center h-full"
                            >
                                <span 
                                    className="text-2xl md:text-3xl font-[1000] italic uppercase tracking-tight text-white whitespace-nowrap"
                                    style={{ textShadow: '0 0 15px rgba(56, 189, 248, 0.4)' }}
                                >
                                    {rotationList[currentIndex]?.name}
                                </span>
                                {rotationList[currentIndex]?.isGk && (
                                    <div className="flex items-center gap-1.5 mt-2 px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-[8px] font-black uppercase tracking-wider italic shadow-lg shadow-amber-500/10">
                                        <Shield size={8} /> Guardián
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Progress Bar de Alta Calidad */}
                <div className="mt-12 w-full max-w-[280px]">
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-fut-primary to-fut-secondary shadow-[0_0_10px_#38bdf8]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                        />
                    </div>
                    <p className="mt-4 text-[9px] font-black uppercase tracking-[0.35em] text-white/30 italic">
                        {isFinished ? "¡Equipos listos, a la cancha!" : "Analizando rendimientos..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SorteoAnimation;
