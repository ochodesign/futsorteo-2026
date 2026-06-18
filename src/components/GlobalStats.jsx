import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

const GlobalStats = () => {
    const [count, setCount] = useState(0);
    const [displayCount, setDisplayCount] = useState(0);

    const fetchCount = async () => {
        try {
            const response = await fetch('/api/stats.php');
            const data = await response.json();
            if (data.total !== undefined) {
                setCount(data.total);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    useEffect(() => {
        fetchCount();
        const handleUpdate = () => fetchCount();
        window.addEventListener('sorteoRealizado', handleUpdate);
        return () => window.removeEventListener('sorteoRealizado', handleUpdate);
    }, []);

    useEffect(() => {
        const controls = animate(displayCount, count, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (value) => setDisplayCount(Math.floor(value))
        });
        return () => controls.stop();
    }, [count]);

    return (
        <section className="max-w-6xl mx-auto px-4 mb-20">
            <div className="flex flex-col items-center justify-center text-center gap-2 group">
                <div className="space-y-1">
                    <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-fut-primary/60 transition-colors duration-500 italic">
                        Equipos sorteados hasta ahora
                    </h2>
                </div>

                <div className="flex relative">
                    {displayCount.toString().padStart(4, '0').split('').map((digit, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-center"
                        >
                            <span
                                className="text-5xl md:text-8xl font-medium text-fut-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] select-none tracking-tighter"
                                style={{ fontFamily: "'Orbitron', sans-serif" }}
                            >
                                {digit}
                            </span>
                        </motion.div>
                    ))}

                    {/* Resplandor sutil detrás */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full bg-fut-primary/5 blur-[120px] -z-10" />
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-fut-primary animate-pulse" />
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white/40 italic">
                        Comunidad FutSorteo activa
                    </span>
                </div>
            </div>
        </section>
    );
};

export default GlobalStats;
