import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Phone, Mail, ArrowLeft, RefreshCw, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Messages = ({ showAlert, showConfirm }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const formatWhatsAppLink = (number) => {
        if (!number) return '#';
        let cleanNumber = number.replace(/[^0-9]/g, '');
        if (cleanNumber.startsWith('0')) cleanNumber = cleanNumber.substring(1);
        if (cleanNumber.length === 10 && !cleanNumber.startsWith('54')) {
            cleanNumber = '549' + cleanNumber;
        }
        return `https://api.whatsapp.com/send?phone=${cleanNumber}`;
    };

    const fetchMessages = async () => {
        setRefreshing(true);
        try {
            const res = await fetch('/api/get_messages.php');
            const data = await res.json();
            if (Array.isArray(data)) {
                setMessages(data);
            }
            setLoading(false);
            setRefreshing(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = (id) => {
        showConfirm(
            '¿Eliminar mensaje?',
            '¿Estás seguro de que querés borrar este mensaje? Esta acción es definitiva.',
            async () => {
                try {
                    const res = await fetch('/api/delete_message.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    const data = await res.json();
                    if (data.success) {
                        setMessages(messages.filter(m => m.id !== id));
                        showAlert('Borrado', 'El mensaje fue eliminado.', 'success');
                    }
                } catch (error) {
                    showAlert('Error', 'No se pudo eliminar el mensaje.', 'error');
                }
            }
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-fut-dark">
                <RefreshCw className="text-fut-primary w-10 h-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-fut-dark text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black italic uppercase tracking-tighter">Mensajes</h1>
                            <p className="text-[10px] text-fut-primary font-bold uppercase tracking-widest">Bandeja de Entrada</p>
                        </div>
                    </div>
                    <button
                        onClick={fetchMessages}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                        <RefreshCw size={20} className={refreshing ? 'animate-spin' : ''} />
                    </button>
                </header>

                <div className="grid gap-4">
                    {messages.length === 0 ? (
                        <div className="glass p-20 rounded-3xl text-center space-y-4">
                            <MessageSquare size={48} className="mx-auto text-white/10" />
                            <p className="text-white/40 font-bold uppercase tracking-widest text-sm">No hay mensajes nuevos</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass p-6 rounded-2xl group hover:border-fut-primary/30 transition-all border border-white/5"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 bg-fut-primary/10 rounded-2xl flex items-center justify-center text-fut-primary font-black italic text-2xl border border-fut-primary/20 shrink-0">
                                            {(msg.nombre || msg.name || '?').charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-black italic uppercase tracking-tighter">{msg.nombre || msg.name}</h3>
                                                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/40 font-bold">{msg.fecha || msg.date}</span>
                                            </div>
                                            <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{msg.mensaje || msg.message}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <a
                                            href={formatWhatsAppLink(msg.whatsapp)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all font-bold text-xs uppercase tracking-widest border border-green-500/20"
                                        >
                                            <Phone size={16} /> WhatsApp
                                        </a>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
