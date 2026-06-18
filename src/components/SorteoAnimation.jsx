import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SorteoAnimation = ({ onComplete }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Asegurar que el video intente reproducirse inmediatamente
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay preventer triggered, playing muted/fallback:", error);
            });
        }
    }, []);

    return (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#030712] overflow-hidden">
            {/* Reproductor de Video de pantalla completa */}
            <video
                ref={videoRef}
                src="/maradona.mp4"
                autoPlay
                playsInline
                muted
                onEnded={onComplete}
                className="w-full h-full object-cover md:object-contain max-w-full max-h-full"
            />

            {/* Botón de Saltar animación (Skip) para mejorar la UX */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={onComplete}
                className="absolute bottom-8 right-8 px-6 py-3 bg-black/75 hover:bg-fut-primary hover:text-fut-dark border border-white/10 rounded-full text-xs font-black uppercase tracking-widest text-white/80 transition-all shadow-2xl backdrop-blur-md z-160 cursor-pointer active:scale-95 italic"
            >
                Saltar ⏩
            </motion.button>
        </div>
    );
};

export default SorteoAnimation;
