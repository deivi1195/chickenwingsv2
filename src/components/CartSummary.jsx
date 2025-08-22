import React from 'react'
import { Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartSummary = () => {
  const { items, removeItem, clearCart, getTotalPrice } = useCart()

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío')
      return
    }

    const orderSummary = items.map(item => 
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')

    const total = getTotalPrice().toFixed(2)
    
    if (confirm(`Resumen de tu pedido:\n\n${orderSummary}\n\nTotal: $${total}\n\n¿Confirmar pedido?`)) {
      alert('¡Pedido realizado con éxito! Te contactaremos pronto.')
      clearCart()
    }
  }

  return (
    <div className="fixed top-20 right-4 w-80 bg-black border-4 border-red-600 p-4 shadow-xl z-50 max-h-96 overflow-y-auto">
      <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 text-center transform -skew-x-12">
        TU PEDIDO
      </div>

      <div className="space-y-2 mb-4">
        {items.length === 0 ? (
          <p className="text-white text-center py-4 text-sm">Tu carrito está vacío</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-700 p-2 text-white">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <h4 className="font-bold text-xs">{item.name}</h4>
                  <p className="text-gray-400 text-xs">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 font-bold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded p-1 transition-colors text-xs"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <div className="border-t border-gray-600 pt-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-white">TOTAL:</span>
              <span className="text-2xl font-bold text-yellow-400">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>REALIZAR PEDIDO</span>
            </button>
            
            <button
              onClick={clearCart}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
            >
              <Trash2 className="h-3 w-3" />
              <span>LIMPIAR</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSummary