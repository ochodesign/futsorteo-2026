import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from '../components/Header';
import PlayerList from '../components/PlayerList';
import Results from '../components/Results';
import GlobalStats from '../components/GlobalStats';
import SeoContent from '../components/SeoContent';
import SorteoAnimation from '../components/SorteoAnimation';

const Home = ({ showAlert, showConfirm }) => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const resultsRef = useRef(null);

    const [bulkInput, setBulkInput] = useState('');
    const [shakeGks, setShakeGks] = useState(false);

    // Sincronizar bulkInput -> players
    useEffect(() => {
        if (!bulkInput.trim()) {
            setPlayers([]);
            return;
        }

        const lines = bulkInput.split('\n');
        const uniqueNames = new Set();
        const processedPlayers = [];

        lines.forEach((line, index) => {
            const cleanName = line.replace(/^\d+[\s.)-]+/, '').trim();
            // Evitar duplicados y líneas vacías
            if (cleanName && !uniqueNames.has(cleanName.toLowerCase())) {
                uniqueNames.add(cleanName.toLowerCase());

                // Si la línea ya tiene (arq), marcarlo como GK
                const isGk = cleanName.toLowerCase().includes('(arq)') || cleanName.toLowerCase().includes(' arquero');
                const displayName = cleanName.replace(/\s*\(arq\)\s*/gi, '').replace(/\s*arquero\s*/gi, '').trim();

                processedPlayers.push({
                    id: `player-${index}-${displayName}`,
                    name: displayName,
                    isGk: isGk
                });
            }
        });

        // Limitar a 10 jugadores para el sorteo
        setPlayers(processedPlayers.slice(0, 10));
    }, [bulkInput]);

    // Persistencia en LocalStorage
    useEffect(() => {
        const savedPlayers = localStorage.getItem('futsorteo_players');
        const savedBulk = localStorage.getItem('futsorteo_bulk');

        if (savedBulk) {
            setBulkInput(savedBulk);
        } else if (savedPlayers) {
            try {
                const parsed = JSON.parse(savedPlayers);
                if (Array.isArray(parsed)) setPlayers(parsed);
            } catch (e) {
                console.error("Error loading players from storage");
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('futsorteo_players', JSON.stringify(players));
        localStorage.setItem('futsorteo_bulk', bulkInput);
    }, [players, bulkInput]);

    // Historial de sorteos persistente
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('futsorteo_historial');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    // Función de barajado Fisher-Yates para asegurar aleatoriedad real y sin sesgos
    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    // Autoscroll a resultados
    useEffect(() => {
        if (teams) {
            const offset = 80;
            const element = resultsRef.current;
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        }
    }, [teams]);

    const removePlayer = (id) => {
        const playerToRemove = players.find(p => p.id === id);
        if (!playerToRemove) return;

        // Eliminar del bulkInput para mantener sincronía
        const lines = bulkInput.split('\n');
        const newLines = lines.filter(line => {
            const cleanName = line.replace(/^\d+[\s.)-]+/, '').trim()
                .replace(/\s*\(arq\)\s*/gi, '')
                .replace(/\s*arquero\s*/gi, '').trim();
            return cleanName.toLowerCase() !== playerToRemove.name.toLowerCase();
        });

        setBulkInput(newLines.join('\n'));
    };

    const clearAll = () => {
        setBulkInput('');
        setPlayers([]);
        setTeams(null);
    };

    const toggleGk = (id) => {
        const player = players.find(p => p.id === id);
        if (!player) return;

        const currentGks = players.filter(p => p.isGk);

        // Si intenta seleccionar un 3er arquero
        if (!player.isGk && currentGks.length >= 2) {
            showAlert("¡Ya hay 2 arqueros!", "El sistema solo permite 2 arqueros para asegurar el equilibrio de los equipos.", "warning");
            setShakeGks(true);
            setTimeout(() => setShakeGks(false), 500);
            return;
        }

        // Actualizar el bulkInput para persistir el estado (arq) en el texto
        const lines = bulkInput.split('\n');
        const newLines = lines.map(line => {
            // Capturamos el prefijo (número, punto, guion, espacio) y el nombre limpio
            const match = line.match(/^(\d+[\s.)-]+)?(.*)$/);
            const prefix = match[1] || '';
            const rawName = match[2] || '';

            const cleanName = rawName.replace(/\s*\(arq\)\s*/gi, '')
                .replace(/\s*arquero\s*/gi, '').trim();

            if (cleanName.toLowerCase() === player.name.toLowerCase()) {
                if (!player.isGk) {
                    return `${prefix}${player.name} (arq)`;
                } else {
                    return `${prefix}${player.name}`;
                }
            }
            return line;
        });

        setBulkInput(newLines.join('\n'));
    };

    const handleSorteo = async () => {
        // Validaciones: exactamente 10 jugadores
        if (players.length !== 10) {
            showAlert("Plantel incompleto", "Se necesitan exactamente 10 jugadores para el sorteo.", "warning");
            return;
        }

        setLoading(true);

        try {
            await fetch('/api/stats.php', { method: 'POST' });
            window.dispatchEvent(new CustomEvent('sorteoRealizado'));
        } catch (error) {
            console.error("Error al actualizar estadísticas:", error);
        }

        setShowAnimation(true);
    };

    const finalizeSorteo = () => {
        const currentGks = players.filter(p => p.isGk);
        const currentField = players.filter(p => !p.isGk);

        // Barajamos usando el algoritmo Fisher-Yates (aleatoriedad pura)
        const shuffledGks = shuffleArray(currentGks);
        const shuffledField = shuffleArray(currentField);

        let team1 = [];
        let team2 = [];

        if (shuffledGks.length === 2) {
            // 1 arquero por equipo
            team1 = [shuffledGks[0], ...shuffledField.slice(0, 4)];
            team2 = [shuffledGks[1], ...shuffledField.slice(4, 8)];
        } else if (shuffledGks.length === 1) {
            // 1 arquero va a un equipo, el resto se mezcla
            team1 = [shuffledGks[0], ...shuffledField.slice(0, 4)];
            team2 = [...shuffledField.slice(4, 9)];
        } else {
            // Sin arqueros marcados: 5 y 5
            const allPlayers = shuffleArray(players);
            team1 = allPlayers.slice(0, 5);
            team2 = allPlayers.slice(5, 10);
        }

        setTeams({ team1, team2 });
        setLoading(false);
        setShowAnimation(false);

        // Registrar en el historial de sorteos recientes
        const newDraw = {
            id: Date.now(),
            date: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs',
            team1: team1.map(p => ({ name: p.name, isGk: p.isGk })),
            team2: team2.map(p => ({ name: p.name, isGk: p.isGk }))
        };
        const updatedHistory = [newDraw, ...history].slice(0, 5); // Guardamos los últimos 5
        setHistory(updatedHistory);
        localStorage.setItem('futsorteo_historial', JSON.stringify(updatedHistory));

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#0ea5e9', '#ffffff']
        });
    };

    const saveResults = async () => {
        if (!teams) return;
        try {
            const response = await fetch('/api/save.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teams, players, date: new Date().toISOString() })
            });
            const res = await response.json();
            if (res.status === 'success') {
                showAlert("¡Golazo!", "El registro del sorteo se guardó correctamente.", "success");
            }
        } catch (error) {
            console.error("Error saving:", error);
            showAlert("Error", "No pudimos guardar el registro. Revisá la conexión.", "error");
        }
    };

    const clearHistory = () => {
        localStorage.removeItem('futsorteo_historial');
        setHistory([]);
        showAlert("Historial limpio", "Se eliminaron todos los sorteos anteriores.", "info");
    };

    const copyPastDraw = (draw) => {
        const team1Names = draw.team1.map(p => `${p.name}${p.isGk ? ' (ARQ)' : ''}`).join('\n');
        const team2Names = draw.team2.map(p => `${p.name}${p.isGk ? ' (ARQ)' : ''}`).join('\n');
        const text = `🏆 *SORTEO ANTERIOR (${draw.date})* 🏆\n\n⚪ *EQUIPO A:*\n${team1Names}\n\n⚫ *EQUIPO B:*\n${team2Names}\n\nGenerado en futsorteo.com`;

        navigator.clipboard.writeText(text);
        showAlert("¡Copiado!", "Sorteo copiado al portapapeles.", "success");
    };

    return (
        <>
            <Header />
            <main className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                <PlayerList
                    players={players}
                    setPlayers={setPlayers}
                    bulkInput={bulkInput}
                    setBulkInput={setBulkInput}
                    onSorteo={handleSorteo}
                    loading={loading}
                    clearAll={clearAll}
                    toggleGk={toggleGk}
                    removePlayer={removePlayer}
                    showAlert={showAlert}
                    shakeGks={shakeGks}
                />

                <div ref={resultsRef}>
                    <Results
                        teams={teams}
                        setTeams={setTeams}
                        onReset={() => setTeams(null)}
                        onSave={saveResults}
                        showAlert={showAlert}
                    />
                </div>
            </main>

            {/* Historial de Sorteos Recientes */}
            {history.length > 0 && (
                <section className="max-w-6xl mx-auto px-4 pb-16">
                    <div className="glass rounded-[2rem] p-6 md:p-8 border border-white/5">
                        <div className="flex items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
                            <div>
                                <h2 className="text-xl font-[1000] italic uppercase tracking-tighter text-white">
                                    Sorteos <span className="text-fut-primary">Recientes 🕒</span>
                                </h2>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Historial local de los últimos picados</p>
                            </div>
                            <button
                                onClick={clearHistory}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Borrar Historial
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {history.map((draw) => (
                                <div key={draw.id} className="bg-fut-dark/60 border border-white/5 rounded-2xl p-5 flex flex-col justify-between hover:border-fut-primary/20 transition-colors group">
                                    <div>
                                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-fut-primary">{draw.date}</span>
                                            <button
                                                onClick={() => copyPastDraw(draw)}
                                                className="text-[10px] font-bold text-white/40 group-hover:text-fut-primary hover:scale-105 transition-all flex items-center gap-1.5 uppercase tracking-widest"
                                            >
                                                Compartir
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h4 className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-2">⚪ Equipo A</h4>
                                                <ul className="space-y-1">
                                                    {draw.team1.map((p, idx) => (
                                                        <li key={idx} className="text-[11px] font-semibold text-white/70 truncate flex items-center gap-1">
                                                            {p.isGk && <span className="text-[9px] bg-yellow-400/20 text-yellow-400 px-1 rounded font-black shrink-0">ARQ</span>}
                                                            {p.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-2">⚫ Equipo B</h4>
                                                <ul className="space-y-1">
                                                    {draw.team2.map((p, idx) => (
                                                        <li key={idx} className="text-[11px] font-semibold text-white/70 truncate flex items-center gap-1">
                                                            {p.isGk && <span className="text-[9px] bg-yellow-400/20 text-yellow-400 px-1 rounded font-black shrink-0">ARQ</span>}
                                                            {p.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <GlobalStats />
            <SeoContent />

            {showAnimation && (
                <SorteoAnimation
                    players={players}
                    onComplete={finalizeSorteo}
                />
            )}
        </>
    );
};

export default Home;
