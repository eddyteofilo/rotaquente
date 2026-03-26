import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, Package, Bike, Home, ArrowLeft, Navigation, MapPin, ShieldCheck, Star } from 'lucide-react'

const STAGES = [
  { id: 'received', label: 'Recebido', icon: Clock, description: 'Seu pedido foi recebido e está sendo processado.' },
  { id: 'preparing', label: 'Preparando', icon: Package, description: 'O chef está cuidando de cada detalhe do seu pedido.' },
  { id: 'delivering', label: 'Em Rota', icon: Bike, description: 'Seu pedido saiu para entrega e está a caminho!' },
  { id: 'delivered', label: 'Entregue', icon: Home, description: 'Bom apetite! Seu pedido foi entregue.' }
]

const DeliveryMap = ({ progress }) => {
  return (
    <div className="relative w-full h-[240px] md:h-[320px] bg-black border border-neutral-800 rounded-sm overflow-hidden mb-8 md:mb-12 shadow-2xl group">
       {/* Stylized Grid Background */}
       <div className="absolute inset-0 opacity-[0.05]" style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
       }} />
       
       {/* Animated Route Path */}
       <svg className="absolute inset-0 w-full h-full p-16" viewBox="0 0 400 200">
          <path
            d="M 40 160 L 120 160 L 120 40 L 360 40"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <motion.path
            d="M 40 160 L 120 160 L 120 40 L 360 40"
            fill="transparent"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {/* Point A - Restaurant */}
            <g transform="translate(40, 160)">
              <circle r="6" fill="#111" stroke="white" strokeWidth="2" />
              <circle r="12" fill="var(--accent)" className="opacity-10 animate-pulse" />
              <text y="20" textAnchor="middle" className="fill-neutral-500 text-[8px] font-bold uppercase tracking-widest">Ponto A</text>
              <text y="32" textAnchor="middle" className="fill-white text-[10px] font-bold uppercase tracking-tight">Restaurante</text>
            </g>

            {/* Point B - Customer */}
            <g transform="translate(360, 40)">
              <circle r="8" fill="var(--accent)" className="animate-pulse" />
              <circle r="16" stroke="var(--accent)" strokeWidth="1" fill="transparent" className="opacity-20 animate-ping" />
              <text y="-18" textAnchor="middle" className="fill-accent text-[8px] font-bold uppercase tracking-widest">Ponto B</text>
              <text y="-30" textAnchor="middle" className="fill-white text-[10px] font-bold uppercase tracking-tight">Seu Destino</text>
            </g>
          </motion.g>
          {/* Animated Moto (Courier) */}
          <motion.g
            animate={{ 
              offsetDistance: `${progress}%`,
              opacity: progress > 0 ? 1 : 0
            }}
            transition={{ duration: 0.5, ease: "linear" }}
            style={{ 
              offsetPath: "path('M 40 160 L 120 160 L 120 40 L 360 40')",
              offsetRotate: "0deg"
            }}
          >
            <circle r="16" fill="var(--accent)" className="opacity-20 animate-ping" />
            <foreignObject x="-16" y="-16" width="32" height="32">
                <div className="bg-accent p-1.5 rounded-sm shadow-xl flex items-center justify-center">
                    <Bike className="w-4 h-4 text-white" />
                </div>
            </foreignObject>
          </motion.g>
       </svg>

       <div className="absolute top-6 left-6 flex flex-col gap-1">
          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-neutral-800">
             <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-white">Rastreamento IA Ativo</span>
          </div>
       </div>

       <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <div className="bg-neutral-900/95 backdrop-blur-md px-8 py-3 border border-neutral-800 rounded-sm shadow-2xl flex items-center gap-6">
             <div className="flex flex-col">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-0.5">Tempo de Entrega</span>
                <div className="flex items-baseline gap-1">
                   <span className="text-2xl font-bold tracking-tighter text-white">
                     {Math.max(2, Math.round(15 * (1 - progress / 100)))}
                   </span>
                   <span className="text-[10px] font-bold text-neutral-400">MINUTOS</span>
                </div>
             </div>
             <div className="w-px h-8 bg-neutral-800" />
             <div className="flex flex-col">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-0.5">Status</span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Motorista em Rota</span>
             </div>
          </div>
       </div>
    </div>
  )
}

