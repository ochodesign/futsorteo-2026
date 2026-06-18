import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, message, type = 'info', confirmText = 'Aceptar', onConfirm, showCancel = false }) => {
    if (!isOpen) return null;

    const icons = {
        info: <Info className="text-fut-primary w-10 h-10" />,
        success: <CheckCircle2 className="text-green-500 w-10 h-10" />,
        warning: <AlertCircle className="text-yellow-500 w-10 h-10" />,
        error: <AlertCircle className="text-red-500 w-10 h-10" />,
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-fut-dark/80 backdrop-blur-md"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative glass w-full max-w-sm rounded-[2.5rem] p-8 border border-white/10 shadow-3xl text-center overflow-hidden"
                >
                    {/* Decorative ball element - NEW */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
                        animate={{ opacity: 0.1, rotate: 0, scale: 1 }}
                        className="absolute -top-12 -right-12 w-48 h-48 pointer-events-none"
                    >
                        <img src="/pelota-futsorteo.svg" alt="" className="w-full h-full object-contain" />
                    </motion.div>

                    {/* Decorative light */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-fut-primary/10 rounded-full blur-3xl"></div>

                    <div className="flex flex-col items-center gap-4 relative z-10">
                        {/* Icon Container with subtle ball background */}
                        <div className="relative mb-2">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 opacity-20 scale-150 blur-sm"
                            >
                                <img src="/pelota-futsorteo.svg" alt="" className="w-full h-full" />
                            </motion.div>
                            <div className="relative z-10">
                                {icons[type]}
                            </div>
                        </div>

                        <h3 className="text-2xl font-[1000] uppercase italic tracking-tighter text-white leading-none">
                            {title}
                        </h3>

                        <p className="text-white/50 text-sm font-medium leading-relaxed mb-6 italic">
                            {message}
                        </p>

                        <div className="flex gap-3 w-full">
                            {showCancel && (
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-4 px-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border border-white/5"
                                >
                                    Cancelar
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    if (onConfirm) onConfirm();
                                    onClose();
                                }}
                                className={`flex-1 py-4 px-4 bg-fut-primary text-fut-dark rounded-2xl font-[1000] text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-fut-primary/20 hover:scale-[1.05] active:scale-[0.95] italic`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors z-20"
                    >
                        <X size={20} />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Modal;
