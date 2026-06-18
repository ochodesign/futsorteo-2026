import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Shield, Play, ClipboardCheck, Footprints, X } from 'lucide-react';
import { GiSoccerBall } from 'react-icons/gi';
import { MdPanTool } from 'react-icons/md';
import TextareaAutosize from 'react-textarea-autosize';

const PlayerList = ({ players, bulkInput, setBulkInput, onSorteo, loading, clearAll, toggleGk, removePlayer, shakeGks }) => {
    const handleClear = () => {
        setBulkInput('');
        clearAll();
    };

    return (
        <section className="glass rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 uppercase tracking-wider text-fut-primary italic shrink-0">
                    <ClipboardCheck size={20} /> Convocatoria
                </h2>
            </div>

            <div className="space-y-4 mb-6">
                <div className="bg-fut-primary/5 border border-fut-primary/20 rounded-2xl p-4 flex items-start gap-3">
                    <MdPanTool className="text-fut-primary shrink-0 mt-0.5" size={18} />
                    <p className="text-[11px] text-gray-400 leading-tight italic">
                        <strong className="text-fut-primary uppercase">Tip:</strong> Marcá los <strong>2 arqueros</strong> haciendo clic en sus nombres para que el sistema los separe en equipos distintos.
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="relative group">
                        <TextareaAutosize
                            value={bulkInput}
                            onChange={(e) => setBulkInput(e.target.value)}
                            minRows={6}
                            maxRows={15}
                            placeholder="Pegá la lista del grupo acá...&#10;Ej:&#10;1. Messi&#10;2. Dibu (arq)&#10;Paredes"
                            className="input-fut w-full text-sm resize-none focus:ring-fut-primary/30 overflow-hidden bg-fut-dark/80 border-fut-primary/40 pr-4 pb-12"
                        />

                        <div className="absolute bottom-3 right-3 z-10">
                            <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md shadow-xl ${players.length === 10
                                ? 'bg-fut-primary/20 border-fut-primary text-fut-primary scale-110 shadow-fut-primary/20'
                                : 'bg-white/5 border-white/10 text-white/40'
                                }`}>
                                {players.length}/10
                            </div>
                        </div>
                    </div>

                    {bulkInput.trim() && (
                        <button
                            onClick={handleClear}
                            className="self-start px-4 py-2 bg-red-500/5 hover:bg-red-500/10 text-red-500/50 hover:text-red-500 border border-red-500/10 hover:border-red-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 italic"
                        >
                            <Trash2 size={12} strokeWidth={2.5} /> Limpiar Lista
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-6">
                <h3 className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mb-4 flex items-center justify-between w-full italic">
                    <span className="flex items-center gap-2">
                        <Footprints size={12} /> Plantel Confirmado ({players.length})
                    </span>
                    <span className={`px-2 py-0.5 rounded-full border transition-all ${players.filter(p => p.isGk).length === 2 ? 'border-fut-primary text-fut-primary bg-fut-primary/10' : 'border-white/10 text-white/40'}`}>
                        Arqueros: {players.filter(p => p.isGk).length}/2
                    </span>
                </h3>

                <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence initial={false}>
                        {players.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={p.isGk && shakeGks
                                    ? {
                                        opacity: 1,
                                        scale: 1,
                                        x: [-2, 2, -2, 2, 0],
                                        borderColor: ['#38bdf8', '#ef4444', '#38bdf8']
                                    }
                                    : { opacity: 1, scale: 1, x: 0 }
                                }
                                whileTap={{ scale: 0.98 }}
                                transition={p.isGk && shakeGks ? { duration: 0.4 } : { duration: 0.2 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => toggleGk(p.id)}
                                className={`flex items-center justify-between bg-white/5 rounded-xl border transition-all group overflow-hidden cursor-pointer relative ${p.isGk ? 'border-fut-primary/60 bg-fut-primary/10 shadow-[0_0_15px_rgba(56,189,248,0.1)]' : 'border-white/5 hover:border-fut-primary/20'}`}
                            >
                                <div className="flex-1 flex items-center gap-2 p-2.5 min-w-0">
                                    <div className={`p-1.5 rounded-lg shrink-0 transition-all duration-300 ${p.isGk ? 'bg-fut-primary scale-110' : 'bg-white/5 text-white/20 group-hover:text-white/40'}`}>
                                        {p.isGk ? (
                                            <img src="/guantes%20de%20arquero.webp" alt="Arco" className="w-4 h-4 object-contain" />
                                        ) : (
                                            <GiSoccerBall size={12} />
                                        )}
                                    </div>
                                    <span className={`text-[11px] font-bold truncate ${p.isGk ? 'text-white' : 'text-gray-400'}`}>
                                        {p.name}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removePlayer(p.id);
                                    }}
                                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 md:opacity-0"
                                    title="Quitar jugador"
                                >
                                    <X size={14} strokeWidth={3} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-8">
                <motion.button
                    whileHover={!(loading || players.length !== 10) ? { scale: 1.02, filter: 'brightness(1.1)' } : {}}
                    whileTap={!(loading || players.length !== 10) ? { scale: 0.98 } : {}}
                    onClick={onSorteo}
                    disabled={loading || players.length !== 10}
                    className={`
                        relative w-full py-5 rounded-2xl overflow-hidden transition-all duration-300
                        flex items-center justify-center gap-3 group
                        ${loading || players.length !== 10
                            ? 'bg-white/5 border border-white/10 opacity-50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-fut-primary to-fut-secondary border-b-4 border-fut-secondary shadow-[0_10px_30px_rgba(56,189,248,0.3)] hover:shadow-fut-primary/40'
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
                            <Play
                                size={28}
                                fill="white"
                                className={`transition-transform duration-500 ${players.length === 10 ? 'group-hover:rotate-12 group-hover:scale-110' : ''}`}
                            />
                            <span className="text-xl font-[1000] text-white uppercase italic tracking-[0.1em] drop-shadow-md">
                                ¡A LA CANCHA!
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
