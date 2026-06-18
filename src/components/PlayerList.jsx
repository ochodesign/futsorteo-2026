import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Shield, Play, ClipboardCheck, Footprints, X, Shirt, Sparkles } from 'lucide-react';
import { GiSoccerBall } from 'react-icons/gi';
import { MdPanTool } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';

const PlayerList = ({ players, bulkInput, setBulkInput, onSorteo, loading, clearAll, toggleGk, removePlayer, shakeGks }) => {
    const handleClear = () => {
        setBulkInput('');
        clearAll();
    };

    return (
        <section className="glass rounded-[2rem] p-6 md:p-8 border border-white/5 relative overflow-hidden">
            {/* Brillo decorativo */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-fut-primary/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                <h2 className="text-xl font-[1000] flex items-center gap-2.5 uppercase tracking-tighter text-white italic shrink-0">
                    <ClipboardCheck size={22} className="text-fut-primary" /> Convocatoria <span className="text-fut-primary">Picadito</span>
                </h2>
            </div>

            <div className="space-y-4 mb-6 relative z-10">
                <div className="bg-fut-primary/5 border border-fut-primary/20 rounded-2xl p-4 flex items-start gap-3 shadow-inner">
                    <MdPanTool className="text-fut-primary shrink-0 mt-0.5 animate-bounce" size={18} />
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">
                        <strong className="text-fut-primary uppercase font-black tracking-widest text-[9px] block mb-1">Tip de Capitán:</strong>
                        Marcá a los <strong className="text-white">2 arqueros</strong> haciendo clic sobre sus nombres. El algoritmo se encargará de separarlos automáticamente en equipos rivales.
                    </p>
                </div>
                
                <div className="flex flex-col gap-3">
                    <div className="relative group">
                        <TextareaAutosize
                            value={bulkInput}
                            onChange={(e) => setBulkInput(e.target.value)}
                            minRows={6}
                            maxRows={15}
                            placeholder="Pegá la lista del grupo acá...&#10;Ej:&#10;1. Messi&#10;2. Dibu (arq)&#10;3. Cuti Romero"
                            className="input-fut w-full text-xs font-semibold tracking-wider resize-none pr-4 pb-12 transition-all duration-300 focus:border-fut-primary/60 focus:bg-fut-dark/90 text-white leading-relaxed"
                        />

                        <div className="absolute bottom-3 right-3 z-10">
                            <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black tracking-widest transition-all duration-300 backdrop-blur-md ${players.length === 10
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10'
                                : 'bg-white/5 border-white/10 text-white/40'
                                }`}>
                                {players.length}/10
                            </div>
                        </div>
                    </div>

                    {bulkInput.trim() && (
                        <button
                            onClick={handleClear}
                            className="self-start px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 italic"
                        >
                            <Trash2 size={12} strokeWidth={2.5} /> Limpiar Lista completa
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-6 relative z-10">
                <div className="flex items-center justify-between mb-4 w-full">
                    <h3 className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] flex items-center gap-2 italic">
                        <Footprints size={12} className="text-fut-primary" /> Plantel Confirmado ({players.length})
                    </h3>
                    <span className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${players.filter(p => p.isGk).length === 2 ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.15)] animate-pulse' : 'border-white/10 text-white/40 bg-white/2'}`}>
                        <img src="/guantes.webp" alt="Guantes" className="w-3.5 h-3.5 object-contain brightness-110" />
                        {players.filter(p => p.isGk).length}/2
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence initial={false}>
                        {players.map((p, idx) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={p.isGk && shakeGks
                                    ? {
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                        x: [-3, 3, -3, 3, 0]
                                    }
                                    : { opacity: 1, scale: 1, y: 0, x: 0 }
                                }
                                whileHover={{ y: -2, scale: 1.02, transition: { duration: 0.15 } }}
                                whileTap={{ scale: 0.98 }}
                                transition={p.isGk && shakeGks ? { duration: 0.4 } : { duration: 0.2, delay: idx * 0.03 }}
                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                onClick={() => toggleGk(p.id)}
                                className={`flex items-center justify-between rounded-xl border transition-all duration-300 group overflow-hidden cursor-pointer relative ${
                                    p.isGk 
                                        ? 'border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:border-amber-500/70' 
                                        : 'border-white/5 bg-white/3 hover:border-fut-primary/30 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(56,189,248,0.08)]'
                                }`}
                            >
                                <div className="flex-1 flex items-center gap-2.5 p-3 min-w-0">
                                    <div className={`p-1 rounded-lg shrink-0 transition-all duration-300 ${
                                        p.isGk 
                                            ? 'bg-amber-500 text-fut-dark shadow-[0_0_10px_rgba(245,158,11,0.4)] scale-110' 
                                            : 'bg-white/5 group-hover:bg-fut-primary/10 group-hover:scale-115 transition-all'
                                    }`}>
                                        {p.isGk ? (
                                            <img src="/guantes.webp" alt="Arco" className="w-6 h-6 object-contain brightness-110" />
                                        ) : (
                                            <img src="/jugadores.webp" alt="Jugador" className="w-6 h-6 object-contain" />
                                        )}
                                    </div>
                                    <span className={`text-[11px] font-black uppercase tracking-wider truncate ${
                                        p.isGk 
                                            ? 'text-amber-100' 
                                            : 'text-gray-300 group-hover:text-white transition-colors'
                                    }`}>
                                        {p.name}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removePlayer(p.id);
                                    }}
                                    className="hidden md:block p-3 text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 rounded-l-lg"
                                    title="Quitar jugador"
                                >
                                    <X size={14} strokeWidth={3} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-8 relative z-10">
                <motion.button
                    whileHover={!(loading || players.length !== 10) ? { scale: 1.01, filter: 'brightness(1.05)' } : {}}
                    whileTap={!(loading || players.length !== 10) ? { scale: 0.99 } : {}}
                    onClick={onSorteo}
                    disabled={loading || players.length !== 10}
                    className={`
                        relative w-full py-5 rounded-2xl overflow-hidden transition-all duration-300
                        flex items-center justify-center gap-3 group font-black uppercase tracking-widest text-xs italic
                        ${loading || players.length !== 10
                            ? 'bg-white/5 border border-white/10 opacity-40 cursor-not-allowed text-white/20'
                            : 'bg-gradient-to-r from-fut-primary to-fut-secondary border-b-4 border-fut-secondary text-white shadow-[0_10px_30px_rgba(56,189,248,0.25)] hover:shadow-fut-primary/45'
                        }
                    `}
                >
                    {/* Efecto de brillo que pasa por el botón */}
                    {!loading && players.length === 10 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    )}

                    {loading ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <div className="flex items-center gap-3 px-4 relative z-10">
                            <span className="text-xl font-[1000] text-white uppercase italic tracking-[0.15em] drop-shadow-md">
                                ¡A JUGAR!
                            </span>
                        </div>
                    )}

                    {/* Gradiente sutil interno para dar volumen */}
                    {!loading && players.length === 10 && (
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                    )}
                </motion.button>
            </div>
        </section>
    );
};

export default PlayerList;
