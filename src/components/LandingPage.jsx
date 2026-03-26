import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowRight, CheckCircle2, ShoppingCart, CreditCard, ClipboardList, Package, Bike, MapPin, BarChart3, ChevronRight } from 'lucide-react'

const LandingPage = ({ onStartSimulation }) => {
  useEffect(() => {
    // Scroll reveal logic (mimicking the user's script)
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#f0ede8] font-['DM_Sans'] antialiased selection:bg-amber-500/30">
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] overflow-hidden">
        <svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg' className="w-full h-full">
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-[#0a0a0b]/85 backdrop-blur-xl border-bottom border-[#1e1e22]">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Rota Quente" className="h-10 w-auto" />
          <span className="font-['Syne'] font-extrabold text-xl tracking-tighter text-white">Rota<span className="text-[#f59e0b]">Quente</span></span>
        </div>
        <div className="hidden md:flex items-center gap-9 text-sm text-[#7a7672]">
          <a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
          <a href="#rastreio" className="hover:text-white transition-colors">Rastreio</a>
        </div>
        <button 
          onClick={onStartSimulation}
          className="bg-[#f59e0b] text-[#0a0a0b] font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-[#fcd34d] transition-all hover:-translate-y-0.5"
        >
          ▶ Ver demonstração
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="relative max-w-4xl z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#f59e0b1f] border border-[#f59e0b4d] text-[#f59e0b] text-[10px] font-bold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
            A era do restaurante automatizado chegou
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-['Syne'] font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1.07] tracking-[-0.04em] mb-6"
          >
            Seu restaurante entrega mais.<br />
            <span className="text-[#f59e0b] relative italic">
              Você gerencia menos.
              <span className="absolute bottom-1 left-0 right-0 h-1 md:h-2 bg-[#f59e0b]/50 rounded-full" />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#7a7672] text-lg md:text-xl max-w-xl mx-auto mb-12"
          >
            Do pedido ao entregador, tudo em um único sistema. Cardápio digital, pagamento automático, produção inteligente e rastreio em tempo real — integrados para você lucrar mais e trabalhar menos.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onStartSimulation}
              className="group flex items-center gap-2.5 bg-[#f59e0b] text-[#0a0a0b] font-bold text-lg px-8 py-4 rounded-xl shadow-[0_0_32px_rgba(245,158,11,0.3)] hover:bg-[#fcd34d] hover:shadow-[0_0_48px_rgba(245,158,11,0.45)] transition-all hover:-translate-y-1"
            >
              <Play className="fill-[#0a0a0b]" size={20} />
              Ver como funciona ao vivo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <a href="#recursos" className="flex items-center gap-2 border border-[#1e1e22] text-[#7a7672] px-6 py-4 rounded-xl hover:border-[#7a7672] hover:text-[#f0ede8] transition-all">
              Conhecer recursos <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-10 border-t border-[#1e1e22]"
          >
            <div className="text-center">
              <span className="font-['Syne'] text-3xl font-extrabold text-[#f59e0b] block">3×</span>
              <span className="text-[10px] uppercase tracking-wider text-[#7a7672]">mais pedidos gerenciados</span>
            </div>
            <div className="text-center">
              <span className="font-['Syne'] text-3xl font-extrabold text-[#f59e0b] block">-68%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#7a7672]">erros de produção</span>
            </div>
            <div className="text-center">
              <span className="font-['Syne'] text-3xl font-extrabold text-[#f59e0b] block">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#7a7672]">visibilidade do pedido</span>
            </div>
            <div className="text-center">
              <span className="font-['Syne'] text-3xl font-extrabold text-[#f59e0b] block">+40%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#7a7672]">ticket médio</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DOR */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal">
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#f59e0b] mb-4">O problema</div>
          <h2 className="font-['Syne'] font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.15] mb-5">
            Por que a maioria dos restaurantes<br />perde dinheiro no delivery?
          </h2>
          <p className="text-[#7a7672] max-w-lg mb-14">Não é falta de cliente — é falta de sistema. Veja onde o dinheiro escapa:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '📱', title: 'Pedidos em 4 lugares ao mesmo tempo', desc: 'WhatsApp, iFood, telefone, balcão… ninguém controla tudo e os pedidos se perdem no caminho.' },
            { icon: '🤯', title: 'Produção no grito', desc: 'Cozinheiro recebe pedido verbal, erra item, refaz. Tempo perdido, cliente insatisfeito, prejuízo garantido.' },
            { icon: '💸', title: 'Pagamento manual e sem controle', desc: 'Troco errado, cancelamento sem registro, maquininha desatualizada. Caixa que nunca fecha certo.' },
            { icon: '🔇', title: 'Cliente sem informação', desc: '"Cadê meu pedido?" — essa pergunta custa atendente, tempo e 1 estrela de avaliação por vez.' },
            { icon: '🗂️', title: 'Cardápio desatualizado', desc: 'Item acabou, preço mudou, promoção expirou. O cliente pede, você cancela. E a nota vai lá embaixo.' },
            { icon: '🚴', title: 'Entregador sem rota', desc: 'Ninguém sabe onde o motoboy está. O restaurante não sabe, o cliente não sabe, e o pedido esfria.' }
          ].map((item, i) => (
            <div key={i} className="reveal group bg-[#111113] border border-[#1e1e22] p-8 rounded-2xl hover:border-amber-500/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-3xl mb-4 block">{item.icon}</span>
              <h3 className="font-['Syne'] font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-[#7a7672] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="reveal max-w-3xl mx-auto text-center px-6 py-20">
        <p className="font-['Syne'] text-2xl md:text-4xl font-bold leading-tight">
          Cada um desses problemas tem solução.<br />
          <span className="text-[#f59e0b]">E todos funcionam juntos em um único sistema.</span>
        </p>
      </div>

      {/* FLUXO */}
      <section id="como-funciona" className="bg-[#111113] border-y border-[#1e1e22] py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-20">
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#f59e0b] mb-4">O fluxo completo</div>
            <h2 className="font-['Syne'] font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.15]">
              Do pedido à porta do cliente.<br />Automático. Do início ao fim.
            </h2>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4">
            <div className="hidden lg:block absolute top-[34px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            
            {[
              { icon: <ShoppingCart size={24} />, title: 'Cliente escolhe', desc: 'Cardápio digital bonito, rápido e sempre atualizado' },
              { icon: <CreditCard size={24} />, title: 'Paga na hora', desc: 'Pagamento integrado: Pix, cartão ou dinheiro — confirmado automaticamente' },
              { icon: <ClipboardList size={24} />, title: 'Cozinha recebe', desc: 'Comanda digital direto na tela — sem papel, sem grito, sem erro' },
              { icon: <Package size={24} />, title: 'Produção avança', desc: 'Status atualizado em tempo real: preparando → pronto → coletado' },
              { icon: <Bike size={24} />, title: 'Entregador acionado', desc: 'Sistema distribui automaticamente para o motoboy disponível mais próximo' },
              { icon: <MapPin size={24} />, title: 'Cliente acompanha', desc: 'Rastreio ao vivo no celular — do forno à porta de casa' }
            ].map((step, i) => (
              <div key={i} className="reveal flex flex-col items-center text-center px-2 group">
                <div className="w-16 h-16 bg-[#0a0a0b] border-2 border-[#f59e0b] rounded-full flex items-center justify-center text-[#f59e0b] mb-5 relative z-10 group-hover:bg-[#f59e0b1f] group-hover:shadow-[0_0_24px_rgba(245,158,11,0.3)] transition-all">
                  {step.icon}
                </div>
                <h4 className="font-['Syne'] font-bold text-sm mb-2">{step.title}</h4>
                <p className="text-[10px] md:text-xs text-[#7a7672]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section id="recursos" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="reveal">
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#f59e0b] mb-4">Recursos incluídos</div>
          <h2 className="font-['Syne'] font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.15] mb-5">
            Tudo que um restaurante<br />moderno precisa
          </h2>
          <p className="text-[#7a7672] max-w-lg mb-14">Não é só um app. É uma central de operações que trabalha enquanto você foca no que importa: o sabor.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { tag: 'Cardápio', icon: '🍽️', title: 'Cardápio Digital Inteligente', desc: 'Monte categorias, adicione fotos, habilite/desabilite itens em segundos. Preços e disponibilidade sincronizados em todos os canais automaticamente.' },
            { tag: 'Pagamento', icon: '💳', title: 'Pagamento 100% Automático', desc: 'Pix instantâneo, cartão de crédito/débito e dinheiro com troco calculado. Conciliação automática no fim do dia — caixa fechado sem dor de cabeça.' },
            { tag: 'Produção', icon: '👨‍🍳', title: 'Sistema de Produção (KDS)', desc: 'Tela na cozinha com todos os pedidos em ordem de prioridade. A equipe sabe exatamente o que fazer e quando — sem papel, sem confusão.' },
            { tag: 'Logística', icon: '🗺️', title: 'Gestão de Entregadores', desc: 'Atribuição automática ou manual de rotas. Mapa ao vivo com posição de cada motoboy. Histórico de entregas e desempenho por entregador.' },
            { tag: 'Cliente', icon: '📡', title: 'Rastreio em Tempo Real', desc: 'O cliente vê cada etapa do pedido direto no celular. Menos ligações, mais confiança, mais avaliações positivas.' },
            { tag: 'Analytics', icon: '📊', title: 'Dashboard de Resultados', desc: 'Faturamento por hora, produtos mais vendidos, tempo médio de entrega e avaliação dos clientes — tudo visível em um painel simples.' }
          ].map((feature, i) => (
            <div key={i} className="reveal group bg-[#111113] border border-[#1e1e22] p-10 rounded-2xl hover:border-amber-500/40 hover:-translate-y-1 transition-all relative overflow-hidden shadow-2xl shadow-black/50">
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/5 group-hover:bg-amber-500/10 blur-2xl rounded-full transition-all" />
              <span className="inline-block bg-[#f59e0b1f] text-[#f59e0b] text-[10px] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded mb-6">{feature.tag}</span>
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="font-['Syne'] font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-[#7a7672] text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RASTREIO MOCKUP */}
      <section id="rastreio" className="bg-[#111113] border-y border-[#1e1e22] py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#f59e0b] mb-4">Transparência total</div>
            <h2 className="font-['Syne'] font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.15] mb-8">
              O cliente vê tudo.<br />Você controla tudo.
            </h2>
            <p className="text-[#7a7672] mb-10 leading-relaxed">
              Quando o cliente sabe onde está o pedido, ele não liga para o restaurante — ele confia. Isso gera mais avaliações 5 estrelas e mais pedidos futuros.
            </p>
            <ul className="space-y-4">
              {[
                'Notificação automática a cada etapa',
                'Link de rastreio enviado por WhatsApp',
                'Mapa ao vivo com posição do entregador',
                'Previsão de entrega atualizada em tempo real',
                'Histórico de pedidos para o cliente',
                'Avaliação automática após a entrega'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-sm">
                  <div className="flex-shrink-0 w-5 h-5 bg-[#f59e0b1f] text-[#f59e0b] rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal bg-[#0a0a0b] border border-[#1e1e22] p-8 md:p-10 rounded-[40px] shadow-2xl relative">
            <div className="flex justify-between items-center mb-8">
              <span className="font-['Syne'] font-bold text-sm">🍕 Pedido #4872 — Pizza Margherita</span>
              <div className="flex items-center gap-2 bg-green-500/10 text-green-500 text-[10px] font-bold px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Em rota
              </div>
            </div>

            <div className="space-y-0 relative">
              {[
                { status: 'done', icon: '✅', title: 'Pedido confirmado', time: 'Pagamento aprovado via Pix • 19:32' },
                { status: 'done', icon: '✅', title: 'Em preparo na cozinha', time: 'Comanda enviada ao KDS • 19:33' },
                { status: 'done', icon: '✅', title: 'Pronto para coleta', time: 'Entregador notificado • 19:51' },
                { status: 'active', icon: '🛵', title: 'Saiu para entrega', time: 'Carlos está a 1,2km de você • Agora' },
                { status: 'pending', icon: '🏠', title: 'Entregue', time: 'Previsão: ~8 minutos' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 pb-6 last:pb-0 relative">
                  {i < 4 && <div className="absolute left-[20px] top-[40px] bottom-0 w-[1px] bg-[#1e1e22]" />}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm z-10 transition-all ${
                    item.status === 'done' ? 'bg-green-500/20' : 
                    item.status === 'active' ? 'bg-[#f59e0b1f] border-2 border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse' : 
                    'bg-[#0a0a0b] border border-[#1e1e22] opacity-50'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="pt-1.5">
                    <strong className="font-['Syne'] font-bold text-sm block mb-0.5">{item.title}</strong>
                    <span className="text-[10px] text-[#7a7672]">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="assistir" className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="reveal relative max-w-2xl mx-auto">
          <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#f59e0b] mb-4">Pronto para transformar seu restaurante?</div>
          <h2 className="font-['Syne'] font-extrabold text-3xl md:text-5xl tracking-tight leading-[1.15] mb-6">
            Veja na prática como<br /><span className="text-[#f59e0b]">tudo funciona junto</span>
          </h2>
          <p className="text-[#7a7672] mb-12">
            Em menos de 7 minutos você entende como o Rota Quente transforma pedido caótico em operação lucrativa — sem precisar trocar de sistema ou treinar equipe do zero.
          </p>
          
          <button 
            onClick={onStartSimulation}
            className="group inline-flex items-center gap-4 bg-[#f59e0b] text-[#0a0a0b] font-bold text-xl px-12 py-6 rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.35)] hover:bg-[#fcd34d] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-all hover:-translate-y-1.5"
          >
            <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
              <Play className="fill-[#0a0a0b]" size={20} />
            </div>
            Assistir como funciona — grátis
          </button>
          
          <div className="mt-8 text-[11px] text-[#7a7672] flex items-center justify-center gap-4">
            <span>⏱ <span className="text-[#f59e0b]">7 minutos</span> de demo completa</span>
            <span className="w-1 h-1 bg-[#1e1e22] rounded-full" />
            <span>Sem cadastro</span>
            <span className="w-1 h-1 bg-[#1e1e22] rounded-full" />
            <span>Sem compromisso</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1e1e22] py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Rota Quente" className="h-8 w-auto" />
          <span className="font-['Syne'] font-extrabold text-lg tracking-tighter text-white">Rota<span className="text-[#f59e0b]">Quente</span></span>
        </div>
        <p className="text-xs text-[#7a7672]">© 2025 Rota Quente. Todos os direitos reservados.</p>
        <p className="text-[10px] uppercase tracking-widest text-[#7a7672] font-bold text-center">Feito para restaurantes que desejam excelência em logística e entregas quentes.</p>
      </footer>

      {/* Styles for reveal animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .65s ease, transform .65s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />
    </div>
  )
}

export default LandingPage
