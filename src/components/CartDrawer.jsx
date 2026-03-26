import React from 'react'
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onCheckout }) {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full max-w-md bg-neutral-950 border-l border-neutral-800 z-[60] flex flex-col shadow-2xl"
    >
      <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tighter uppercase">Seu <span className="text-accent">Carrinho</span></h2>
        <button onClick={onClose} className="p-2 hover:bg-neutral-900 rounded-sm transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-secondary-foreground text-center">
            <ShoppingCart className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg">Seu carrinho está vazio.</p>
            <button onClick={onClose} className="mt-4 text-accent font-bold text-sm tracking-widest uppercase hover:underline">
              Explorar Cardápio
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 group">
              <div className="w-20 h-20 bg-muted rounded-sm border border-neutral-800 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <button onClick={() => onRemove(item.id)} className="text-neutral-600 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-secondary-foreground mb-4">R$ {item.price.toFixed(2)}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-800 rounded-sm">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-neutral-900 transition-colors border-r border-neutral-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-neutral-900 transition-colors border-l border-neutral-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-6 border-t border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
          <div className="flex justify-between mb-6">
            <span className="text-secondary-foreground">Subtotal</span>
            <span className="text-2xl font-bold">R$ {total.toFixed(2)}</span>
          </div>
          <button 
            onClick={onCheckout}
            className="w-full bg-accent text-white py-4 font-bold tracking-widest uppercase rounded-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          >
            FINALIZAR PEDIDO
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-[10px] text-center text-neutral-600 mt-4 uppercase tracking-[0.2em]">
            Taxa de entrega calculada no checkout
          </p>
        </div>
      )}
    </motion.div>
  )
}

// Internal icons helper for isolation (can be passed from parent later)
import { ShoppingCart, Utensils } from 'lucide-react'
