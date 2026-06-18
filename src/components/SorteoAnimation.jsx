import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SorteoAnimation = ({ onComplete }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay preventer triggered, playing muted/fallback:", error);
            });
        }
    }, []);

    return (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#030712]/99 p-4 overflow-hidden">
            {/* Brillos decorativos de fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fut-primary/10 rounded-full blur-[140px] pointer-events-none" />

            {/* Contenedor principal de la TV */}
            <div className="w-full max-w-2xl flex flex-col items-center gap-6">
                
                {/* La TV Retro / Moderna */}
                <div className="w-full bg-[#1e1e1e] border-[12px] border-[#2d2d2d] rounded-[2.5rem] p-4 md:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] relative overflow-hidden flex flex-col gap-4">
                    {/* Brillo de pantalla encendida (Led indicador) */}
                    <div className="absolute top-4 right-6 flex items-center gap-1.5 z-20">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#dc2626]" />
                        <span className="text-[7px] font-mono tracking-widest text-white/30 uppercase font-black">AV-1</span>
                    </div>

                    {/* La pantalla propiamente dicha */}
                    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative border-2 border-black shadow-inner">
                        {/* Efecto de reflejo de vidrio curvo de tubo (CRT) */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/10 z-10" />
                        
                        {/* Video */}
                        <video
                            ref={videoRef}
                            src="/maradona.mp4"
                            autoPlay
                            playsInline
                            muted
                            onEnded={onComplete}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Panel inferior de la TV (parlantes y botones) */}
                    <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5 text-white/40">
                        {/* Rejilla de Parlante */}
                        <div className="flex gap-1">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <div key={idx} className="w-1.5 h-1.5 bg-black/40 rounded-full" />
                            ))}
                        </div>
                        
                        {/* Marca / Logo ficticio */}
                        <span className="text-[9px] font-black tracking-[0.3em] uppercase italic text-white/20">FUT-TV</span>
                        
                        {/* Botones de Control */}
                        <div className="flex gap-2">
                            <div className="w-4 h-4 bg-black/50 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 active:scale-95 transition-all" />
                            <div className="w-4 h-4 bg-black/50 border border-white/10 rounded-full cursor-pointer hover:bg-white/10 active:scale-95 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Botón de Saltar */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={onComplete}
                    className="px-8 py-3 bg-white/5 hover:bg-fut-primary hover:text-fut-dark border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-white/80 transition-all shadow-xl backdrop-blur-md active:scale-95 italic"
                >
                    Saltar Presentación ⏩
                </motion.button>
            </div>
        </div>
    );
};

export default SorteoAnimation;
