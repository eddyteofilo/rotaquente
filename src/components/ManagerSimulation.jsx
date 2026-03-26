import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Play, Truck, CheckCircle, Clock, ChefHat, Package, MapPin } from 'lucide-react'

const STEPS = [
  { id: 'received', label: 'Recebido', icon: Bell, color: 'text-blue-400' },
  { id: 'preparing', label: 'Em Produção', icon: ChefHat, color: 'text-amber-400' },
  { id: 'dispatched', label: 'Despachado', icon: Truck, color: 'text-green-400' }
]

export default function ManagerSimulation({ orderItems, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAgitating, setIsAgitating] = useState(true)

  const total = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  useEffect(() => {
    // Initial agitation for "New Order"
    const timer = setTimeout(() => setIsAgitating(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-2 md:p-6 backdrop-blur-xl overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header de Instrução */}
        <div className="p-6 bg-accent/5 border-b border-neutral-800">
          <p className="text-sm text-neutral-300 leading-relaxed font-medium">
            <span className="text-accent font-bold uppercase tracking-widest block mb-1">Painel de Gestão IA</span>
            Veja como o sistema recebe o pedido em tempo real. Cada ação (Receber, Preparar, Despachar) atualiza o cliente instantaneamente, eliminando erros humanos e reduzindo chamadas de suporte.
          </p>
          <p className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            Clique nos botões laranja abaixo para simular o fluxo de produção
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
        {/* Sidebar Status */}
        <div className="w-full md:w-80 bg-black/40 border-b md:border-b-0 md:border-r border-neutral-800 p-8">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
             <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
             </div>
             <div>
                <h2 className="text-lg font-bold uppercase tracking-tighter">Rota <span className="text-accent">Quente</span></h2>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Painel Administrativo</p>
             </div>
          </div>

          <div className="grid grid-cols-3 md:flex md:flex-col gap-4 md:gap-8">
            {STEPS.map((step, idx) => {
              const Icon = step.icon
              const isActive = idx === currentStep
              const isPast = idx < currentStep
              
              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 transition-all duration-500 ${isActive ? 'opacity-100 scale-105' : 'opacity-40'}`}>
                   <div className={`p-2 rounded-sm border ${isActive || isPast ? 'bg-accent border-accent text-white' : 'border-neutral-800 text-neutral-600'}`}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                   </div>
                   <div className="text-center md:text-left">
                      <h3 className="text-[8px] md:text-xs font-bold uppercase tracking-widest mb-1">{step.label}</h3>
                      <p className="hidden md:block text-[9px] text-neutral-500 font-medium">
                        {isActive ? 'Ação pendente do gerente' : isPast ? 'Concluído às 14:45' : 'Aguardando fluxo'}
                      </p>
                   </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 flex flex-col">
           <div className="flex justify-between items-start mb-8">
              <div>
                <motion.div 
                  animate={isAgitating ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-accent/20 text-accent text-[10px] font-bold px-3 py-1 rounded-sm border border-accent/30 uppercase tracking-widest mb-2"
                >
                  <Bell className="w-3 h-3 fill-accent" /> NOVO PEDIDO #8294
                </motion.div>
                <h1 className="text-3xl font-bold tracking-tighter uppercase mb-1">Resumo da Ordem</h1>
                <p className="text-xs text-neutral-500">Mesa 04 • Cliente: João Silva</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Total do Pedido</p>
                 <p className="text-2xl font-bold tracking-tighter">R$ {total.toFixed(2)}</p>
              </div>
           </div>

           <div className="flex-1 space-y-4 mb-8 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-neutral-800/50 p-4 border border-neutral-700/50 rounded-sm">
                   <div className="w-12 h-12 bg-neutral-900 rounded-sm overflow-hidden flex-shrink-0 border border-neutral-700">
                      <img src={item.image} alt="" className="w-full h-full object-cover opacity-70" />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-sm font-bold uppercase tracking-tight">{item.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold">Qtd: {item.quantity}</span>
                        <span className="text-[10px] text-accent font-bold uppercase tracking-widest">Preparo: 12min</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-auto pt-6 border-t border-neutral-800">
              <AnimatePresence mode='wait'>
                {currentStep === 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={handleNext}
                    className="w-full bg-accent text-white py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-accent/80 transition-all shadow-lg"
                  >
                    <Play className="w-4 h-4 fill-white" /> Enviar para Produção
                  </motion.button>
                )}
                {currentStep === 1 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-lg"
                  >
                    <Truck className="w-4 h-4" /> Despachar para Entrega
                  </motion.button>
                )}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-sm"
                  >
                    <div className="flex items-center gap-3 text-green-400 font-bold uppercase tracking-widest text-xs">
                       <CheckCircle className="w-5 h-5" /> Pedido em Rota de Entrega
                    </div>
                    <button 
                      onClick={onComplete}
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 hover:text-white transition-colors"
                    >
                      Voltar ao Rastreamento do Cliente
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </div>
        </div>
      </motion.div>
    </div>
  )
}
