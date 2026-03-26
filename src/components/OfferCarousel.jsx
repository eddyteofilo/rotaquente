import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Star } from 'lucide-react'

export default function OfferCarousel({ products, onSelect }) {
  const saleProducts = products.filter(p => p.onSale)

  if (saleProducts.length === 0) return null

  return (
    <section className="mb-16 overflow-hidden">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2">
          <div className="bg-accent p-1 rounded-sm">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tighter uppercase">Ofertas <span className="text-accent italic">Imperdíveis</span></h2>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
          Arraste para explorar
        </div>
      </div>

      <motion.div 
        drag="x"
        dragConstraints={{ right: 0, left: -((saleProducts.length * 320) - 800) }} // Rough constraint
        className="flex gap-6 cursor-grab active:cursor-grabbing pb-4"
      >
        {saleProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(product)}
            className="w-[300px] flex-shrink-0 glass-card p-4 rounded-sm border-accent/30 relative group flex flex-col justify-between"
          >
            <div className="absolute top-4 left-4 z-10">
               <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-lg uppercase tracking-widest">
                -{product.discount}% OFF
               </span>
            </div>
            
            <div className="aspect-[16/9] w-full rounded-sm overflow-hidden mb-4 border border-neutral-800">
               <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
               />
            </div>

            <div className="mb-4">
               <div className="flex items-center justify-between mb-1">
                 <h3 className="font-bold text-lg uppercase tracking-tight">{product.name}</h3>
                 <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span>{product.rating}</span>
                  </div>
               </div>
               <p className="text-xs text-neutral-500 line-clamp-1">{product.description}</p>
            </div>

            <div className="flex items-center justify-between mt-auto">
               <div className="flex flex-col">
                  <span className="text-xs text-neutral-600 line-through">R$ {product.price.toFixed(2)}</span>
                  <span className="text-2xl font-bold tracking-tighter text-white">
                    R$ {(product.price * (1 - product.discount/100)).toFixed(2)}
                  </span>
               </div>
               <button className="bg-primary text-primary-foreground p-3 rounded-sm hover:bg-accent hover:text-white transition-all shadow-xl">
                 <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
