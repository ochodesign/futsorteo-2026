import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Layout, Pencil, Shield, ChevronDown, Move, RotateCcw, ArrowLeft } from 'lucide-react';

const TeamIdeal = () => {
    const [formation, setFormation] = useState(() => {
        return localStorage.getItem('futsorteo_ideal_formation') || '1-2-2';
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const fieldRef = useRef(null);
    const [editingId, setEditingId] = useState(null);

    // Estado inicial de la selección argentina (p1-p4 + gk)
    const initialPlayers = {
        gk: { id: 'gk', name: 'Dibu M', pos: { x: 50, y: 90 } },
        def: [
            { id: 'p1', name: 'Cuti', pos: { x: 25, y: 70 } },
            { id: 'p2', name: 'De Paul', pos: { x: 75, y: 70 } }
        ],
        mid: [],
        fwd: [
            { id: 'p3', name: 'Enzo F', pos: { x: 25, y: 30 } },
            { id: 'p4', name: 'Messi', pos: { x: 75, y: 30 } }
        ]
    };

    const [players, setPlayers] = useState(() => {
        const saved = localStorage.getItem('futsorteo_ideal_players');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return initialPlayers;
            }
        }
        return initialPlayers;
    });

    // Guardar en LocalStorage cada vez que cambien los jugadores o la formación
    useEffect(() => {
        localStorage.setItem('futsorteo_ideal_players', JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem('futsorteo_ideal_formation', formation);
    }, [formation]);

    const formations = {
        '1-2-2': {
            gk: { x: 50, y: 90 },
            players: [
                { id: 'p1', type: 'def', x: 25, y: 70 },
                { id: 'p2', type: 'def', x: 75, y: 70 },
                { id: 'p3', type: 'fwd', x: 25, y: 30 },
                { id: 'p4', type: 'fwd', x: 75, y: 30 }
            ]
        },
        '1-3-1': {
            gk: { x: 50, y: 90 },
            players: [
                { id: 'p1', type: 'def', x: 20, y: 65 },
                { id: 'p2', type: 'def', x: 50, y: 70 },
                { id: 'p3', type: 'def', x: 80, y: 65 },
                { id: 'p4', type: 'fwd', x: 50, y: 25 }
            ]
        },
        '1-1-2-1': {
            gk: { x: 50, y: 90 },
            players: [
                { id: 'p1', type: 'def', x: 50, y: 68 },
                { id: 'p2', type: 'mid', x: 20, y: 50 },
                { id: 'p3', type: 'mid', x: 80, y: 50 },
                { id: 'p4', type: 'fwd', x: 50, y: 25 }
            ]
        },
        '1-2-1-1': {
            gk: { x: 50, y: 90 },
            players: [
                { id: 'p1', type: 'def', x: 30, y: 75 },
                { id: 'p2', type: 'def', x: 70, y: 75 },
                { id: 'p3', type: 'mid', x: 50, y: 50 },
                { id: 'p4', type: 'fwd', x: 50, y: 25 }
            ]
        }
    };

    const handleFormationChange = (form) => {
        setFormation(form);
        setIsDropdownOpen(false);

        const config = formations[form];
        if (!config) return;

        // Obtenemos los nombres actuales para mantenerlos
        const currentNames = {
            gk: players.gk.name,
            p1: findPlayerById('p1')?.name || 'Cuti',
            p2: findPlayerById('p2')?.name || 'De Paul',
            p3: findPlayerById('p3')?.name || 'Enzo F',
            p4: findPlayerById('p4')?.name || 'Messi'
        };

        // Reseteo forzado - Creamos un objeto de estado completamenta nuevo
        setPlayers({
            gk: { id: 'gk', name: currentNames.gk, pos: { ...config.gk } },
            def: config.players.filter(p => p.type === 'def').map(p => ({ id: p.id, name: currentNames[p.id], pos: { x: p.x, y: p.y } })),
            mid: config.players.filter(p => p.type === 'mid').map(p => ({ id: p.id, name: currentNames[p.id], pos: { x: p.x, y: p.y } })),
            fwd: config.players.filter(p => p.type === 'fwd').map(p => ({ id: p.id, name: currentNames[p.id], pos: { x: p.x, y: p.y } }))
        });
    };

    const findPlayerById = (id) => {
        return [...players.def, ...players.mid, ...players.fwd].find(p => p.id === id);
    };

    // FUNCIÓN CRÍTICA: handleDrag mejorado con offset y detección de bordes
    const handleDrag = (id, info, type) => {
        if (formation !== 'personalizado') return;
        if (!fieldRef.current) return;

        const field = fieldRef.current.getBoundingClientRect();

        // Calculamos la posición relativa al contenedor en porcentaje
        const x = Math.max(2, Math.min(98, ((info.point.x - field.left) / field.width) * 100));
        const y = Math.max(2, Math.min(98, ((info.point.y - field.top) / field.height) * 100));

        setPlayers(prev => {
            if (type === 'gk') return { ...prev, gk: { ...prev.gk, pos: { x, y } } };

            const newDef = prev.def.map(p => p.id === id ? { ...p, pos: { x, y } } : p);
            const newMid = prev.mid.map(p => p.id === id ? { ...p, pos: { x, y } } : p);
            const newFwd = prev.fwd.map(p => p.id === id ? { ...p, pos: { x, y } } : p);

            return { ...prev, def: newDef, mid: newMid, fwd: newFwd };
        });
    };

    const updatePlayerName = (type, id, newName) => {
        const limitedName = newName.slice(0, 12);
        if (type === 'gk') {
            setPlayers(prev => ({ ...prev, gk: { ...prev.gk, name: limitedName } }));
            return;
        }
        setPlayers(prev => ({
            ...prev,
            [type]: prev[type].map(p => p.id === id ? { ...p, name: limitedName } : p)
        }));
    };

    const getFormationName = (f) => {
        const names = {
            '1-2-2': 'Cuadrado Clásico',
            '1-3-1': 'Muro Defensivo',
            '1-1-2-1': 'Diamante Ofensivo',
            '1-2-1-1': 'Pirámide Invertida'
        };
        return names[f] || f;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 min-h-screen">
            <header className="mb-6 md:mb-10 text-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-fut-primary/10 rounded-full border border-fut-primary/20 mb-4">
                    <Users size={16} className="text-fut-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-fut-primary">Pizarra Táctica</span>
                </motion.div>
                <h1 className="text-3xl md:text-6xl font-black italic uppercase text-gradient tracking-tighter mb-2 md:mb-4">
                    Tu Equipo <span className="text-fut-primary">Ideal</span>
                </h1>
                <p className="text-white/40 max-w-xl mx-auto text-xs md:text-sm px-4">
                    Diseñá la táctica perfecta para tu equipo. Seleccioná una formación y personalizá a tus guerreros.
                </p>
            </header>

            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 md:gap-8">

                {/* CANCHA DE FÚTBOL */}
                <div className="w-full lg:col-span-3 order-1 space-y-4">
                    {/* Botón formación mobile */}
                    <div className="lg:hidden relative z-50">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full bg-fut-dark border border-white/10 rounded-2xl py-4 px-6 flex items-center justify-between text-fut-primary">
                            <span className="font-black italic uppercase tracking-widest text-xs">{getFormationName(formation)}</span>
                            <ChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 bg-fut-dark border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-60 p-2">
                                    {Object.keys(formations).map(f => (
                                        <button key={f} onClick={() => handleFormationChange(f)} className={`w-full py-3 px-4 rounded-xl text-left text-xs mb-1 ${formation === f ? 'bg-fut-primary text-fut-dark font-black' : 'text-white/60 hover:bg-white/5'}`}>
                                            {f} - {getFormationName(f)}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div
                        ref={fieldRef}
                        className="aspect-[3/4] md:aspect-[16/9] w-full bg-[#1b4332] rounded-[2.5rem] border-4 border-white/20 relative shadow-2xl soccer-field overflow-hidden touch-none"
                        style={{ perspective: '1000px' }}
                    >
                        {/* Líneas de la cancha */}
                        <div className="absolute inset-4 md:inset-8 border-2 border-white/5 pointer-events-none rounded-2xl" />
                        <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-1/2 h-24 md:h-32 border-b-2 border-x-2 border-white/5 pointer-events-none" />
                        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-1/2 h-24 md:h-32 border-t-2 border-x-2 border-white/5 pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 md:w-48 h-32 md:h-48 border-2 border-white/5 rounded-full pointer-events-none" />
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 pointer-events-none" />

                        {/* JUGADORES */}
                        {[...players.def, ...players.mid, ...players.fwd, players.gk].map((p) => {
                            const isGk = p.id === 'gk';
                            const type = p.id === 'gk' ? 'gk' : players.def.some(d => d.id === p.id) ? 'def' : players.mid.some(m => m.id === p.id) ? 'mid' : 'fwd';
                            const isEditing = editingId === p.id;
                            const isMovable = false; // Funcionalidad de arrastre anulada

                            return (
                                <motion.div
                                    key={p.id}
                                    drag={isMovable}
                                    dragMomentum={false}
                                    dragElastic={0}
                                    dragConstraints={fieldRef}
                                    onDrag={(e, info) => handleDrag(p.id, info, type)}
                                    // LA MAGIA: Cuando no es libre, x e y van a 0 para que left/top manden
                                    animate={{
                                        left: `${p.pos.x}%`,
                                        top: `${p.pos.y}%`,
                                        x: 0,
                                        y: 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        damping: 25,
                                        stiffness: 150,
                                        // Movimiento instantáneo si el usuario está arrastrando
                                        duration: isMovable ? 0 : 0.5
                                    }}
                                    style={{
                                        position: 'absolute',
                                        translateX: '-50%',
                                        translateY: '-50%',
                                        zIndex: editingId === p.id ? 100 : 20
                                    }}
                                    className={`flex flex-col items-center gap-1.5 ${isMovable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                                >
                                    {/* Círculo del Jugador */}
                                    <div className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-transform ${isMovable ? 'hover:scale-110' : ''}`}>
                                        <img
                                            src={isGk ? "/arquero-arg.webp" : "/camiseta-arg.webp"}
                                            alt={isGk ? "Arquero" : "Jugador"}
                                            className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                                        />
                                    </div>

                                    {/* Nombre Editable */}
                                    <div className="relative group/name">
                                        {editingId === p.id ? (
                                            <input
                                                autoFocus
                                                maxLength={12}
                                                value={p.name}
                                                onChange={(e) => updatePlayerName(type, p.id, e.target.value)}
                                                onBlur={() => setEditingId(null)}
                                                onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                                                className="bg-fut-primary text-fut-dark px-3 py-1 rounded-lg text-[10px] font-black uppercase text-center w-24 outline-none ring-2 ring-white"
                                            />
                                        ) : (
                                            <button
                                                onClick={() => setEditingId(p.id)}
                                                className="bg-fut-dark/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-white border border-white/10 whitespace-nowrap uppercase tracking-tighter flex items-center gap-2 hover:border-fut-primary transition-colors"
                                            >
                                                {p.name}
                                                <Pencil size={10} className="text-fut-primary opacity-40" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Espacio reservado para futuros indicadores */}
                    </div>
                </div>

                {/* PANEL LATERAL */}
                <div className="w-full lg:col-span-1 space-y-6 order-2">
                    <section className="hidden lg:block glass rounded-3xl p-6 border-white/5">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                            <Layout size={14} className="text-fut-primary" /> Tácticas
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                            {Object.keys(formations).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => handleFormationChange(f)}
                                    className={`py-3 px-4 rounded-2xl transition-all border flex flex-col items-center gap-1 ${formation === f ? 'bg-fut-primary text-fut-dark border-fut-primary shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20'}`}
                                >
                                    <span className="font-black italic uppercase tracking-widest text-xs">{f}</span>
                                    <span className="text-[8px] font-bold opacity-60 uppercase">{getFormationName(f)}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <Link
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}
                        className="w-full py-4 bg-white/5 border border-white/10 text-white/60 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={18} /> Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeamIdeal;
