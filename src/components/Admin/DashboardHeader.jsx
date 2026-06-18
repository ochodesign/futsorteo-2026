import React from 'react';
import { LayoutDashboard, LogOut } from 'lucide-react';

const DashboardHeader = ({ handleLogout }) => {
    return (
        <header className="sticky top-0 z-30 bg-fut-dark/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-fut-primary/10 rounded-xl flex items-center justify-center border border-fut-primary/20">
                    <LayoutDashboard className="text-fut-primary w-5 h-5 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
                </div>
                <div>
                    <h1 className="text-xl font-black italic uppercase tracking-tighter leading-none flex items-center gap-1">
                        Admin <span className="text-fut-primary">Panel</span>
                    </h1>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold mt-0.5">Gestión de FutSorteo</p>
                </div>
            </div>

            <button
                onClick={handleLogout}
                className="p-2.5 bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/10"
            >
                <LogOut size={18} />
            </button>
        </header>
    );
};

export default DashboardHeader;
