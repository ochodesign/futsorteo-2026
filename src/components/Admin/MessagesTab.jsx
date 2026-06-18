import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Phone, Mail as MailIcon, Trash2 } from 'lucide-react';

const MessagesTab = ({ messages, handleDeleteMessage, handleMarkAsRead }) => {
    const formatWhatsAppLink = (number) => {
        if (!number) return '#';
        // Eliminar todo lo que no sea número
        let cleanNumber = number.replace(/[^0-9]/g, '');

        // Si el número empieza con 0, lo quitamos (común en Argentina)
        if (cleanNumber.startsWith('0')) cleanNumber = cleanNumber.substring(1);

        // Si tiene 10 dígitos y no empieza con 54, asumimos que es Argentina y agregamos 549
        if (cleanNumber.length === 10 && !cleanNumber.startsWith('54')) {
            cleanNumber = '549' + cleanNumber;
        }

        return `https://api.whatsapp.com/send?phone=${cleanNumber}`;
    };

    return (
        <motion.div
            key="mensajes"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
        >
            {messages.length === 0 ? (
                <div className="glass p-12 rounded-3xl text-center flex flex-col items-center gap-4 border border-white/5">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                        <CheckCircle2 size={32} />
                    </div>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Bandeja de entrada vacía</p>
                </div>
            ) : (
                messages.map((msg, index) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`glass p-5 rounded-2xl group hover:border-fut-primary/30 transition-all border border-white/5 ${parseInt(msg.leido) === 1 ? 'opacity-50' : ''}`}
                    >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex gap-4 flex-1">
                                <div className="w-12 h-12 rounded-xl bg-fut-primary/10 flex items-center justify-center shrink-0 border border-fut-primary/20">
                                    <span className="text-fut-primary font-black italic text-xl">{(msg.nombre || msg.name || '?').charAt(0)}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-black italic uppercase tracking-tighter text-lg">{msg.nombre || msg.name || 'Sin nombre'}</h4>
                                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/60 font-medium">{msg.fecha || msg.date}</span>
                                        {parseInt(msg.leido) === 0 && (
                                            <span className="text-[8px] bg-fut-primary text-fut-dark px-1.5 py-0.5 rounded font-black uppercase tracking-tighter animate-pulse">Nuevo</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-fut-primary font-bold uppercase tracking-widest mt-0.5 opacity-80">{msg.email}</p>
                                    <p className="text-sm text-white/50 font-medium mt-2 leading-relaxed">{msg.mensaje || msg.message || 'Sin mensaje'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                                {parseInt(msg.leido) === 0 && (
                                    <button
                                        onClick={() => handleMarkAsRead(msg.id)}
                                        className="flex items-center justify-center gap-2 bg-white/5 hover:bg-fut-primary text-white/40 hover:text-fut-dark p-2.5 rounded-xl transition-all border border-white/10"
                                        title="Marcar como leído"
                                    >
                                        <CheckCircle2 size={18} />
                                    </button>
                                )}
                                <a
                                    href={`mailto:${msg.email}`}
                                    className="flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white p-2.5 rounded-xl transition-all border border-blue-500/20"
                                    title="Enviar Email"
                                >
                                    <MailIcon size={18} />
                                </a>
                                <a
                                    href={formatWhatsAppLink(msg.whatsapp)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white px-4 py-2.5 rounded-xl transition-all border border-green-500/20 text-xs font-bold uppercase tracking-widest"
                                >
                                    <Phone size={14} /> WhatsApp
                                </a>
                                <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </motion.div>
    );
};

export default MessagesTab;
