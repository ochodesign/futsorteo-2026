import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ScrollText } from 'lucide-react';

const LegalModal = ({ isOpen, onClose, title, content, type = 'privacy' }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-fut-dark/90 backdrop-blur-xl"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative glass w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-[3rem] md:rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-3xl overflow-hidden flex flex-col"
                >
                    {/* Decorative Background Ball */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                        animate={{ opacity: 0.05, rotate: 10, scale: 1 }}
                        className="absolute -top-20 -right-20 w-80 h-80 pointer-events-none"
                    >
                        <img src="/pelota-futsorteo.svg" alt="" className="w-full h-full object-contain" />
                    </motion.div>

                    {/* Header */}
                    <div className="relative z-10 flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-fut-primary/10 rounded-2xl flex items-center justify-center text-fut-primary">
                            {type === 'privacy' ? <ShieldCheck size={24} /> : <ScrollText size={24} />}
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter text-white leading-none">
                                {title}
                            </h3>
                            <p className="text-fut-primary/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
                                FutSorteo Legal
                            </p>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="relative z-10 flex-1 overflow-y-auto pr-4 custom-scrollbar mb-8">
                        <div className="space-y-6 text-white/60 text-sm font-medium leading-relaxed italic">
                            {content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* Footer / Close Button */}
                    <div className="relative z-10 pt-4 border-t border-white/5">
                        <button
                            onClick={onClose}
                            className="w-full py-5 bg-fut-primary text-fut-dark rounded-2xl font-[1000] text-xs uppercase tracking-widest transition-all shadow-lg shadow-fut-primary/20 hover:scale-[1.02] active:scale-[0.98] italic"
                        >
                            Entendido, ¡A la cancha!
                        </button>
                    </div>

                    {/* Close Icon (Top Right) */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors z-20"
                    >
                        <X size={24} />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LegalModal;
