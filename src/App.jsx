import React, { useState } from 'react'
import { ShoppingCart, Search, Utensils, Zap, Clock, Star, MapPin, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CartDrawer from './components/CartDrawer'
import OrderTracking from './components/OrderTracking'
import OfferCarousel from './components/OfferCarousel'
import ManagerSimulation from './components/ManagerSimulation'
import WhatsAppSimulation from './components/WhatsAppSimulation'
import LeadSurvey from './components/LeadSurvey'
import LeadDashboard from './components/LeadDashboard'
import LandingPage from './components/LandingPage'
import ThankYouPage from './components/ThankYouPage'

const SimulationBanner = () => (
  <div className="bg-accent text-white py-3 px-6 text-center relative z-50 shadow-lg">
     <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
        <span className="bg-white text-accent px-2 py-0.5 rounded-sm">LIVE DEMO</span>
        <span>EXPERIMENTE A REVOLUÇÃO: Faça um pedido para simular como funciona o atendimento e entrega Rota Quente.</span>
     </p>
  </div>
)

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'burger', name: 'Hambúrgueres' },
  { id: 'pizza', name: 'Pizzas' },
  { id: 'drinks', name: 'Bebidas' },
  { id: 'desserts', name: 'Sobremesas' },
]

const PRODUCTS = [
  { id: 1, name: 'Rota Quente Burger', price: 42.00, category: 'burger', description: 'Carne angus, queijo brie, cebola caramelizada e aioli de alho negro.', rating: 4.9, time: '20-30 min', image: '/images/obsidian_burger.png', onSale: true, discount: 15 },
  { id: 2, name: 'Pizza Trufa Negra', price: 68.00, category: 'pizza', description: 'Mozarela de búfala, cogumelos frescos e azeite de trufas negras.', rating: 5.0, time: '30-40 min', image: '/images/truffle_pizza.png', onSale: true, discount: 20 },
  { id: 3, name: 'Soda de Hibisco', price: 18.00, category: 'drinks', description: 'Suco de limão siciliano, xarope de hibisco artesanal e água gaseificada.', rating: 4.7, time: '5-10 min', image: '/images/hibiscus_soda.png' },
  { id: 4, name: 'Classic Burger', price: 32.00, category: 'burger', description: 'Hambúrguer clássico com cheddar, alface, tomate e picles.', rating: 4.5, time: '15-20 min', image: '/images/classic_burger.png' },
  { id: 5, name: 'Cheesecake Frutas Vermelhas', price: 24.00, category: 'desserts', description: 'Fatia Generosa de cheesecake com calda artesanal de frutas vermelhas.', rating: 4.8, time: '10 min', image: '/images/red_fruit_cheesecake.png', onSale: true, discount: 10 },
  { id: 6, name: 'Coca-Cola 350ml', price: 8.00, category: 'drinks', description: 'Lata de Coca-Cola original gelada.', rating: 4.9, time: '5 min', image: '/images/coke_can.png' },
]

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [view, setView] = useState('landing') // 'landing', 'whatsapp', 'menu', 'manager', 'tracking', 'survey', 'dashboard', 'thanks'
  const [coachMark, setCoachMark] = useState(null)

  const addToCart = (product) => {
    const finalPrice = product.onSale 
      ? product.price * (1 - product.discount / 100) 
      : product.price

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, price: finalPrice, originalPrice: product.price, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item))
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setCoachMark({
      title: "IA EM AÇÃO",
      message: "Seu pedido foi processado instantaneamente. Zero erro humano, máxima velocidade."
    })
    setTimeout(() => {
      setCoachMark(null)
      setView('manager')
    }, 3000)
  }

  const handleManagerComplete = () => {
    setCoachMark({
      title: "TRANSPARÊNCIA TOTAL",
      message: "O cliente agora acompanha cada etapa em tempo real, eliminando ligações de suporte."
    })
    setTimeout(() => {
      setCoachMark(null)
      setView('tracking')
    }, 3000)
  }

  const handleTrackingComplete = () => {
    setView('survey')
  }

  const handleStartMenu = () => {
    setCoachMark({
      title: "DADOS COLETADOS",
      message: "A IA capturou o Nome e o Endereço em segundos. Menos fricção = Mais conversão."
    })
    setTimeout(() => {
      setCoachMark(null)
      setView('menu')
    }, 3000)
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  if (view === 'dashboard') {
    return <LeadDashboard onBack={() => setView('menu')} />
  }

  if (view === 'thanks') {
    return <ThankYouPage onRestart={() => setView('landing')} />
  }

  if (view === 'landing') {
    return <LandingPage onStartSimulation={() => setView('whatsapp')} />
  }

  if (view === 'whatsapp') {
    return <WhatsAppSimulation onStartMenu={handleStartMenu} />
  }

  if (view === 'survey') {
    return <LeadSurvey onComplete={() => setView('thanks')} />
  }

  if (view === 'manager') {
    return <ManagerSimulation orderItems={cartItems} onComplete={handleManagerComplete} />
  }

  if (view === 'tracking') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <OrderTracking onBack={() => setView('menu')} onComplete={handleTrackingComplete} />
      </div>
    )
  }

  return (
    <div className="min-h-screen font-sans selection:bg-accent/30 bg-background text-foreground flex flex-col">
      <SimulationBanner />
      
      {/* Navbar */}
      <nav className="fixed top-[44px] left-0 right-0 z-50 glass px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Rota Quente" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tighter uppercase text-white">Rota <span className="text-accent">Quente</span></span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase tracking-widest border-r border-neutral-800 pr-6">
            <MapPin className="w-3 h-3 text-accent" />
            <span>Av. Paulista, 1000</span>
          </div>
          <button className="hover:text-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative hover:text-accent transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-[10px] font-bold flex items-center justify-center rounded-full text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <main className="pt-40 px-6 pb-20 max-w-7xl mx-auto">
        {/* Dynamic Offers Carousel */}
        <OfferCarousel products={PRODUCTS} onSelect={addToCart} />

        {/* Hero Section */}
        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-[0.9] uppercase"
          >
            SABORES QUE <br />
            <span className="text-accent italic">SURPREENDEM.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary-foreground max-w-md text-lg"
          >
            Este é um simulador premium de atendimento. Selecione um item e veja a mágica acontecer do pedido à entrega.
          </motion.p>
        </header>

        <AnimatePresence>
          {coachMark && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="fixed bottom-10 right-10 z-[200] max-w-sm glass-card p-6 border-l-4 border-accent shadow-2xl"
            >
              <div className="flex items-start gap-4">
                 <div className="bg-accent/20 p-2 rounded-sm">
                    <Zap className="w-5 h-5 text-accent" />
                 </div>
                 <div>
                    <h4 className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{coachMark.title}</h4>
                    <p className="text-sm text-white font-medium leading-relaxed">{coachMark.message}</p>
                 </div>
              </div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-accent/30"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories */}
        <section className="mb-12 sticky top-[72px] z-40 bg-background/80 backdrop-blur-md pt-2 pb-6 border-b border-neutral-900">
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 whitespace-nowrap rounded-sm border text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-neutral-800 hover:border-neutral-600 text-secondary-foreground'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {PRODUCTS.filter(p => activeCategory === 'all' || p.category === activeCategory).map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card group p-5 rounded-sm flex flex-col h-full"
              >
                <div className="aspect-square bg-neutral-900 border border-neutral-800 mb-4 flex items-center justify-center rounded-sm overflow-hidden relative">
                   <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                   />
                   <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm border border-white/10 text-[10px] font-bold">
                    <Star className="w-2.5 h-2.5 fill-accent text-accent" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent">{product.category}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-1 uppercase tracking-tight">{product.name}</h3>
                <p className="text-sm text-secondary-foreground mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-800/50">
                  <div className="flex flex-col">
                    {product.onSale && (
                      <span className="text-[10px] text-neutral-600 line-through">R$ {product.price.toFixed(2)}</span>
                    )}
                    <span className="text-2xl font-bold tracking-tighter">
                      R$ {(product.onSale ? product.price * (1 - product.discount/100) : product.price).toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-accent hover:text-white transition-all active:scale-95"
                  >
                    ADICIONAR
                  </button>
                </div>
                
                <div className="mt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{product.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-accent" />
                    <span>Express</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  )
}
