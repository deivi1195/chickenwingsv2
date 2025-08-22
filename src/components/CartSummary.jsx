import React, { useState } from 'react'
import { Minus, ShoppingBag, Trash2, X, MapPin, User, Phone, MessageSquare } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartSummary = () => {
  const { items, removeItem, clearCart, getTotalPrice } = useCart()
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío')
      return
    }
    setShowCheckoutForm(true)
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    const orderSummary = items.map(item => 
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')

    const customerInfo = `\n\nDatos del Cliente:\nNombre: ${formData.name}\nTeléfono: ${formData.phone}\nDirección: ${formData.address}`
    const notes = formData.notes ? `\n\nNotas: ${formData.notes}` : ''
    const total = getTotalPrice().toFixed(2)
    
    // Aquí puedes agregar el código para enviar el pedido a tu backend
    
    alert(`¡Pedido realizado con éxito!\n\nResumen del pedido:\n${orderSummary}\n\nTotal: $${total}${customerInfo}${notes}\n\nTe contactaremos pronto para confirmar.`)
    clearCart()
    setShowCheckoutForm(false)
    setFormData({ name: '', phone: '', address: '', notes: '' })
  }

  return (
    <div className="fixed top-20 right-4 w-80 bg-black border-4 border-red-600 p-4 shadow-xl z-50 max-h-[80vh] overflow-y-auto">
      <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 text-center transform -skew-x-12">
        TU PEDIDO
      </div>

      {showCheckoutForm ? (
        <div className="relative">
          <button 
            onClick={() => setShowCheckoutForm(false)}
            className="absolute -top-2 -right-2 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1 flex items-center">
                <User className="h-4 w-4 mr-2" /> Nombre Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1 flex items-center">
                <Phone className="h-4 w-4 mr-2" /> Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1 flex items-center">
                <MapPin className="h-4 w-4 mr-2" /> Dirección de Envío *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" /> Notas Adicionales
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                placeholder="Ej: Llamar al timbre, referencias, etc."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-colors duration-200 text-sm"
              >
                CONFIRMAR PEDIDO - ${getTotalPrice().toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
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
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>REALIZAR PEDIDO</span>
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                >
                  <Trash2 className="h-3 w-3" />
                  <span>LIMPIAR CARRITO</span>
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default CartSummary