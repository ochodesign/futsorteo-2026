import React from 'react';
import { TrendingUp, Mail } from 'lucide-react';

const TabsNavigation = ({ activeTab, setActiveTab, unreadCount }) => {
    return (
        <div className="flex bg-black/20 p-2 rounded-2xl w-full md:w-fit mx-auto md:mx-0 border border-white/5 backdrop-blur-md">
            <button
                onClick={() => setActiveTab('visitas')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl transition-all font-black text-xs uppercase tracking-[0.15em] italic ${activeTab === 'visitas' ? 'bg-fut-primary text-fut-dark shadow-xl shadow-fut-primary/30' : 'text-white/30 hover:text-white'}`}
            >
                <TrendingUp size={16} /> Visitas
            </button>
            <button
                onClick={() => setActiveTab('mensajes')}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl transition-all font-black text-xs uppercase tracking-[0.15em] italic ${activeTab === 'mensajes' ? 'bg-fut-primary text-fut-dark shadow-xl shadow-fut-primary/30' : 'text-white/30 hover:text-white'}`}
            >
                <Mail size={16} /> Mensajes
                {unreadCount > 0 && <span className={`ml-2 w-2 h-2 rounded-full ${activeTab === 'mensajes' ? 'bg-fut-dark' : 'bg-red-500 animate-pulse'}`}></span>}
            </button>
        </div>
    );
};

export default TabsNavigation;
