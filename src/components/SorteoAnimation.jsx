import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Shield } from 'lucide-react';

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
                setTimeout(onComplete, 500); // Pausa final corta
            }
        };

        run();
        return () => clearTimeout(timer);
    }, [rotationList, onComplete]);

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-fut-dark/95 backdrop-blur-2xl p-6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fut-primary/10 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="relative w-full max-w-md text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-16 flex justify-center"
                >
                    <motion.div
                        className="relative"
                        animate={{
                            rotate: 360,
                            y: [0, -10, 0]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <img src="/pelota-futsorteo.svg" alt="Sorteo" className="w-28 h-28 md:w-36 md:h-36 relative z-10" />
                    </motion.div>
                </motion.div>

                <h2 className="text-3xl font-[1000] italic uppercase tracking-tighter text-white mb-8">
                    Sorteando <span className="text-fut-primary">Equipos</span>
                </h2>

                <div className="relative h-24 overflow-hidden mask-fade-y">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.08, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center h-full"
                        >
                            <span className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter text-white drop-shadow-2xl">
                                {rotationList[currentIndex]?.name}
                            </span>
                            {rotationList[currentIndex]?.isGk && (
                                <div className="flex items-center gap-2 mt-2 px-3 py-1 bg-fut-primary/20 border border-fut-primary/30 rounded-full text-fut-primary text-[10px] font-black uppercase tracking-widest italic">
                                    <Shield size={10} /> Arquero
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-12">
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-fut-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                        ></motion.div>
                    </div>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 italic">
                        {isFinished ? "¡Formaciones Listas!" : "Mezclando el mazo..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SorteoAnimation;
