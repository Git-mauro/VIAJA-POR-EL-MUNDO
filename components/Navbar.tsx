
import React from 'react';
import { Search, Heart, Users, Sparkles, Briefcase, LogIn } from 'lucide-react';
import { AppSection } from '../types';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: AppSection.LOGIN, icon: LogIn, label: 'Inicio' },
    { id: AppSection.SEARCH, icon: Search, label: 'Descubre' },
    { id: AppSection.FAVORITES, icon: Heart, label: 'Atlas' },
    { id: AppSection.COMMUNITY, icon: Users, label: 'Comunidad' },
    { id: AppSection.AI_ASSISTANT, icon: Sparkles, label: 'Copiloto' },
    { id: AppSection.BUSINESS, icon: Briefcase, label: 'Negocios' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 glass rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/10 flex items-center gap-2 sm:gap-6">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`flex flex-col items-center group relative p-2 transition-all duration-300 ${
            activeSection === item.id ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <item.icon size={22} className={`${activeSection === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="text-[10px] mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
            {item.label}
          </span>
          {activeSection === item.id && (
            <div className="absolute -bottom-1 w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
