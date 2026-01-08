
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic, Leaf, Star, Move3d, X, Maximize, Glasses, Compass, Wand2, ArrowRight, Sparkles } from 'lucide-react';
import { TravelDestination } from '../types';

const MOCK_DESTINATIONS: TravelDestination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Grecia',
    description: 'Arquitectura cicládica y puestas de sol legendarias sobre el mar Egeo.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
    xrPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-houses-of-santorini-in-greece-4235-large.mp4',
    rating: 4.9,
    sustainabilityScore: 85,
    priceLevel: '€€€'
  },
  {
    id: '2',
    name: 'Kioto',
    country: 'Japón',
    description: 'Templos zen, jardines de rocas y la esencia de la tradición imperial japonesa.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    xrPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-japanese-garden-with-a-small-pond-and-bridge-41584-large.mp4',
    rating: 4.8,
    sustainabilityScore: 92,
    priceLevel: '€€'
  },
  {
    id: '3',
    name: 'Machu Picchu',
    country: 'Perú',
    description: 'La majestuosa ciudad perdida de los Incas custodiada por los Andes.',
    imageUrl: 'https://images.unsplash.com/photo-1587590227264-0ac64ce63ce8?auto=format&fit=crop&q=80&w=800',
    xrPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-ruins-of-an-ancient-city-in-the-mountains-41585-large.mp4',
    rating: 5.0,
    sustainabilityScore: 78,
    priceLevel: '€€'
  }
];

const XRPreview: React.FC<{ destination: TravelDestination; onClose: () => void }> = ({ destination, onClose }) => {
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsSyncing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden animate-in fade-in duration-500">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isSyncing ? 'opacity-0' : 'opacity-100'}`}
      >
        <source src={destination.xrPreviewUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-30">
        <div className="flex justify-between items-start pointer-events-auto">
          <div className="glass p-6 rounded-[2rem] border-white/10 max-w-xs shadow-2xl">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
              <Move3d className="text-emerald-400 animate-pulse" /> PORTAL XR
            </h2>
            <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Explorando {destination.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-4 glass rounded-full border-white/10 hover:bg-rose-500/20 hover:border-rose-500/30 transition-all pointer-events-auto active:scale-90"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex justify-center gap-6 pointer-events-auto mb-12">
          <div className="glass px-8 py-5 rounded-3xl border-white/10 flex items-center gap-10 shadow-2xl">
            {[
              { icon: Maximize, label: 'FOV' },
              { icon: Glasses, label: 'VR' },
              { icon: Compass, label: 'Giro' }
            ].map((tool, i) => (
              <button key={i} className="flex flex-col items-center gap-2 group">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all border border-transparent group-hover:border-emerald-500/30">
                  <tool.icon size={20} className={tool.label === 'Giro' ? 'animate-spin-slow' : ''} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isSyncing && (
        <div className="absolute inset-0 glass flex flex-col items-center justify-center z-50">
          <div className="relative mb-8">
             <div className="w-24 h-24 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
             {/* Fix: Added missing Sparkles icon component */}
             <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 animate-pulse" size={32} />
          </div>
          <h3 className="text-xl font-bold tracking-[0.3em] text-emerald-400 uppercase">Sincronizando Realidad</h3>
          <p className="text-slate-400 text-sm mt-4 animate-pulse font-medium">Renderizando entorno inmersivo Manatury...</p>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  );
};

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeXR, setActiveXR] = useState<TravelDestination | null>(null);

  return (
    <div className="max-w-7xl mx-auto pt-28 pb-40 px-6">
      {activeXR && (
        <XRPreview destination={activeXR} onClose={() => setActiveXR(null)} />
      )}

      <div className="mb-16 text-center animate-in fade-in slide-in-from-top-8 duration-700">
        <h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tighter">
          EL MUNDO <span className="gradient-text">A TU ALCANCE</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
          Planifica expediciones a medida con nuestro Copiloto IA o sumérgete en destinos mediante Realidad Extendida.
        </p>
      </div>

      {/* Futuristic Search Bar */}
      <div className="relative group max-w-4xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500 rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
        <div className="relative glass rounded-[2.2rem] flex items-center p-3 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="pl-6 pr-4"><SearchIcon className="text-emerald-400" size={24} /></div>
          <input 
            type="text"
            placeholder="¿Qué aventura estás imaginando hoy?"
            className="flex-1 bg-transparent py-5 text-xl focus:outline-none placeholder:text-slate-600 text-white font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <button className="p-4 hover:bg-white/5 rounded-2xl transition-all text-slate-400 hover:text-white">
              <Mic size={24} />
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white px-10 py-5 rounded-[1.5rem] font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95">
              Explorar
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-16 justify-center animate-in fade-in duration-1000 delay-300">
        {['Ecosostenible', 'Gran Lujo', 'Aventura Extrema', 'Cultura Viva', 'Retiro Digital'].map(tag => (
          <button key={tag} className="px-8 py-2.5 rounded-full glass border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-slate-400 hover:text-emerald-400 text-sm font-bold transition-all active:scale-95">
            {tag}
          </button>
        ))}
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_DESTINATIONS.map((dest, idx) => (
          <div 
            key={dest.id} 
            className="group relative glass rounded-[2.8rem] overflow-hidden border-white/5 transition-all duration-500 hover:scale-[1.03] hover:border-emerald-500/40 hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)] animate-in fade-in slide-in-from-bottom-12"
            /* Fix: Corrected animation delay from seconds to milliseconds */
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="h-72 overflow-hidden relative">
              <img 
                src={dest.imageUrl} 
                alt={dest.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
              />
              <div className="absolute top-6 left-6 glass px-4 py-2 rounded-2xl border-white/20 flex items-center gap-2 z-10 backdrop-blur-md">
                <Leaf size={16} className="text-emerald-400" />
                <span className="text-xs font-black tracking-wider">{dest.sustainabilityScore}% ECO</span>
              </div>
              
              {/* XR Action Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-[2px]">
                <button 
                  onClick={() => setActiveXR(dest)}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl active:scale-90"
                >
                  <Move3d size={20} /> INMERSIÓN XR
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-emerald-400 transition-colors duration-300">{dest.name}</h3>
                  <p className="text-slate-500 text-sm font-bold tracking-wide uppercase">{dest.country}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <Star size={14} className="text-amber-500" fill="currentColor" />
                  <span className="text-sm font-black text-amber-500">{dest.rating}</span>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
                {dest.description}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-emerald-400 text-xl font-black">{dest.priceLevel}</span>
                <button className="group/btn relative px-8 py-3 bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 rounded-2xl text-sm font-bold transition-all duration-500 opacity-70 hover:opacity-100 flex items-center gap-2">
                  Ver Detalles 
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
