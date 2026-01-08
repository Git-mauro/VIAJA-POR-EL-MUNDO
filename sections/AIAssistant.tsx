
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, Mic, Image as ImageIcon, Wand2, ShieldAlert, History, Trash2, Settings, Paperclip } from 'lucide-react';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Bienvenido al futuro de los viajes! Soy tu copiloto MANATURY, potenciado por IA generativa avanzada. ¿Qué destino exploraremos hoy?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Create a fresh GoogleGenAI instance with the API key from environment
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // Prepare the conversation history for the model
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      // Generate a response using the Gemini model with full context and system instruction
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: 'Eres MANATURY, un asistente de viajes futurista del año 2025. Eres elegante, servicial y experto en destinos globales, sostenibilidad y seguridad. Ofrece respuestas detalladas y con un toque de inspiración.'
        }
      });

      const modelMessage: ChatMessage = {
        role: 'model',
        // .text is a direct property on GenerateContentResponse
        text: response.text || 'Mis sensores han detectado una anomalía en el flujo temporal. ¿Podrías reformular tu consulta?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Gemini error:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        text: 'Error de sincronización con la red neural de Manatury. Por favor, reintenta la conexión.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-24 pb-32 h-[calc(100vh-80px)] px-6 flex gap-8">
      {/* Enhanced Sidebar */}
      <div className="hidden lg:flex flex-col gap-6 w-72">
        <div className="glass p-8 rounded-[2.5rem] border-white/10 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm tracking-widest uppercase flex items-center gap-2">
              <History size={16} className="text-emerald-400" /> Exploraciones
            </h3>
            <button className="p-2 hover:bg-rose-500/10 rounded-xl text-slate-500 hover:text-rose-400 transition-all"><Trash2 size={14} /></button>
          </div>
          <div className="space-y-4">
            {['Escapada a Kioto', 'Safari en Tanzania', 'Ruta Gastronómica Bilbao'].map((item, i) => (
              <div key={i} className="group cursor-pointer p-3 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/5 hover:border-emerald-500/30 transition-all active:scale-95">
                <p className="text-xs font-medium text-slate-300 group-hover:text-emerald-400 transition-colors">{item}</p>
                <p className="text-[10px] text-slate-500 mt-1">Hace 2 días</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/10 mt-auto shadow-xl">
          <h3 className="font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
            <Wand2 size={16} className="text-emerald-400" /> Lab de Viajes
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-3 p-5 glass border-white/5 rounded-3xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group active:scale-[0.9] shadow-lg">
              <ImageIcon size={22} className="text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold tracking-wider text-slate-400">VISUALS</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-5 glass border-white/5 rounded-3xl hover:bg-amber-500/10 hover:border-amber-500/30 transition-all group active:scale-[0.9] shadow-lg">
              <ShieldAlert size={22} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold tracking-wider text-slate-400">SAFETY</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Premium Chat UI */}
      <div className="flex-1 flex flex-col glass rounded-[3rem] border-white/10 overflow-hidden relative shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
        {/* Header with Glass Layer */}
        <div className="absolute top-0 left-0 right-0 p-8 glass border-b border-white/10 z-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 bg-emerald-500/10 rounded-2xl ring-1 ring-emerald-500/20"><Sparkles className="text-emerald-400" size={24} /></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900 animate-pulse" />
            </div>
            <div>
              <h2 className="font-bold text-xl leading-none text-white">Copiloto Manatury</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[9px] text-emerald-400 font-bold tracking-[0.2em] uppercase">Neural Network Online</span>
                <span className="w-1 h-1 bg-slate-600 rounded-full" />
                <span className="text-[9px] text-slate-500 font-bold tracking-[0.2em] uppercase">AES-256 Encrypted</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-4 glass border-white/10 rounded-2xl hover:bg-white/10 transition-all active:scale-90 group">
              <Settings size={20} className="text-slate-400 group-hover:rotate-90 transition-transform" />
            </button>
            <button className="p-4 glass border-emerald-500/20 rounded-2xl hover:bg-emerald-500/10 transition-all active:scale-90 shadow-lg shadow-emerald-500/5">
              <Mic size={20} className="text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Chat Canvas */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 pt-32 space-y-8 scroll-smooth scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-[80%] p-6 rounded-[2rem] text-[15px] leading-relaxed shadow-xl border ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-blue-600 to-emerald-600 text-white rounded-tr-none border-white/10' 
                  : 'glass border-white/10 text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-4 opacity-50 flex items-center gap-1.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {msg.role === 'model' && <ShieldAlert size={10} className="text-emerald-400" />}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="glass border-white/10 p-6 rounded-[2rem] rounded-tl-none flex gap-2">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div key={i} className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="p-8 glass border-t border-white/10 bg-black/40">
          <div className="relative flex items-center gap-4">
             <button className="p-5 glass border-white/10 rounded-[1.5rem] hover:bg-white/10 transition-all text-slate-400 active:scale-[0.85] shadow-lg">
               <Paperclip size={22} />
             </button>
             <div className="flex-1 relative group">
                <input 
                  type="text"
                  placeholder="Habla con tu copiloto... 'Planear ruta sostenible en Perú'"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[1.8rem] py-5 pl-8 pr-16 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white/[0.06] transition-all text-[15px] placeholder:text-slate-600 group-hover:border-white/20"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2.5 top-2.5 bottom-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:hover:bg-emerald-600 rounded-[1.4rem] text-white transition-all shadow-xl shadow-emerald-500/20 active:scale-90 flex items-center justify-center"
                >
                  <Send size={22} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
