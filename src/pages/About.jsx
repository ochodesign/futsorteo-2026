import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Shield, Users, Zap, Layout, ArrowLeftRight, MapPin, Camera, Info, PhoneCall } from 'lucide-react';
import { MdPanTool } from 'react-icons/md';

const About = () => {
    const features = [
        { icon: <Zap className="text-fut-primary" />, title: "Rápido y Fácil", desc: "Pegá tu lista de WhatsApp y sorteá en un segundo." },
        { icon: <MdPanTool className="text-fut-primary" size={24} />, title: "Balance de Pro", desc: "Marcá a los arqueros y el sistema los separa automáticamente." },
        { icon: <Users className="text-fut-primary" />, title: "Equipo Ideal", desc: "Diseñá tu formación táctica con los cracks de la Selección." },
        { icon: <MapPin className="text-fut-primary" />, title: "Radar de Potreros", desc: "Encontrá las mejores canchas de tu zona con un mapa interactivo." },
        { icon: <Trophy className="text-fut-primary" />, title: "Mística Arg.", desc: "Jugadores con las camisetas oficiales y nombres editables." },
        { icon: <ArrowLeftRight className="text-fut-primary" />, title: "Intercambio", desc: "Ajustá los equipos tocando a los jugadores en la cancha." },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <Trophy size={64} className="mx-auto text-fut-primary mb-6 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
                <h1 className="text-5xl md:text-7xl font-[1000] italic uppercase tracking-tighter mb-4 text-gradient">
                    Sobre FutSorteo
                </h1>
                <p className="text-gray-400 text-lg md:text-2xl font-medium leading-[1.2] max-w-2xl mx-auto italic uppercase tracking-tight">
                    La herramienta definitiva para el organizador del fulbito. Se acabó el lío de armar equipos a mano.
                </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass rounded-[2rem] p-8 border-white/5 text-center flex flex-col items-center gap-4 hover:border-fut-primary/30 transition-all group"
                    >
                        <div className="p-4 bg-fut-primary/10 rounded-2xl mb-2 group-hover:scale-110 transition-transform">
                            {f.icon}
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-white italic">{f.title}</h3>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">{f.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Mission Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-20 glass rounded-[3rem] p-8 md:p-16 border-white/5"
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-[1000] uppercase italic mb-6 tracking-tighter">Nuestra Misión</h2>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed italic uppercase tracking-tight">
                        Nacimos para que el fútbol empiece antes. Menos tiempo discutiendo equipos, más tiempo jugando. Optimizamos la organización de partidos para que vos solo te preocupes por clavar el gol.
                    </p>
                </div>

                <div className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] border border-white/10">
                    <h3 className="text-fut-primary font-black uppercase italic tracking-[0.3em] text-xs mb-8 flex items-center gap-3">
                        <div className="w-10 h-[2px] bg-fut-primary"></div> ¿Cómo funciona?
                    </h3>
                    <ul className="text-gray-300 space-y-5">
                        <li className="flex items-start gap-4">
                            <span className="text-fut-primary font-black mt-0.5">01</span>
                            <span className="text-sm font-bold uppercase tracking-wide opacity-80 leading-relaxed"><strong>Carga Masiva:</strong> Copiá la lista de convocados de tu grupo de WhatsApp y pegala directamente.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-fut-primary font-black mt-0.5">02</span>
                            <span className="text-sm font-bold uppercase tracking-wide opacity-80 leading-relaxed"><strong>Gestión de Arqueros:</strong> Seleccioná quiénes atajan para que el sorteo sea equilibrado y justo.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-fut-primary font-black mt-0.5">03</span>
                            <span className="text-sm font-bold uppercase tracking-wide opacity-80 leading-relaxed"><strong>Radar de Canchas:</strong> Buscá predios cerca tuyo con nuestro mapa inteligente y sintonizá tu próximo partido.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-fut-primary font-black mt-0.5">04</span>
                            <span className="text-sm font-bold uppercase tracking-wide opacity-80 leading-relaxed"><strong>Equipo Ideal:</strong> Armá tu propia selección con los nombres reales de tus amigos y compartí la formación.</span>
                        </li>
                        <li className="flex items-start gap-4">
                            <span className="text-fut-primary font-black mt-0.5">05</span>
                            <span className="text-sm font-bold uppercase tracking-wide opacity-80 leading-relaxed"><span><strong>Todo para Compartir:</strong> Copiá el resultado con formato de WhatsApp en un clic y pasalo al grupo.</span></span>
                        </li>
                    </ul>
                </div>
            </motion.div>

            {/* CTA for Complex Owners - NEW SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 relative overflow-hidden"
            >
                <div className="glass p-10 md:p-20 rounded-[4rem] border border-fut-primary/30 text-center relative z-10 bg-gradient-to-br from-fut-primary/5 via-transparent to-fut-primary/5">
                    <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-fut-primary/10 rounded-3xl text-fut-primary shadow-2xl">
                        <MapPin size={40} />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-[1000] italic uppercase tracking-tighter text-white leading-[0.9] mb-8">
                        ¿Sos dueño <br />
                        <span className="text-fut-primary text-3xl md:text-5xl tracking-widest block mt-4">de un predio?</span>
                    </h2>
                    <p className="text-white/50 text-xl font-bold max-w-2xl mx-auto italic uppercase tracking-tight mb-12">
                        Queremos sumar tu cancha a nuestra red. Envianos info detallada, fotos reales y ubicación para que todo el mundo sepa dónde se arma el picado.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:contacto@ochodesignweb.com?subject=Sumar mi predio a FutSorteo&body=Hola! Quiero sumar mi predio a FutSorteo. %0D%0A%0D%0ANombre del predio: %0D%0AUbicación: %0D%0ATeléfono de contacto: %0D%0A(Adjunto fotos del complejo)"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-12 py-6 bg-fut-primary text-fut-dark rounded-full font-[1000] uppercase tracking-widest text-sm hover:scale-105 hover:bg-white transition-all shadow-2xl italic group"
                        >
                            <PhoneCall size={20} className="group-hover:rotate-12 transition-transform" /> ¡Sumar mi predio ahora!
                        </a>
                    </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-fut-primary/5 rounded-full blur-[100px] -z-10"></div>
            </motion.div>
        </div>
    );
};

export default About;
