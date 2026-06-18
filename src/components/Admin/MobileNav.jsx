import React from 'react';
import { TrendingUp, Mail } from 'lucide-react';

const MobileNav = ({ activeTab, setActiveTab, unreadCount }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-fut-dark/80 backdrop-blur-2xl border-t border-white/10 px-6 py-3 flex justify-around items-center z-40">
            <button
                onClick={() => setActiveTab('visitas')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'visitas' ? 'text-fut-primary' : 'text-white/40'}`}
            >
                <TrendingUp size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Visitas</span>
            </button>
            <div className="w-px h-8 bg-white/10"></div>
            <button
                onClick={() => setActiveTab('mensajes')}
                className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'mensajes' ? 'text-fut-primary' : 'text-white/40'}`}
            >
                <div className="relative">
                    <Mail size={24} />
                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-fut-dark rounded-full"></span>}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest italic">Mensajes</span>
            </button>
        </nav>
    );
};

export default MobileNav;
