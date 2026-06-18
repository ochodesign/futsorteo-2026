import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Save, Users, Shield, Share2, ArrowLeftRight } from 'lucide-react';
import { MdPanTool } from 'react-icons/md';

const Results = ({ teams, setTeams, onReset, onSave, showAlert }) => {
    const [swapSelection, setSwapSelection] = useState(null); // { team: 'team1'|'team2', index: number }

    const handlePlayerClick = (team, index) => {
        if (!swapSelection) {
            // First selection
            setSwapSelection({ team, index });
        } else {
            // Second selection - Perform swap if different teams or different players
            if (swapSelection.team === team && swapSelection.index === index) {
                // Deselect if clicking the same player
                setSwapSelection(null);
                return;
            }

            const newTeams = { ...teams };
            const player1 = newTeams[swapSelection.team][swapSelection.index];
            const player2 = newTeams[team][index];

            // Swap them
            newTeams[swapSelection.team][swapSelection.index] = player2;
            newTeams[team][index] = player1;

            setTeams(newTeams);
            setSwapSelection(null);
        }
    };
    // Logic for refined positions (Centradas y con Arqueros en el área)
    const getPosition = (index, total, isTeam1) => {
        // index 0 is always the GK in our sorting logic
        if (index === 0) {
            return {
                left: '50%',
                top: isTeam1 ? '8%' : '92%'
            };
        }

        const others = total - 1;
        const playerIndex = index - 1;

        // Tactical layouts (relative to the half-field they are in)
        const getTeamY = (relY) => {
            if (isTeam1) {
                return (relY * 0.35) + 12;
            } else {
                return 88 - (relY * 0.35);
            }
        };

        const layouts = {
            1: [{ x: '50%', y: 60 }],
            2: [{ x: '30%', y: 40 }, { x: '70%', y: 40 }],
            3: [{ x: '30%', y: 35 }, { x: '70%', y: 35 }, { x: '50%', y: 75 }],
            4: [{ x: '30%', y: 30 }, { x: '70%', y: 30 }, { x: '30%', y: 70 }, { x: '70%', y: 70 }],
            5: [{ x: '30%', y: 25 }, { x: '70%', y: 25 }, { x: '50%', y: 55 }, { x: '30%', y: 85 }, { x: '70%', y: 85 }],
        };

        const layout = layouts[others] || [];
        const pos = layout[playerIndex] || { x: `${20 + (playerIndex * 20)}%`, y: 50 };

        return {
            left: pos.x,
            top: `${getTeamY(pos.y)}%`
        };
    };

    const copyResults = () => {
        if (!teams) return;
        const team1Names = teams.team1.map(p => `${p.name}${p.isGk ? ' (ARQ)' : ''}`).join('\n');
        const team2Names = teams.team2.map(p => `${p.name}${p.isGk ? ' (ARQ)' : ''}`).join('\n');
        const text = `🏆 *RESULTADO DEL SORTEO* 🏆\n\n⚪ *EQUIPO A:*\n${team1Names}\n\n⚫ *EQUIPO B:*\n${team2Names}\n\nGenerado en futsorteo.com`;

        navigator.clipboard.writeText(text);
        showAlert('¡Copiado!', 'El sorteo se copió al portapapeles. ¡Ya podés pasarlo al grupo!', 'success');
    };

    return (
        <div className="space-y-6">
            <AnimatePresence mode="wait">
                {!teams ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 opacity-40"
                    >
                        <div className="soccer-field-visual w-full max-w-[450px] mx-auto relative grayscale-[0.2]">
                            {/* Field Lines */}
                            <div className="pitch-line half-way"></div>
                            <div className="pitch-line center-circle-pitch"></div>
                            <div className="pitch-line penalty-area-top"></div>
                            <div className="pitch-line goal-box-top"></div>
                            <div className="pitch-line penalty-area-bottom"></div>
                            <div className="pitch-line goal-box-bottom"></div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Users size={48} className="mb-2 text-white/20" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">A la espera del sorteo</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="soccer-field-visual w-full max-w-[450px] mx-auto shadow-2xl relative">
                            <div className="pitch-line half-way"></div>
                            <div className="pitch-line center-circle-pitch"></div>
                            <div className="pitch-line penalty-area-top"></div>
                            <div className="pitch-line goal-box-top"></div>
                            <div className="pitch-line penalty-area-bottom"></div>
                            <div className="pitch-line goal-box-bottom"></div>

                            {teams.team1.map((p, i) => {
                                const pos = getPosition(i, teams.team1.length, true);
                                const isSelected = swapSelection?.team === 'team1' && swapSelection?.index === i;
                                const isOther = swapSelection && !isSelected;
                                return (
                                    <motion.div
                                        key={`t1-${p.id}`}
                                        initial={{ scale: 0, opacity: 0, x: '-50%', y: -20 }}
                                        animate={{
                                            scale: isSelected ? 1.15 : 1,
                                            opacity: 1,
                                            x: '-50%',
                                            y: '-50%',
                                        }}
                                        transition={{ delay: i * 0.08, type: 'spring', damping: 12 }}
                                        className={`player-tag absolute z-20 cursor-pointer transition-all ${isSelected ? 'z-30' : 'hover:scale-105'}`}
                                        style={{ left: pos.left, top: pos.top }}
                                        onClick={() => handlePlayerClick('team1', i)}
                                    >
                                        <div className={`card-body relative ${p.isGk ? 'card-gk' : 'card-team-1'} ${isSelected ? 'ring-4 ring-fut-primary shadow-[0_0_30px_rgba(56,189,248,0.6)]' : ''} ${isOther ? 'opacity-80' : ''}`}>
                                            {p.isGk && <MdPanTool size={14} className="text-black" />}

                                            <span>{p.name.split(' ')[0]}</span>

                                            {isOther && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-2 -right-2 bg-fut-primary text-fut-dark rounded-full p-1 shadow-lg animate-pulse"
                                                >
                                                    <ArrowLeftRight size={10} strokeWidth={3} />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {teams.team2.map((p, i) => {
                                const pos = getPosition(i, teams.team2.length, false);
                                const isSelected = swapSelection?.team === 'team2' && swapSelection?.index === i;
                                const isOther = swapSelection && !isSelected;
                                return (
                                    <motion.div
                                        key={`t2-${p.id}`}
                                        initial={{ scale: 0, opacity: 0, x: '-50%', y: 20 }}
                                        animate={{
                                            scale: isSelected ? 1.15 : 1,
                                            opacity: 1,
                                            x: '-50%',
                                            y: '-50%'
                                        }}
                                        transition={{ delay: (i + teams.team1.length) * 0.08, type: 'spring', damping: 12 }}
                                        className={`player-tag absolute z-20 cursor-pointer transition-all ${isSelected ? 'z-30' : 'hover:scale-105'}`}
                                        style={{ left: pos.left, top: pos.top }}
                                        onClick={() => handlePlayerClick('team2', i)}
                                    >
                                        <div className={`card-body relative ${p.isGk ? 'card-gk' : 'card-team-2'} ${isSelected ? 'ring-4 ring-fut-primary shadow-[0_0_30px_rgba(56,189,248,0.6)]' : ''} ${isOther ? 'opacity-80' : ''}`}>
                                            {p.isGk && <MdPanTool size={14} className="text-black" />}
                                            <span>{p.name.split(' ')[0]}</span>

                                            {isOther && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-2 -right-2 bg-fut-primary text-fut-dark rounded-full p-1 shadow-lg animate-pulse"
                                                >
                                                    <ArrowLeftRight size={10} strokeWidth={3} />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}


                        </div>

                        <div className="flex items-center justify-center gap-2 text-fut-primary/30 animate-pulse">
                            <ArrowLeftRight size={12} />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Tocá dos jugadores para intercambiarlos</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={copyResults}
                                className="w-full py-4 bg-fut-primary text-fut-dark rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg shadow-fut-primary/20 italic"
                            >
                                <Share2 size={18} /> Compartir Sorteo
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Results;