export default function OrderTracking({ onBack, onComplete }) {
  const [stage, setStage] = useState(2) // 2 = Em Rota
  const [progress, setProgress] = useState(0)
  const [isArrived, setIsArrived] = useState(false)

  useEffect(() => {
    if (stage === 2 && !isArrived) {
      const duration = 15000 // 15 segundos para a simulação de chegada
      const intervalTime = 100
      const increment = (intervalTime / duration) * 100

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsArrived(true)
            setStage(3) // 3 = Entregue
            if (onComplete) {
              setTimeout(onComplete, 5000) // Aguarda o lead ver a tela de sucesso
            }
            return 100
          }
          return Math.min(100, prev + increment)
        })
      }, intervalTime)

      return () => clearInterval(interval)
    }
  }, [stage, isArrived, onComplete])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto py-8 md:py-12 px-4 md:px-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        VOLTAR AO CARDÁPIO
      </button>

      <div className="mb-8 md:mb-12 flex justify-between items-end">
        <div className="w-full">
          <span className="text-[8px] md:text-[10px] text-accent font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 block">Pedido #8294</span>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.9] md:leading-none">
            {isArrived ? 'Pedido' : 'Acompanhe seu'} <br />
            <span className="text-accent italic">{isArrived ? 'Entregue' : 'Pedido'}</span>
          </h1>
        </div>
        <div className="hidden md:block text-right">
           <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Status Atual</p>
           <p className="text-lg font-bold uppercase tracking-tight">{STAGES[stage].label}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isArrived ? (
          <motion.div
            key="map"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <DeliveryMap progress={progress} />
          </motion.div>
        ) : (
          <motion.div
            key="delivered-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-accent p-6 md:p-12 rounded-sm mb-8 md:mb-12 flex flex-col items-center text-center shadow-[0_20px_50px_rgba(249,115,22,0.3)]"
          >
             <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl text-accent">
                <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12" />
             </div>
             <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white mb-4 italic leading-tight">BOM APETITE!</h2>
             <p className="text-white/80 font-bold uppercase tracking-widest text-[8px] md:text-[10px] mb-8 max-w-xs mx-auto px-4">
               Você acabou de ver como o atendimento Rota Quente funciona. Que tal ter isso no seu negócio?
             </p>
             <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={onComplete}
                  className="w-full bg-white text-accent py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-xs hover:bg-neutral-100 transition-all shadow-xl"
                >
                    Implementar no meu Restaurante
                </button>
                <button 
                  onClick={onBack}
                  className="w-full bg-black/20 text-white/70 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[9px] hover:bg-black/40 transition-all"
                >
                    Simular Novo Pedido
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
        {STAGES.map((s, idx) => {
          const Icon = s.icon
          const isActive = idx <= stage
          const isCurrent = idx === stage

          return (
            <div key={s.id} className={`flex flex-col gap-2 md:gap-3 p-3 md:p-4 border rounded-sm transition-all duration-500 ${
              isCurrent ? 'bg-neutral-900 border-accent' :
              isActive ? 'bg-neutral-900 border-neutral-700 opacity-60' :
              'border-neutral-900 opacity-20'
            }`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-sm flex items-center justify-center ${isActive ? 'bg-accent text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                {isActive && idx < stage ? <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" /> : <Icon className="w-3 h-3 md:w-4 md:h-4" />}
              </div>
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest truncate">{s.label}</span>
            </div>
          )
        })}
      </div>

      <div className="glass-card p-10 rounded-sm border-neutral-800 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full translate-x-16 -translate-y-16" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
           <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-neutral-800 rounded-sm border border-neutral-700 flex items-center justify-center">
                   <Bike className="w-10 h-10 text-accent" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-black" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] mb-1">Seu Entregador</p>
                <h3 className="text-xl font-bold uppercase tracking-tight">Ricardo Silva</h3>
                <p className="text-xs text-neutral-400">Honda CB 500 • PRETA</p>
              </div>
           </div>

           <div className="flex gap-4 w-full md:w-auto">
              {!isArrived ? (
                <>
                  <button className="flex-1 md:flex-none px-8 py-4 bg-neutral-900 border border-neutral-700 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-colors">
                    MENSAGEM
                  </button>
                  <button className="flex-1 md:flex-none px-8 py-4 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-accent/80 transition-colors shadow-lg">
                    LIGAR
                  </button>
                </>
              ) : (
                <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 italic">
                  Atendimento finalizado
                </div>
              )}
           </div>
        </div>
      </div>
    </motion.div>
  )
}
