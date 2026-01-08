
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Wallet, Briefcase, TrendingUp, PieChart, ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Ene', sales: 4000, com: 2400 },
  { name: 'Feb', sales: 3000, com: 1398 },
  { name: 'Mar', sales: 2000, com: 9800 },
  { name: 'Abr', sales: 2780, com: 3908 },
  { name: 'May', sales: 1890, com: 4800 },
  { name: 'Jun', sales: 2390, com: 3800 },
];

const BusinessHub: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto pt-24 pb-32 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold">Consola de Negocios</h2>
          <p className="text-slate-400 text-sm">Gestiona tu imperio de viajes y comisiones mayoristas.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass px-6 py-3 rounded-2xl border-white/10 flex items-center gap-3">
            <Wallet className="text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Balance</p>
              <p className="text-lg font-bold">€ 12,450.00</p>
            </div>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20">Retirar Fondos</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Ventas Totales', value: '€ 45.2k', growth: '+12.5%', icon: TrendingUp, color: 'text-blue-400' },
          { label: 'Comisiones', value: '€ 8.1k', growth: '+5.2%', icon: Briefcase, color: 'text-emerald-400' },
          { label: 'Suscripciones', value: '245', growth: '+22.1%', icon: PieChart, color: 'text-purple-400' },
          { label: 'Nivel Partner', value: 'Diamond', growth: 'PRO', icon: ShieldCheck, color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border-white/10 hover:border-white/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon size={20} /></div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">{stat.growth}</span>
            </div>
            <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border-white/10 h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl">Rendimiento Mensual</h3>
            <select className="bg-transparent text-sm border-none focus:outline-none cursor-pointer">
              <option className="bg-slate-900">Últimos 6 meses</option>
              <option className="bg-slate-900">Año actual</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={MOCK_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="com" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/10 flex flex-col">
          <h3 className="font-bold text-xl mb-6">Operaciones Globales</h3>
          <div className="space-y-6 flex-1 overflow-y-auto">
            {[
              { id: 'TX-9283', agent: 'L. Smith', amount: '€ 1,200', status: 'Verificado', icon: Globe },
              { id: 'TX-9284', agent: 'M. Chen', amount: '€ 4,500', status: 'Procesando', icon: ShieldCheck },
              { id: 'TX-9285', agent: 'J. Doe', amount: '€ 850', status: 'Verificado', icon: Globe },
              { id: 'TX-9286', agent: 'P. Garcia', amount: '€ 2,100', status: 'Pendiente', icon: ShieldCheck },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl"><tx.icon size={18} className="text-slate-400" /></div>
                  <div>
                    <p className="text-sm font-bold">{tx.agent}</p>
                    <p className="text-[10px] text-slate-500">{tx.id} • Blockchain Secured</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{tx.amount}</p>
                  <p className={`text-[10px] ${tx.status === 'Verificado' ? 'text-emerald-400' : 'text-amber-400'}`}>{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
            Ver Todas <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessHub;
