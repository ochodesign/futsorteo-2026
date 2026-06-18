import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff, CheckSquare, Square } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar usuario guardado si existe
    useEffect(() => {
        const savedUser = localStorage.getItem('savedUsername');
        if (savedUser) {
            setUsername(savedUser);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const text = await response.text();
            // Intentar convertir a JSON
            try {
                const data = JSON.parse(text);
                if (data.status === 'success') {
                    localStorage.setItem('adminToken', data.token);
                    if (rememberMe) {
                        localStorage.setItem('savedUsername', username);
                    } else {
                        localStorage.removeItem('savedUsername');
                    }
                    navigate('/admin/dashboard');
                } else {
                    setError(data.message || 'Error al iniciar sesión');
                }
            } catch (jsonErr) {
                console.error("Respuesta no válida del servidor:", text);
                setError('Error del servidor (Ver consola para detalles): ' + text.substring(0, 50));
            }

        } catch (err) {
            console.error("Error de red:", err);
            setError('Error de conexión. Verifica tu internet o la URL de la API.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-fut-dark text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-fut-dark to-black z-0" />
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-fut-primary/10 rounded-full blur-[120px] z-0" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] z-0" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm p-8 glass rounded-3xl shadow-2xl border border-white/10 relative z-10"
            >
                {/* Logo Area */}
                <div className="flex flex-col items-center justify-center mb-8">
                    <img src="/_icon-192.png" alt="FutSorteo Logo" className="w-16 h-16 mb-4 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gradient">
                        Fut<span className="text-fut-primary">Sorteo</span>
                    </h2>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 mt-1 font-bold">Admin Panel</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold p-3 rounded-xl mb-6 text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1">
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-fut-primary transition-colors h-5 w-5" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full py-3.5 pl-12 pr-4 bg-black/20 border border-white/5 rounded-2xl focus:outline-none focus:border-fut-primary/50 text-sm font-medium transition-all placeholder:text-white/20"
                                placeholder="Usuario"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-fut-primary transition-colors h-5 w-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full py-3.5 pl-12 pr-12 bg-black/20 border border-white/5 rounded-2xl focus:outline-none focus:border-fut-primary/50 text-sm font-medium transition-all placeholder:text-white/20"
                                placeholder="Contraseña"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-start">
                        <button
                            type="button"
                            onClick={() => setRememberMe(!rememberMe)}
                            className="flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white transition-colors"
                        >
                            {rememberMe ? (
                                <CheckSquare size={16} className="text-fut-primary" />
                            ) : (
                                <Square size={16} />
                            )}
                            Recordar usuario
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-fut-primary text-fut-dark rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-fut-primary/20 mt-2"
                    >
                        Entrar al Sistema
                    </button>

                    {window.location.hostname === 'localhost' && (
                        <div className="pt-4 border-t border-white/5">
                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.setItem('adminToken', 'test-token-local');
                                    navigate('/admin/dashboard');
                                }}
                                className="w-full py-2.5 bg-white/5 text-white/40 hover:text-fut-primary rounded-xl text-[10px] font-black uppercase tracking-widest border border-dashed border-white/10 hover:border-fut-primary/40 transition-all"
                            >
                                [ Desbloquear Dashboard para Test ]
                            </button>
                        </div>
                    )}
                </form>
            </motion.div>

            <div className="absolute bottom-6 text-center z-10">
                <p className="text-[10px] text-white/20 font-mono">
                    SECURED BY FUTSORTEO ADMIN SYSTEM v2.0
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
