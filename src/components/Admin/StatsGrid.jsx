import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, TrendingUp } from 'lucide-react';

const StatsGrid = ({ stats, messagesCount }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="glass p-5 md:p-8 rounded-[2rem] relative overflow-hidden group border border-white/5"
            >
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-125">
                    <Users size={80} />
                </div>
                <div className="relative z-10">
                    <h4 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-fut-primary shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                        Visitas Totales
                    </h4>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter text-white drop-shadow-lg">
                            {stats.visits}
                        </h3>
                        <div className="p-1 px-2 bg-green-500/10 rounded-full border border-green-500/20">
                            <TrendingUp size={12} className="text-green-400" />
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="glass p-5 md:p-8 rounded-[2rem] relative overflow-hidden group border border-white/5"
            >
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-125">
                    <Mail size={80} />
                </div>
                <div className="relative z-10">
                    <h4 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-fut-primary shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                        Mensajes
                    </h4>
                    <div className="flex items-baseline gap-3">
                        <h3 className="text-4xl md:text-5xl font-[1000] italic uppercase tracking-tighter text-white drop-shadow-lg leading-none">
                            {messagesCount}
                        </h3>
                        {stats.messages > 0 && (
                            <span className="text-[10px] bg-fut-primary text-fut-dark font-black px-2 py-0.5 rounded-md uppercase tracking-tighter animate-bounce">
                                {stats.messages} Nuevos
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="hidden md:block glass p-5 md:p-8 rounded-[2rem] relative overflow-hidden group border border-white/5 shadow-2xl shadow-fut-primary/5"
            >
                <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-125">
                    <TrendingUp size={80} />
                </div>
                <div className="relative z-10">
                    <h4 className="text-[10px] md:text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
                        Estado Sistema
                    </h4>
                    <div className="mt-2">
                        <h3 className="text-3xl font-[1000] italic uppercase tracking-tighter text-gradient leading-none">
                            Online
                        </h3>
                        <p className="text-[10px] text-white/20 font-bold uppercase mt-2 tracking-widest">Base de datos conectada</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default StatsGrid;
