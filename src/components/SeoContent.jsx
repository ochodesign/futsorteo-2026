import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="glass rounded-3xl border border-white/5 overflow-hidden transition-all hover:border-fut-primary/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 md:p-8 flex items-center justify-between gap-4 text-left"
            >
                <h3 className="text-lg md:text-xl font-black italic uppercase tracking-tighter">{question}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-white/20 shrink-0"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-6 md:px-8 pb-8 pt-0">
                            <div className="h-px w-full bg-white/5 mb-6"></div>
                            <p className="text-white/50 text-sm md:text-base leading-relaxed font-medium">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SeoContent = () => {
    const faqs = [
        {
            question: "¿Cómo funciona el sorteo de equipos al azar?",
            answer: "Nuestro sorteador de equipos de fútbol utiliza un algoritmo de aleatorización pura para garantizar que los equipos sean 100% al azar. Solo tienes que ingresar los nombres de los jugadores, marcar si alguno es arquero y presionar 'Sortear Equipos'. El sistema dividirá los planteles equitativamente en segundos."
        },
        {
            question: "¿Por qué usar nuestro sorteador de fútbol?",
            answer: "A diferencia de otros métodos, nuestro generador de equipos aleatorio permite priorizar a los arqueros para que queden distribuidos uno para cada lado. Es la herramienta definitiva para evitar discusiones antes de empezar el partido y asegurar un sorteo justo y transparente."
        },
        {
            question: "¿Cómo guardar los resultados del sorteo?",
            answer: "Una vez realizado el sorteo de jugadores, verás una opción para guardar o compartir el resultado. Esto es ideal para enviar los equipos al grupo de WhatsApp del equipo y que todos sepan con quién les toca jugar antes de llegar a la cancha."
        },
        {
            question: "¿Qué pasa si un equipo queda mucho mejor que el otro?",
            answer: "¡No hay problema! FutSorteo permite el intercambio manual. Si sientes que los equipos no quedaron equilibrados, puedes ajustar la formación tocando a los jugadores directamente en la cancha para intercambiarlos entre equipos hasta que el picadito sea justo."
        }
    ];

    return (
        <section className="max-w-4xl mx-auto px-4 py-20 border-t border-white/5">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-4">
                    Sorteador de Equipos: <span className="text-fut-primary">Preguntas Frecuentes</span>
                </h2>
                <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base font-medium">
                    Todo lo que necesitas saber sobre nuestro sorteador de fútbol al azar para armar tus partidos.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <FaqItem key={index} {...faq} />
                ))}
            </div>

            {/* CTA para Complejos - NUEVO */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-8 md:p-12 glass rounded-[2.5rem] border border-white/5 relative overflow-hidden group text-center"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-fut-primary/5 blur-[80px] -z-10 group-hover:bg-fut-primary/10 transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 blur-[80px] -z-10 group-hover:bg-blue-600/10 transition-colors"></div>

                <h3 className="text-2xl md:text-3xl font-[1000] italic uppercase tracking-tighter text-white mb-4">
                    ¿Sos dueño de un <span className="text-fut-primary">Complejo Deportivo?</span>
                </h3>
                <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto mb-8 font-medium italic">
                    Estamos armando el mapa de canchas más grande de Argentina. Sumá tu complejo a nuestra sección de Canchas y llegá a miles de jugadores cada semana.
                </p>

                <a
                    href="mailto:contacto@ochodesignweb.com?subject=Sumar mi complejo a FutSorteo"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-fut-primary text-fut-dark rounded-2xl font-black uppercase italic tracking-widest hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-fut-primary/20"
                >
                    Publicar mi Cancha
                </a>
            </motion.div>

            <div className="mt-16 p-8 glass rounded-[2.5rem] border border-fut-primary/20 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-fut-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-3xl mx-auto italic relative z-10 font-medium">
                    "FutSorteo se ha convertido en el <strong>sorteador de equipos de fútbol al azar</strong> más confiable para el público argentino. Nuestra misión es que solo te preocupes por jugar, nosotros nos encargamos de que el sorteo sea rápido, fácil y divertido."
                </p>
            </div>
        </section>
    );
};

export default SeoContent;
