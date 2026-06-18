import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <header className="py-8 px-4 text-center">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="relative group">
                    <motion.img
                        src="/_icon-192.png"
                        alt="FutSorteo Logo"
                        className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-500"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    />
                </div>

                <div className="space-y-1">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-gradient">
                        Fut<span className="text-fut-primary">Sorteo</span>
                    </h1>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-fut-primary/60 font-medium tracking-widest text-xs uppercase">Armá los equipos para el fulbito</p>
                    </div>
                </div>
            </motion.div>
        </header>
    );
};

export default Header;
