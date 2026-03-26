import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MoreVertical, Search, Paperclip, Smile, Mic, CheckCheck, User, ExternalLink, Menu as MenuIcon } from 'lucide-react'

const MESSAGES = [
  { id: 1, type: 'bot', text: 'Olá! Bem-vindo(a) ao Rota Quente. 🔥', delay: 1000 },
  { id: 2, type: 'bot', text: 'Eu sou o agente de inteligência artificial responsável pelo seu atendimento. Para garantir que seu pedido chegue rápido, poderia me enviar seu *nome completo* e *endereço de entrega*?', delay: 2500 },
  { id: 3, type: 'user', text: 'João Silva, Rua Paulista 1000, Apto 42. Tel: (11) 99999-9999', delay: 4500 },
  { id: 4, type: 'bot', text: 'Ótimo, João! Meus algoritmos já validaram seu endereço e registraram seus dados no sistema de gestão. ⚡', delay: 6500 },
  { id: 5, type: 'bot', text: 'Como sou uma IA, não te deixo esperando. Clique no link abaixo para abrir nosso cardápio digital interativo e escolher o que deseja comer:', delay: 8000 },
  { id: 6, type: 'link', text: 'ABRIR CARDÁPIO INTERATIVO', delay: 9500 }
]

export default function WhatsAppSimulation({ onStartMenu }) {
  const [activeMessages, setActiveMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    let timers = []
    
    MESSAGES.forEach((msg, index) => {
      const timer = setTimeout(() => {
        if (msg.type === 'bot') {
          setIsTyping(true)
          const typingTimer = setTimeout(() => {
            setIsTyping(false)
            setActiveMessages(prev => [...prev, msg])
          }, 1000)
          timers.push(typingTimer)
        } else {
          setActiveMessages(prev => [...prev, msg])
        }
      }, msg.delay)
      timers.push(timer)
    })

    return () => timers.forEach(t => clearTimeout(t))
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [activeMessages, isTyping])

  return (
    <div className="fixed inset-0 z-[300] bg-[#111b21] flex items-center justify-center font-sans overflow-hidden">
      <div className="w-full h-full md:w-[95%] md:h-[90%] bg-[#0b141a] shadow-2xl flex flex-col md:flex-row border border-white/5 overflow-hidden">
        
        {/* Sidebar - Desktop Only */}
        <div className="hidden md:flex w-80 bg-[#111b21] border-r border-[#2a3942] flex-col">
          <header className="h-16 bg-[#202c33] px-4 flex items-center justify-between text-[#aebac1]">
            <div className="w-10 h-10 bg-[#6a7175] rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex gap-6">
              <MenuIcon className="w-5 h-5 cursor-pointer" />
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto px-2 pt-3">
             <div className="bg-[#202c33] rounded-sm p-3 flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">RQ</div>
                <div className="flex-1 border-b border-[#2a3942] pb-3">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">Rota Quente</span>
                      <span className="text-[10px] text-[#8696a0]">16:45</span>
                   </div>
                   <p className="text-xs text-accent truncate tracking-tight">Digitando...</p>
                </div>
             </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Header */}
          <header className="h-16 bg-[#202c33] px-4 flex items-center justify-between z-10 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">RQ</div>
              <div>
                <h3 className="text-white font-medium text-sm">Rota Quente <span className="text-[10px] bg-accent/20 text-accent px-1 ml-2 rounded-[2px] font-bold">BOT AI</span></h3>
                <p className="text-[10px] text-[#8696a0]">Online • Responde em segundos</p>
              </div>
            </div>
            <div className="flex gap-5 text-[#aebac1]">
              <Search className="w-5 h-5" />
              <MoreVertical className="w-5 h-5" />
            </div>
          </header>

          {/* Messages Background */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 flex flex-col gap-2 relative bg-[#0b141a]"
            style={{ 
              backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
              backgroundSize: '400px',
              backgroundRepeat: 'repeat',
              backgroundBlendMode: 'overlay',
              backgroundColor: '#0b141a'
            }}
          >
            <div className="text-center mb-4">
              <span className="bg-[#182229] text-[#8696a0] text-[10px] px-3 py-1 rounded-sm uppercase tracking-widest font-bold">Hoje</span>
            </div>

            <AnimatePresence>
              {activeMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.9, y: 10, x: msg.type === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  className={`max-w-[85%] md:max-w-[65%] p-3 rounded-sm text-sm relative shadow-sm ${
                    msg.type === 'user' 
                      ? 'self-end bg-[#005c4b] text-[#e9edef]' 
                      : 'self-start bg-[#202c33] text-[#e9edef]'
                  }`}
                >
                  {msg.type === 'link' ? (
                    <button 
                      onClick={onStartMenu}
                      className="flex flex-col gap-3 group"
                    >
                       <div className="bg-[#111b21] p-3 rounded-sm border border-white/5 flex items-center gap-4 hover:bg-black/40 transition-all">
                          <div className="w-12 h-12 bg-accent/20 rounded-sm flex items-center justify-center">
                             <MenuIcon className="w-6 h-6 text-accent" />
                          </div>
                          <div className="text-left">
                             <p className="text-accent font-bold text-xs uppercase tracking-tighter">Rota Quente Cardápio Digital</p>
                             <p className="text-[10px] text-[#8696a0]">Acesse agora nosso menu premium</p>
                          </div>
                          <ExternalLink className="w-4 h-4 text-accent ml-auto group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                       </div>
                       <span className="text-xs font-bold text-accent uppercase tracking-[0.2em] self-center py-2">{msg.text}</span>
                    </button>
                  ) : (
                    <>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-[9px] text-[#8696a0]">16:45</span>
                        <CheckCheck className={`w-3 h-3 ${msg.type === 'user' ? 'text-[#53bdeb]' : 'text-[#8696a0]'}`} />
                      </div>
                    </>
                  )}
                  
                  {/* Bubble Tail */}
                  <div className={`absolute top-0 w-3 h-4 ${
                    msg.type === 'user' 
                      ? 'right-[-8px] text-[#005c4b]' 
                      : 'left-[-8px] text-[#202c33]'
                  }`} style={{ 
                    clipPath: msg.type === 'user' ? 'polygon(0 0, 0 100%, 100% 0)' : 'polygon(100% 0, 100% 100%, 0 0)'
                  }} />
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="self-start bg-[#202c33] text-[#aebac1] px-4 py-2 rounded-sm text-xs italic flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-accent rounded-full animate-bounce" />
                  <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Input */}
          <footer className="h-16 bg-[#202c33] px-4 flex items-center gap-4">
            <Smile className="w-6 h-6 text-[#8696a0] cursor-pointer" />
            <Paperclip className="w-6 h-6 text-[#8696a0] cursor-pointer" />
            <div className="flex-1 bg-[#2a3942] rounded-sm px-4 h-10 flex items-center text-[#d1d7db] text-sm">
               Digite uma mensagem...
            </div>
            <Mic className="w-6 h-6 text-[#8696a0] cursor-pointer" />
          </footer>
        </div>
      </div>
    </div>
  )
}
