import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageSquare, Instagram, Twitter, Globe } from 'lucide-react';

const Contact = ({ showAlert }) => {
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/save_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === 'success') {
                showAlert('¡Mensaje enviado!', 'Gracias por escribirnos. Te responderemos a la brevedad.', 'success');
                setFormData({ name: '', email: '', whatsapp: '', message: '' });
            } else {
                showAlert('Error', 'No se pudo enviar el mensaje: ' + data.message, 'error');
            }
        } catch (error) {
            showAlert('Error', 'Ocurrió un error al intentar enviar el mensaje.', 'error');
            console.error('Error:', error);
        }
    };

    const social = [
        { icon: <Instagram size={24} />, name: 'Instagram', link: 'https://www.instagram.com/ochodesignweb' },
        { icon: <Globe size={24} />, name: 'Web', link: 'https://www.ochodesignweb.com' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row gap-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 space-y-8"
            >
                <div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-gradient">
                        Contacto
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        ¿Tenés alguna sugerencia o encontraste un error? Escribinos y ayudanos a mejorar la app del fulbito.
                    </p>
                </div>

                <div className="space-y-4">
                    <a href="mailto:contacto@ochodesignweb.com" className="flex items-center gap-4 text-gray-400 hover:text-fut-primary transition-colors cursor-pointer group">
                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-fut-primary/10 transition-colors">
                            <Mail className="text-fut-primary" />
                        </div>
                        <span className="font-medium">contacto@ochodesignweb.com</span>
                    </a>
                    <a href="https://www.ochodesignweb.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-fut-primary transition-colors cursor-pointer group">
                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-fut-primary/10 transition-colors">
                            <Globe className="text-fut-primary" />
                        </div>
                        <span className="font-medium">www.ochodesignweb.com</span>
                    </a>
                </div>

                <div className="flex gap-4 pt-4">
                    {social.map((s, i) => (
                        <a key={i} href={s.link} className="p-4 bg-white/5 rounded-2xl hover:bg-fut-primary/10 hover:text-fut-primary transition-all border border-white/5">
                            {s.icon}
                        </a>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 glass rounded-3xl p-8 border-white/5"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Nombre</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-fut w-full"
                            placeholder="Diego Armando"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-fut w-full"
                            placeholder="diego@seleccion.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">WhatsApp</label>
                        <input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            className="input-fut w-full"
                            placeholder="+54 11 1234 5678"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-white/40 ml-1">Tu Mensaje</label>
                        <textarea
                            rows="4"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="input-fut w-full resize-none"
                            placeholder="Hola equipo, tengo una idea..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-fut-primary text-fut-dark rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg shadow-fut-primary/20"
                    >
                        <Send size={20} /> Enviar Mensaje
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;
