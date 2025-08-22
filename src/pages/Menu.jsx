import React from 'react'
import { Flame } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartSummary from '../components/CartSummary'

const Menu = () => {
  const { addItem } = useCart()

  const handleAddItem = (name, price) => {
    addItem({
      id: Date.now() + Math.random(),
      name,
      price
    })
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Main Menu Layout */}
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Circles with chicken wings */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-90 flex items-center justify-center">
          <div className="text-8xl">🍗</div>
        </div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-90 flex items-center justify-center">
          <div className="text-8xl">🍗</div>
        </div>

        {/* Central Logo */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-10">
          <div className="flex items-center justify-center mb-2">
            <Flame className="h-16 w-16 text-yellow-400" />
          </div>
          <h1 className="text-6xl font-black text-yellow-400 mb-1 tracking-wider" style={{textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'}}>
            CHICKEN
          </h1>
          <h1 className="text-6xl font-black text-red-600 tracking-wider" style={{textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'}}>
            WINGS
          </h1>
          <div className="flex justify-center space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < 3 ? 'bg-red-600' : 'bg-yellow-400'}`}></div>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="relative z-20 pt-60 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            
            {/* ENTRADAS Column */}
            <div className="bg-black p-4">
              <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 transform -skew-x-12 text-center">
                ENTRADAS
              </div>
              <div className="space-y-3 text-white text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-bold">PORCIONES DE PAPAS = 3$</span>
                  <button 
                    onClick={() => handleAddItem('Porciones de Papas', 3)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <div className="font-bold">PAPAS CHEESE & BACON = 5$</div>
                    <div className="text-xs text-gray-300">PAPAS BAÑADAS EN QUESO CHEDDAR FUNDIDO Y TOCINETA CROCANTE</div>
                  </div>
                  <button 
                    onClick={() => handleAddItem('Papas Cheese & Bacon', 5)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">TEQUEÑOS TEQUE TAY (4) UNIDAD = 3$</span>
                  <button 
                    onClick={() => handleAddItem('Tequeños Teque Tay (4)', 3)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold">TEQUEÑOS TEQUE TAY (8) UNIDAD = 6$</span>
                  <button 
                    onClick={() => handleAddItem('Tequeños Teque Tay (8)', 6)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 transform -skew-x-12 text-center">
                  ALAS CON PAPAS
                </div>
                <div className="space-y-2 text-white text-sm">
                  <div className="flex justify-between items-center">
                    <span>ALAS X 3 + PAPAS = 3$ (1SALSAS)</span>
                    <button 
                      onClick={() => handleAddItem('Alas x3 + Papas', 3)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ALAS X 6 + PAPAS = 5$ (1SALSAS)</span>
                    <button 
                      onClick={() => handleAddItem('Alas x6 + Papas', 5)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ALAS X12 + PAPAS = 9$ (2SALSAS)</span>
                    <button 
                      onClick={() => handleAddItem('Alas x12 + Papas', 9)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ALAS X 24 + PAPAS = 18$ (3SALSAS)</span>
                    <button 
                      onClick={() => handleAddItem('Alas x24 + Papas', 18)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs">ALAS X 48 + PAPAS + PORCIÓN DE TEQUEÑOS =35$ (4 SALSAS)</span>
                    <button 
                      onClick={() => handleAddItem('Alas x48 + Papas + Tequeños', 35)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 transform -skew-x-12 text-center">
                  ALAS SOLAS
                </div>
                <div className="space-y-2 text-white text-sm">
                  <div className="flex justify-between items-center">
                    <span>ALAS X 10 (2SALSAS) = 7$</span>
                    <button 
                      onClick={() => handleAddItem('Alas x10', 7)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ALAS X 20 (4SALSAS) = 12$</span>
                    <button 
                      onClick={() => handleAddItem('Alas x20', 12)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SALSAS Column */}
            <div className="bg-black border-4 border-yellow-400 p-4">
              <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 text-center transform -skew-x-12">
                SALSAS
              </div>
              
              <div className="mb-6">
                <div className="text-yellow-400 font-bold mb-2 text-sm">• SALSAS SIN PICANTE</div>
                <div className="text-white text-xs space-y-1">
                  <div>BBQ</div>
                  <div>3 QUESOS</div>
                  <div>TERIYAKI</div>
                  <div>MOSTAZA MIEL</div>
                  <div>SALSA AGRIDULCE</div>
                  <div>JACK DANIEL'S</div>
                  <div>SALSA RANCH</div>
                  <div>HONEY GARLIC</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-yellow-400 font-bold mb-2 text-sm">• SALSAS PICANTE SUAVE</div>
                <div className="text-white text-xs space-y-1">
                  <div>BUFFALO</div>
                  <div>CHIPOTLE</div>
                  <div>ASIÁTICA</div>
                  <div>HONEY GARLIC HOT</div>
                </div>
              </div>

              <div>
                <div className="text-yellow-400 font-bold mb-2 text-sm">• SALSA PICANTE EXTREMO</div>
                <div className="text-white text-xs space-y-1">
                  <div>HABANERO</div>
                  <div>HABANERO PIÑA</div>
                  <div>BUFFALO EXTREMO</div>
                </div>
              </div>
            </div>

            {/* ENSALADAS Column */}
            <div className="bg-black p-4">
              <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 transform -skew-x-12 text-center">
                ENSALADAS
              </div>
              <div className="space-y-4 text-white text-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <div className="font-bold">ENSALADA CÉSAR = 4$</div>
                    <div className="text-xs text-gray-300">LECHUGA CRESPA, CROTINIS DE PAN, QUESO PARMESANO, TOCINETA, ADEREZO CÉSAR.</div>
                  </div>
                  <button 
                    onClick={() => handleAddItem('Ensalada César', 4)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <div className="font-bold">ENSALADA CÉSAR CON POLLO = 6$</div>
                    <div className="text-xs text-gray-300">LECHUGA FRESCA, PECHUGA DE POLLO, CROTINIS DE PAN, QUESO PARMESANO, TOCINETA, ADEREZO CÉSAR.</div>
                  </div>
                  <button 
                    onClick={() => handleAddItem('Ensalada César con Pollo', 6)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 transform -skew-x-12 text-center">
                  TENDER DE POLLO
                </div>
                <div className="space-y-3 text-white text-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <div className="font-bold">TENDER DE POLLO + PAPAS (M)</div>
                      <div className="text-xs text-gray-300">1 SALSA A ELECCIÓN 4$</div>
                    </div>
                    <button 
                      onClick={() => handleAddItem('Tender + Papas (M)', 4)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <div className="font-bold">TENDER DE POLLO + PAPAS (G)</div>
                      <div className="text-xs text-gray-300">1 SALSA A ELECCIÓN 7$</div>
                    </div>
                    <button 
                      onClick={() => handleAddItem('Tender + Papas (G)', 7)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* JUGOS Y BEBIDAS Column */}
            <div className="bg-black p-4">
              <div className="bg-red-600 text-white px-4 py-2 font-bold text-lg mb-4 transform -skew-x-12 text-center">
                JUGOS NATURALES Y BATIDOS
              </div>
              
              <div className="text-white space-y-3 text-sm">
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold border-b border-gray-600 pb-2">
                  <div></div>
                  <div>AGUA / LECHE</div>
                  <div></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>PIÑA</span>
                    <span className="text-xs">1$ 2$</span>
                    <button 
                      onClick={() => handleAddItem('Jugo de Piña', 1)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>FRESA</span>
                    <span className="text-xs">1$ 2$</span>
                    <button 
                      onClick={() => handleAddItem('Jugo de Fresa', 1)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>PARCHITA</span>
                    <span className="text-xs">1$ 2$</span>
                    <button 
                      onClick={() => handleAddItem('Jugo de Parchita', 1)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>MORA</span>
                    <span className="text-xs">1$ 2$</span>
                    <button 
                      onClick={() => handleAddItem('Jugo de Mora', 1)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>REFRESCOS</span>
                    <span className="text-xs">1$</span>
                    <button 
                      onClick={() => handleAddItem('Refresco', 1)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>MALTA</span>
                    <span className="text-xs">1$</span>
                    <button 
                      onClick={() => handleAddItem('Malta', 1)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>JUGOS</span>
                    <span className="text-xs">1$</span>
                    <button 
                      onClick={() => handleAddItem('Jugo', 1)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>SPEEDMAX</span>
                    <span className="text-xs">2$</span>
                    <button 
                      onClick={() => handleAddItem('Speedmax', 2)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* French Fries Image */}
                <div className="flex justify-center mt-6">
                  <div className="text-6xl">🍟</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cart Summary */}
        <CartSummary />
      </div>
    </div>
  )
}

export default Menu