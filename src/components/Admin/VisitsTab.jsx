import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';

const VisitsTab = ({ chartData, chartConfig, chartOptions, refreshing, fetchData }) => {
    return (
        <motion.div
            key="visitas"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
        >
            <div className="glass p-4 md:p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-8">
                    <h4 className="text-lg font-black uppercase italic tracking-tighter">Visitas Últimos 30 Días</h4>
                    <button
                        onClick={fetchData}
                        disabled={refreshing}
                        className="text-white/40 hover:text-fut-primary transition-colors disabled:opacity-50"
                    >
                        <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
                    </button>
                </div>
                <div className="h-[300px] w-full">
                    {chartData.length > 0 ? (
                        <Line data={chartConfig} options={chartOptions} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-white/20 uppercase font-bold tracking-widest text-sm">
                            Sin datos de visitas registrados
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default VisitsTab;
