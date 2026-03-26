import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Building2, User, Mail, Phone, UtensilsCrossed, CheckCircle2 } from 'lucide-react'
import { saveLeadToBaserow } from '../services/baserow'

export default function LeadSurvey({ onComplete }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    segment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Salva no localStorage para o Dashboard interno
    const existingLeads = JSON.parse(localStorage.getItem('rotaquente_leads') || '[]')
    const newLead = { ...formData, id: Date.now(), date: new Date().toLocaleString() }
    localStorage.setItem('rotaquente_leads', JSON.stringify([newLead, ...existingLeads]))

    // Envia para o Baserow (API Real)
    saveLeadToBaserow({
      ...formData,
      phone: formData.whatsapp
    })

    // Formata mensagem para o WhatsApp
    const message = `*NOVO LEAD - ROTA QUENTE*%0A%0A` +
      `*Nome:* ${formData.name}%0A` +
      `*Empresa:* ${formData.company}%0A` +
      `*Segmento:* ${formData.segment}%0A` +
      `*WhatsApp:* ${formData.whatsapp}%0A` +
      `*Email:* ${formData.email}%0A%0A` +
      `_Enviado via Simulador de Atendimento IA_`
    
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 md:px-6 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-lg w-full p-6 md:p-8 rounded-sm relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
        
        <header className="mb-6 md:mb-8 text-center">
          <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase mb-2">Pedido Entregue!</h2>
          <p className="text-secondary-foreground text-[10px] md:text-sm">
            Você viu como nossa IA é rápida? Agora, conte-nos sobre seu negócio para implementarmos isso para você.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Seu Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm focus:border-accent outline-none transition-colors"
                placeholder="Ex: João Silva"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email Business</label>
               <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                 <input 
                   required
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={handleChange}
                   className="w-full bg-neutral-900 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm focus:border-accent outline-none transition-colors"
                   placeholder="seu@email.com"
                 />
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">WhatsApp</label>
               <div className="relative">
                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                 <input 
                   required
                   name="whatsapp"
                   value={formData.whatsapp}
                   onChange={handleChange}
                   className="w-full bg-neutral-900 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm focus:border-accent outline-none transition-colors"
                   placeholder="(11) 99999-9999"
                 />
               </div>
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Nome do seu Restaurante/Bar</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <input 
                required
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm focus:border-accent outline-none transition-colors"
                placeholder="Ex: Pizzaria do Bairro"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Segmento</label>
            <div className="relative">
              <UtensilsCrossed className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <select 
                required
                name="segment"
                value={formData.segment}
                onChange={handleChange}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-sm py-3 pl-10 pr-4 text-sm focus:border-accent outline-none transition-colors appearance-none"
              >
                <option value="">Selecione...</option>
                <option value="Pizzaria">Pizzaria</option>
                <option value="Hamburgueria">Hamburgueria</option>
                <option value="Japonês">Japonês</option>
                <option value="Restaurante">Restaurante</option>
                <option value="Bar/Pub">Bar/Pub</option>
                <option value="Açaí/Sorveteria">Açaí/Sorveteria</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-white font-bold py-3 md:py-4 rounded-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 text-xs md:text-base"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3 h-3 md:w-4 md:h-4" />
                <span>SOLICITAR MEU ACESSO GRÁTIS</span>
              </>
            )}
          </button>

          <p className="text-center text-[9px] text-neutral-600 uppercase tracking-widest font-medium">
            Seus dados serão enviados diretamente para o nosso especialista no WhatsApp.
          </p>
        </form>
      </motion.div>
    </div>
  )
}
