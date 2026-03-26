import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Building, Phone, Mail, Calendar, Trash2, ArrowLeft } from 'lucide-react'

export default function LeadDashboard({ onBack }) {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem('rotaquente_leads') || '[]')
    setLeads(savedLeads)
  }, [])

  const clearLeads = () => {
    if (confirm('Deseja realmente limpar todos os leads capturados?')) {
      localStorage.removeItem('rotaquente_leads')
      setLeads([])
    }
  }

  return (
    <div className="min-h-screen bg-[#0b141a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-2">
               <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
               Lead Control Panel
            </div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase">Dashboard de <span className="text-accent underline decoration-white/20">Leads Rota Quente</span></h1>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={clearLeads}
              className="flex items-center gap-2 px-4 py-2 border border-red-900/50 text-red-500 text-xs font-bold rounded-sm hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              LIMPAR DADOS
            </button>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-sm hover:bg-accent hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              VOLTAR AO SIMULADOR
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {[
             { label: 'Total de Leads', value: leads.length, icon: Users, color: 'text-blue-400' },
             { label: 'Conversão Demo', value: leads.length > 0 ? '84%' : '0%', icon: Building, color: 'text-green-400' },
             { label: 'Atendimentos IA', value: leads.length > 0 ? leads.length * 12 : 0, icon: Phone, color: 'text-accent' },
           ].map((stat, i) => (
             <div key={i} className="glass-card p-6 rounded-sm border-l-4 border-accent">
                <div className="flex justify-between items-center mb-4">
                   <stat.icon className={`w-6 h-6 ${stat.color}`} />
                   <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Live stats</span>
                </div>
                <div className="text-3xl font-bold mb-1 tracking-tighter">{stat.value}</div>
                <div className="text-xs text-neutral-400 uppercase font-medium">{stat.label}</div>
             </div>
           ))}
        </div>

        {/* Lead Table */}
        <div className="glass-card rounded-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Lead / Empresa</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Contato</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Segmento</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Data de Captura</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {leads.length > 0 ? leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-6">
                    <div className="font-bold text-sm uppercase">{lead.name}</div>
                    <div className="text-xs text-accent mt-1 tracking-tight">{lead.company}</div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-xs text-neutral-300">
                       <Mail className="w-3 h-3" /> {lead.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-300 mt-1">
                       <Phone className="w-3 h-3" /> {lead.whatsapp}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-bold text-xs uppercase tracking-widest text-neutral-400">
                    {lead.segment}
                  </td>
                  <td className="px-6 py-6 text-xs text-neutral-500 font-mono">
                    {lead.date}
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[9px] font-bold rounded-sm border border-green-500/20 uppercase tracking-widest">
                      Interessado
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-neutral-600 text-sm italic">
                    Nenhum lead capturado ainda. Simule seu primeiro pedido!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
