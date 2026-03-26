import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageSquare, ArrowRight, Star } from 'lucide-react'

export default function ThankYouPage({ onRestart }) {
  const handleWhatsAppNotify = () => {
    const message = `Olá! Acabei de finalizar a demonstração do Rota Quente. Aguardo o contato para liberar meus 7 dias de teste grátis! 🔥🚀`
    const waUrl = `https://wa.me/5511990215277?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-2 rounded-full mb-8">
          <Star className="w-4 h-4 fill-amber-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Acesso Exclusivo Garantido</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 font-syne text-white">
          Tudo <span className="text-amber-500">Pronto!</span>
        </h1>

        <p className="text-secondary-foreground text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          Seus dados foram recebidos com sucesso. Em breve, um de nossos especialistas entrará em contato via WhatsApp para liberar seu link de criação de conta.
        </p>

        <div className="bg-surface border border-border p-8 rounded-2xl mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">7 Dias de Teste Grátis</h3>
            <p className="text-muted text-sm mb-8">
              Você terá acesso total a todas as funcionalidades da IA para transformar o seu delivery.
            </p>

            <button 
              onClick={handleWhatsAppNotify}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-green-500/10"
            >
              <MessageSquare className="w-5 h-5" />
              SOLICITAR ACESSO VIA WHATSAPP
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="text-muted hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <span>Reiniciar Simulação</span>
          <div className="w-1 h-1 bg-muted rounded-full" />
          <span>Voltar ao Início</span>
        </button>
      </motion.div>
    </div>
  )
}
