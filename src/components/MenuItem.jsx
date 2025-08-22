import React from 'react'
import { Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const MenuItem = ({ item }) => {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(item)
  }

  return (
    <div className="card border border-gray-700 hover:border-primary/50 group">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            {item.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-accent">
            ${item.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center space-x-2 text-sm py-2 px-4 group-hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuItem