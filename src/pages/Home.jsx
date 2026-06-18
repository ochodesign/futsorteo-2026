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

        // Barajamos ambos grupos
        const shuffledGks = [...currentGks].sort(() => Math.random() - 0.5);
        const shuffledField = [...currentField].sort(() => Math.random() - 0.5);

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
            const allPlayers = [...players].sort(() => Math.random() - 0.5);
            team1 = allPlayers.slice(0, 5);
            team2 = allPlayers.slice(5, 10);
        }

        setTeams({ team1, team2 });
        setLoading(false);
        setShowAnimation(false);
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
