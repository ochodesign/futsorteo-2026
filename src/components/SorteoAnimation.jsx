import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cpu } from 'lucide-react';

const SorteoAnimation = ({ players = [], onComplete }) => {
    const videoRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // Lista para la rotación
    const rotationList = React.useMemo(() => {
        if (players.length === 0) return [];
        const base = [...players].sort(() => Math.random() - 0.5);
        return [...base, ...base, ...base];
    }, [players]);

    // Función para calcular la duración total de la animación en segundos
    const getAnimationDuration = () => {
        if (rotationList.length === 0) return 3.5; // fallback
        let speed = 55; // Inicio más lento
        let step = 0;
        const totalSteps = rotationList.length - 2;
        let durationMs = 0;

        while (step < totalSteps) {
            durationMs += speed;
            step++;
            if (step > totalSteps * 0.4) speed += 20;
            if (step > totalSteps * 0.7) speed += 45;
            if (step > totalSteps * 0.9) speed += 90;
        }
        return (durationMs + 1000) / 1000; // Sumamos la pausa final de 1000ms
    };

    // Ajustar velocidad del video dinámicamente cuando se cargan los metadatos
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const videoDuration = videoRef.current.duration; // duración real del video en segs
            const animDuration = getAnimationDuration(); // duración de la animación en segs
            if (videoDuration && animDuration) {
                const targetRate = videoDuration / animDuration;
                // Ajustamos playbackRate limitando entre 0.2x y 5x para que sea fluido
                videoRef.current.playbackRate = Math.max(0.2, Math.min(5, targetRate));
            }
        }
    };

    useEffect(() => {
        if (rotationList.length === 0) return;
        
        let timer;
        let speed = 55; // Inicio más lento
        let step = 0;
        const totalSteps = rotationList.length - 2;

        const run = () => {
            if (step < totalSteps) {
                setCurrentIndex(step);
                step++;

                // Desaceleración
                if (step > totalSteps * 0.4) speed += 20;
                if (step > totalSteps * 0.7) speed += 45;
                if (step > totalSteps * 0.9) speed += 90;

                timer = setTimeout(run, speed);
            } else {
                setIsFinished(true);
                setTimeout(onComplete, 1000); // Pausa final de 1000ms
            }
        };

        run();
        return () => clearTimeout(timer);
    }, [rotationList, onComplete]);

    return (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#03050a]/98 p-4 overflow-hidden">
            {/* Brillos decorativos de fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-fut-primary/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-2xl flex flex-col items-center gap-6 relative z-10">
                {/* Contenedor del Video limpio de Maradona */}
                <div className="w-full aspect-video bg-[#0c0d12] rounded-3xl overflow-hidden relative border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                    <video
                        ref={videoRef}
                        src="/maradona.mp4"
                        autoPlay
                        preload="auto"
                        playsInline
                        muted
                        onLoadedMetadata={handleLoadedMetadata}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Panel Digital de Sorteo con Animación Vertical (Reemplaza la lista estática) */}
                <div className="w-full max-w-xl bg-[#08111e]/90 border border-white/5 p-6 rounded-2xl shadow-2xl backdrop-blur-md text-center">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-fut-primary flex items-center justify-center gap-1.5 bg-fut-primary/15 border border-fut-primary/30 px-3 py-1 rounded-full w-fit mx-auto mb-4 shadow-lg">
                        <Cpu size={10} className="animate-spin text-fut-primary" /> MEZCLANDO EQUIPOS
                    </span>

                    {/* Contenedor con máscara de desvanecimiento vertical (se van tapando) */}
                    <div className="relative h-20 md:h-24 overflow-hidden mask-fade-y my-3">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentIndex}
                                initial={{ y: 40, opacity: 0, scale: 0.85, filter: "blur(3px)" }}
                                animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ y: -40, opacity: 0, scale: 0.85, filter: "blur(3px)" }}
                                transition={{ duration: 0.08, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center h-full"
                            >
                                <span 
                                    className="text-3xl md:text-5xl font-[1000] italic uppercase tracking-tighter text-white whitespace-nowrap"
                                    style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.7))' }}
                                >
                                    {rotationList[currentIndex]?.name}
                                </span>
                                {rotationList[currentIndex]?.isGk && (
                                    <div className="flex items-center gap-1.5 mt-2 px-3 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-[9px] font-black uppercase tracking-wider italic">
                                        <Shield size={9} /> ARQUERO
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                        <motion.div
                            className="h-full bg-gradient-to-r from-fut-primary to-emerald-400"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                {/* Botón de Saltar */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={onComplete}
                    className="px-8 py-3 bg-transparent hover:bg-fut-primary/10 border-2 border-fut-primary rounded-full text-xs font-black uppercase tracking-widest text-fut-primary transition-all active:scale-95 italic"
                >
                    Omitir
                </motion.button>
            </div>
        </div>
    );
};

export default SorteoAnimation;
