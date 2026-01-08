
import React, { useState } from 'react';
import { AppSection } from './types';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Login from './sections/Login';
import Search from './sections/Search';
import FavoritesMap from './sections/Map';
import Community from './sections/Community';
import AIAssistant from './sections/AIAssistant';
import BusinessHub from './sections/BusinessHub';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveSection(AppSection.SEARCH);
  };

  const renderSection = () => {
    if (!isLoggedIn && activeSection !== AppSection.LOGIN) {
      setActiveSection(AppSection.LOGIN);
    }

    switch (activeSection) {
      case AppSection.LOGIN:
        return <Login onLogin={handleLogin} />;
      case AppSection.SEARCH:
        return <Search />;
      case AppSection.FAVORITES:
        return <FavoritesMap />;
      case AppSection.COMMUNITY:
        return <Community />;
      case AppSection.AI_ASSISTANT:
        return <AIAssistant />;
      case AppSection.BUSINESS:
        return <BusinessHub />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Persistent Header */}
      {activeSection !== AppSection.LOGIN && (
        <header className="fixed top-0 left-0 right-0 z-50 px-8 py-4 glass border-b border-white/5 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] text-slate-400">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
               IA Activa: 12.4ms Latencia
             </div>
             <img 
               src="https://i.pravatar.cc/150?u=currentuser" 
               className="w-10 h-10 rounded-full border-2 border-emerald-500/30 cursor-pointer hover:border-emerald-500 transition-colors" 
               onClick={() => setActiveSection(AppSection.BUSINESS)}
             />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="relative z-0">
        {renderSection()}
      </main>

      {/* Persistent Navigation */}
      {isLoggedIn && (
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      )}
    </div>
  );
};

export default App;
