import React, { useState, useEffect } from 'react'

function App() {
  const [activeCategory, setActiveCategory] = useState('Entradas')
  const [showSauceModal, setShowSauceModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSauces, setSelectedSauces] = useState([])
  const [requiredSauces, setRequiredSauces] = useState(2)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [orderData, setOrderData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success') // 'success', 'error', 'warning'

  // Add this useEffect to handle scroll lock
  useEffect(() => {
    if (showOrderForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOrderForm]);

  const sauces = {
    sinPicante: ['BBQ', '3 Quesos', 'Teriyaki', 'Mostaza Miel', 'Salsa Agridulce', 'Jack Daniel\'s', 'Salsa Ranch', 'Honey Garlic'],
    picanteSuave: ['Buffalo', 'Chipotle', 'Asiática', 'Honey Garlic Hot'],
    picanteExtremo: ['Habanero', 'Habanero Piña', 'Buffalo Extremo']
  }

  const addToCart = (item) => {
    setCart(prev => [...prev, item])
  }

  const handleWingsClick = (item) => {
    // Determinar cuántas salsas necesita según el plato
    let saucesNeeded = 2
    if (item.name.includes('x 10')) saucesNeeded = 2
    else if (item.name.includes('x 20')) saucesNeeded = 4
    else if (item.name.includes('x 3')) saucesNeeded = 1
    else if (item.name.includes('x 6')) saucesNeeded = 1
    else if (item.name.includes('x 12')) saucesNeeded = 2
    else if (item.name.includes('x 24')) saucesNeeded = 3
    else if (item.name.includes('x 48')) saucesNeeded = 4
    else if (item.name.includes('Tender')) saucesNeeded = 1

    setSelectedItem(item)
    setRequiredSauces(saucesNeeded)
    setSelectedSauces([])
    setShowSauceModal(true)
  }

  const handleSauceSelect = (sauce) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(prev => prev.filter(s => s !== sauce))
    } else if (selectedSauces.length < requiredSauces) {
      setSelectedSauces(prev => [...prev, sauce])
    }
  }

  const confirmAddToCart = () => {
    if (selectedSauces.length === requiredSauces) {
      const itemWithSauces = {
        ...selectedItem,
        sauces: selectedSauces,
        name: `${selectedItem.name} (${selectedSauces.join(', ')})`
      }
      addToCart(itemWithSauces)
      setShowSauceModal(false)
      setSelectedItem(null)
      setSelectedSauces([])
    }
  }

  const handleOrderFormChange = (field, value) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRealizarPedido = () => {
    if (cart.length === 0) return
    setShowOrderForm(true)
    setIsCartOpen(false)
  }

  const generateOrderId = () => {
    // Generar 2 letras aleatorias
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const randomLetter1 = letters[Math.floor(Math.random() * letters.length)]
    const randomLetter2 = letters[Math.floor(Math.random() * letters.length)]

    // Generar número aleatorio de 4 dígitos (1000-9999)
    const randomNumber = Math.floor(Math.random() * 9000) + 1000

    return `${randomLetter1}${randomLetter2}-${randomNumber}`
  }

  const showCustomAlert = (message, type = 'success') => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)

    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
      setShowAlert(false)
    }, 4000)
  }

  const submitOrder = async () => {
    if (!orderData.nombre || !orderData.apellido || !orderData.telefono || !orderData.direccion) {
      showCustomAlert('Por favor completa todos los campos', 'warning')
      return
    }

    setIsSubmitting(true)

    try {
      // Preparar datos del pedido
      const orderDetails = {
        fuente: "web",
        cliente: {
          nombre: orderData.nombre,
          apellido: orderData.apellido,
          telefono: orderData.telefono,
          direccion: orderData.direccion
        },
        productos: cart.map(item => ({
          nombre: item.name,
          precio: item.price,
          salsas: item.sauces || []
        })),
        total: cart.reduce((sum, item) => sum + item.price, 0),
        fecha: new Date().toLocaleString('es-VE', {
          timeZone: 'America/Caracas',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }),
        id: generateOrderId()
      }

      // Enviar a n8n webhook
      const response = await fetch('https://chickenwingsv1-n8n.dnbu5s.easypanel.host/webhook/chicken-wings-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails)
      })

      if (response.ok) {
        // Limpiar carrito y formulario
        setCart([])
        setOrderData({
          nombre: '',
          apellido: '',
          telefono: '',
          direccion: ''
        })
        setShowOrderForm(false)
        showCustomAlert('¡Pedido enviado exitosamente! Te contactaremos por WhatsApp.', 'success')
      } else {
        throw new Error('Error al enviar el pedido')
      }
    } catch (error) {
      console.error('Error:', error)
      showCustomAlert('Error al enviar el pedido. Por favor intenta nuevamente.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    { name: 'Entradas' },
    { name: 'Alitas' },
    { name: 'Ensaladas' },
    { name: 'Hamburguesas' },
    { name: 'Perros' },
    { name: 'Salsas' },
    { name: 'Bebidas' },
    { name: 'Contacto' }
  ]

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Hero Section */}
      <header className="relative h-64 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/fondoHero3.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-gray-100 border-gray-400 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-3 font-bold text-lg transition-all duration-300 transform hover:scale-105 rounded-lg ${activeCategory === category.name
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-black hover:text-red-500 hover:bg-gray-100'
                  }`}
              >
                <span>{category.name.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-700">CHICKEN WINGS</h1>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 font-bold text-lg rounded-lg transition-all duration-300 ${activeCategory === category.name
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'text-gray-700 hover:text-red-500 hover:bg-gray-100'
                      }`}
                  >
                    {category.name.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative bg-orange-500 flex-1">

        {/* Category Content */}
        <div className="relative z-20 py-8 px-4 pb-24 min-h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto">

            {/* Category Title */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
                {activeCategory.toUpperCase()}
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto rounded-full"></div>
            </div>

            {/* Content based on active category */}
            {activeCategory === 'Entradas' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Porciones de papas', price: 3, desc: 'Papas crujientes perfectas para compartir' },
                  { name: 'Papas cheese & bacon', price: 5, desc: 'Papas con queso cheddar y tocineta' },
                  { name: 'Tequeños 4 unidades', price: 3, desc: 'Deliciosos tequeños crujientes' },
                  { name: 'Tequeños 8 unidades', price: 6, desc: 'Porción grande de tequeños' }
                ].map((item, index) => (
                  <div key={index} className="bg-white border-2 border-orange-500 p-4 rounded-lg shadow-lg">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-bold text-orange-500 mt-2">{item.name.toUpperCase()}</h4>
                    </div>
                    <p className="text-gray-700 text-sm text-center mb-4">{item.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded transition-colors"
                      >
                        AGREGAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'Alitas' && (
              <div className="space-y-12">
                {/* Alas con Papas */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">ALAS CON PAPAS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Alas x 3 + papas', price: 3, desc: '3 alitas con papas' },
                      { name: 'Alas x 6 + papas', price: 5, desc: '6 alitas con papas' },
                      { name: 'Alas x 12 + papas', price: 9, desc: '12 alitas con papas' },
                      { name: 'Alas x 24 + papas', price: 18, desc: '24 alitas con papas' },
                      { name: 'Alas x 48 + papas + porción de tequeño', price: 35, desc: '48 alitas con papas y tequeños' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-2 border-red-500 p-4 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                          <h4 className="text-lg font-bold text-red-500 mt-2">{item.name.toUpperCase()}</h4>
                        </div>
                        <p className="text-gray-700 text-sm text-center mb-4">{item.desc}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-green-600">${item.price}</span>
                          <button
                            onClick={() => handleWingsClick(item)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded transition-colors"
                          >
                            AGREGAR
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alas Solas */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">ALAS SOLAS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { name: 'Alas x 10 (2 salsas)', price: 7, desc: '10 alitas con 2 salsas a elección' },
                      { name: 'Alas x 20 (4 salsas)', price: 12, desc: '20 alitas con 4 salsas a elección' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-2 border-yellow-500 p-6 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-yellow-600 mt-2">{item.name.toUpperCase()}</h4>
                        </div>
                        <p className="text-gray-700 text-sm text-center mb-4">{item.desc}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-3xl font-bold text-green-600">${item.price}</span>
                          <button
                            onClick={() => handleWingsClick(item)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                          >
                            AGREGAR
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tender */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">TENDER DE POLLO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { name: 'Tender de pollo + papas (M)', price: 4, desc: 'Tender de pollo con papas medianas y 1 salsa a elección' },
                      { name: 'Tender de pollo + papas (G)', price: 7, desc: 'Tender de pollo con papas grandes y 1 salsa a elección' }
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-2 border-blue-500 p-6 rounded-lg shadow-lg">
                        <div className="text-center mb-4">
                          <h4 className="text-xl font-bold text-blue-500 mt-2">{item.name.toUpperCase()}</h4>
                        </div>
                        <p className="text-gray-700 text-sm text-center mb-4">{item.desc}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-3xl font-bold text-green-600">${item.price}</span>
                          <button
                            onClick={() => handleWingsClick(item)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                          >
                            AGREGAR
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'Ensaladas' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'Ensalada césar', price: 4, desc: 'Lechuga, crotinis, queso parmesano, aderezo césar' },
                  { name: 'Ensalada césar con pollo', price: 6, desc: 'Ensalada césar con pechuga de pollo a la plancha' }
                ].map((item, index) => (
                  <div key={index} className="bg-white border-2 border-green-500 p-6 rounded-lg shadow-lg">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-green-500 mt-2">{item.name.toUpperCase()}</h3>
                    </div>
                    <p className="text-gray-700 text-sm text-center mb-4">{item.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-green-600">${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                      >
                        AGREGAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'Hamburguesas' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Hamburguesa Clásica', price: 8, desc: 'Carne, lechuga, tomate, queso' },
                  { name: 'Hamburguesa BBQ', price: 10, desc: 'Carne, salsa BBQ, cebolla, queso' },
                  { name: 'Hamburguesa Picante', price: 12, desc: 'Carne, jalapeños, salsa picante' }
                ].map((item, index) => (
                  <div key={index} className="bg-white border-2 border-red-500 p-6 rounded-lg shadow-lg">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-red-500 mt-2">{item.name.toUpperCase()}</h3>
                    </div>
                    <p className="text-gray-700 text-sm text-center mb-4">{item.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                      >
                        AGREGAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'Perros' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Perro Sencillo', price: 5, desc: 'Salchicha, pan, salsas básicas' },
                  { name: 'Perro Especial', price: 7, desc: 'Salchicha, queso, tocineta, salsas' },
                  { name: 'Perro Supremo', price: 9, desc: 'Salchicha premium, todos los ingredientes' }
                ].map((item, index) => (
                  <div key={index} className="bg-white border-2 border-red-500 p-6 rounded-lg shadow-lg">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-red-500 mt-2">{item.name.toUpperCase()}</h3>
                    </div>
                    <p className="text-gray-700 text-sm text-center mb-4">{item.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">${item.price}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                      >
                        AGREGAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeCategory === 'Salsas' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border-2 border-green-500 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-green-500 mb-6 text-center">SIN PICANTE</h3>
                  <div className="space-y-3">
                    {['BBQ', '3 Quesos', 'Teriyaki', 'Mostaza Miel', 'Salsa Agridulce', 'Jack Daniel\'s', 'Salsa Ranch', 'Honey Garlic'].map((salsa, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded border">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">{salsa}</span>
                          <span className="text-sm text-green-600 font-bold">Disponible</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border-2 border-yellow-500 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-yellow-500 mb-6 text-center">PICANTE SUAVE</h3>
                  <div className="space-y-3">
                    {['Buffalo', 'Chipotle', 'Asiática', 'Honey Garlic Hot'].map((salsa, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded border">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">{salsa}</span>
                          <span className="text-sm text-yellow-600 font-bold">Disponible</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border-2 border-red-500 p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-red-500 mb-6 text-center">PICANTE EXTREMO</h3>
                  <div className="space-y-3">
                    {['Habanero', 'Habanero Piña', 'Buffalo Extremo'].map((salsa, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded border">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">{salsa}</span>
                          <span className="text-sm text-red-600 font-bold">Disponible</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'Bebidas' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">BEBIDAS</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      { name: 'Malta', price: 1 },
                      { name: 'Refresco botella vidrio', price: 1 },
                      { name: 'Refresco plástico 1L', price: 1 },
                      { name: 'Refresco plástico 1.5L', price: 1.5 },
                      { name: 'Refresco plástico 2L', price: 2 },
                      { name: 'Agua', price: 1 },
                      { name: 'Speedmax', price: 1 }
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-2 border-blue-400 p-4 rounded-lg text-center shadow-lg">
                        <h4 className="text-sm font-bold text-blue-500 mb-2">{item.name.toUpperCase()}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-green-600">${item.price}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-blue-400 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded text-sm transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">JUGOS NATURALES</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { name: 'Jugo de piña', price: 1 },
                      { name: 'Jugo de fresa', price: 1 },
                      { name: 'Jugo de parchita', price: 1 },
                      { name: 'Jugo de mora', price: 1 }
                    ].map((item, index) => (
                      <div key={index} className="bg-white border-2 border-purple-400 p-4 rounded-lg text-center shadow-lg">
                        <h4 className="text-sm font-bold text-purple-500 mb-2">{item.name.toUpperCase()}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-green-600">${item.price}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-purple-400 hover:bg-purple-500 text-white font-bold px-3 py-1 rounded text-sm transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'Contacto' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white border-2 border-red-500 p-8 rounded-lg text-center shadow-lg">
                  <h3 className="text-3xl font-bold text-red-500 mb-6">CONTÁCTANOS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                    <div>
                      <h4 className="text-xl font-bold text-red-500 mb-4">INFORMACIÓN</h4>
                      <p className="mb-2">Teléfono: +1 (555) 123-4567</p>
                      <p className="mb-2">Email: info@chickenwings.com</p>
                      <p className="mb-2">Dirección: Calle Principal #123</p>
                      <p>Horario: Lun-Dom: 11AM - 10PM</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-red-500 mb-4">REDES SOCIALES</h4>
                      <p className="mb-2">Facebook: ChickenWingsOficial</p>
                      <p className="mb-2">Instagram: @chickenwings</p>
                      <p className="mb-2">Twitter: @chickenwings</p>
                      <p>WhatsApp: +1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Sauce Selection Modal */}
      {showSauceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-red-500 text-white px-6 py-4 rounded-t-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">SELECCIONA TUS SALSAS</h3>
                <button
                  onClick={() => setShowSauceModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-lg mt-2">{selectedItem?.name}</p>
              <p className="text-sm opacity-90">
                Selecciona {requiredSauces} salsa{requiredSauces > 1 ? 's' : ''} ({selectedSauces.length}/{requiredSauces})
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sin Picante */}
                <div className="border-2 border-green-500 rounded-lg p-4">
                  <h4 className="text-xl font-bold text-green-500 mb-4 text-center">SIN PICANTE</h4>
                  <div className="space-y-2">
                    {sauces.sinPicante.map((sauce, index) => (
                      <button
                        key={index}
                        onClick={() => handleSauceSelect(sauce)}
                        disabled={selectedSauces.length >= requiredSauces && !selectedSauces.includes(sauce)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${selectedSauces.includes(sauce)
                          ? 'bg-green-500 text-white border-green-500 shadow-lg'
                          : selectedSauces.length >= requiredSauces
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-green-200 hover:border-green-500 hover:bg-green-50'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{sauce}</span>
                          {selectedSauces.includes(sauce) && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Picante Suave */}
                <div className="border-2 border-yellow-500 rounded-lg p-4">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4 text-center">PICANTE SUAVE</h4>
                  <div className="space-y-2">
                    {sauces.picanteSuave.map((sauce, index) => (
                      <button
                        key={index}
                        onClick={() => handleSauceSelect(sauce)}
                        disabled={selectedSauces.length >= requiredSauces && !selectedSauces.includes(sauce)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${selectedSauces.includes(sauce)
                          ? 'bg-yellow-500 text-white border-yellow-500 shadow-lg'
                          : selectedSauces.length >= requiredSauces
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-yellow-200 hover:border-yellow-500 hover:bg-yellow-50'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{sauce}</span>
                          {selectedSauces.includes(sauce) && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Picante Extremo */}
                <div className="border-2 border-red-500 rounded-lg p-4">
                  <h4 className="text-xl font-bold text-red-500 mb-4 text-center">PICANTE EXTREMO</h4>
                  <div className="space-y-2">
                    {sauces.picanteExtremo.map((sauce, index) => (
                      <button
                        key={index}
                        onClick={() => handleSauceSelect(sauce)}
                        disabled={selectedSauces.length >= requiredSauces && !selectedSauces.includes(sauce)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${selectedSauces.includes(sauce)
                          ? 'bg-red-500 text-white border-red-500 shadow-lg'
                          : selectedSauces.length >= requiredSauces
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 border-red-200 hover:border-red-500 hover:bg-red-50'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{sauce}</span>
                          {selectedSauces.includes(sauce) && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => setShowSauceModal(false)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
                >
                  CANCELAR
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedSauces.length === 0
                      ? `Selecciona ${requiredSauces} salsa${requiredSauces > 1 ? 's' : ''}`
                      : selectedSauces.length < requiredSauces
                        ? `Selecciona ${requiredSauces - selectedSauces.length} salsa${requiredSauces - selectedSauces.length > 1 ? 's' : ''} más`
                        : '¡Perfecto! Todas las salsas seleccionadas'
                    }
                  </p>
                  <div className="flex space-x-1">
                    {Array.from({ length: requiredSauces }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index < selectedSauces.length ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={confirmAddToCart}
                  disabled={selectedSauces.length !== requiredSauces}
                  className={`px-6 py-3 font-bold rounded-lg transition-colors ${selectedSauces.length === requiredSauces
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  AGREGAR AL CARRITO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-green-500 text-white px-4 py-3 rounded-t-lg sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">DATOS DEL PEDIDO</h3>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm opacity-90 mt-2">
                Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(1)}
              </p>
            </div>

            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); submitOrder(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={orderData.nombre}
                    onChange={(e) => handleOrderFormChange('nombre', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    value={orderData.apellido}
                    onChange={(e) => handleOrderFormChange('apellido', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Ingresa tu apellido"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Número de Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={orderData.telefono}
                    onChange={(e) => handleOrderFormChange('telefono', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Ej: +58 412 123 4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Dirección de Entrega *
                  </label>
                  <textarea
                    value={orderData.direccion}
                    onChange={(e) => handleOrderFormChange('direccion', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                    placeholder="Ingresa tu dirección completa"
                    rows="3"
                    required
                  />
                </div>

                {/* Resumen del pedido */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-700 mb-2">Resumen del Pedido:</h4>
                  <div className="space-y-1 text-sm">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-bold">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-bold">
                    <span>TOTAL:</span>
                    <span className="text-green-600">${cart.reduce((sum, item) => sum + item.price, 0).toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowOrderForm(false)}
                    className="flex-1 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
                  >
                    CANCELAR
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 font-bold rounded-lg transition-colors ${isSubmitting
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'CONFIRMAR PEDIDO'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 ${showAlert ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}>
            <div className={`px-6 py-4 rounded-t-lg ${alertType === 'success' ? 'bg-green-500' :
                alertType === 'error' ? 'bg-red-500' :
                  alertType === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {alertType === 'success' && (
                    <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {alertType === 'error' && (
                    <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {alertType === 'warning' && (
                    <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                  <h3 className="text-lg font-bold text-white">
                    {alertType === 'success' ? '¡Éxito!' :
                      alertType === 'error' ? 'Error' :
                        alertType === 'warning' ? 'Atención' : 'Información'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowAlert(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                {alertMessage}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAlert(false)}
                  className={`px-6 py-3 font-bold rounded-lg transition-colors ${alertType === 'success' ? 'bg-green-500 hover:bg-green-600' :
                      alertType === 'error' ? 'bg-red-500 hover:bg-red-600' :
                        alertType === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                >
                  ENTENDIDO
                </button>
              </div>
            </div>

            {/* Progress bar for auto-close */}
            <div className="h-1 bg-gray-200 rounded-b-lg overflow-hidden">
              <div
                className={`h-full ${alertType === 'success' ? 'bg-green-300' :
                    alertType === 'error' ? 'bg-red-300' :
                      alertType === 'warning' ? 'bg-yellow-300' : 'bg-blue-300'
                  } animate-pulse`}
                style={{
                  animation: 'shrink 4s linear forwards'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 border-4 border-white"
        >
          <div className="relative">
            {/* Shopping Cart Icon */}
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>

            {/* Badge with item count */}
            {cart.length > 0 && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-400 text-red-700 text-xs font-black rounded-full w-7 h-7 flex items-center justify-center animate-pulse shadow-lg border-2 border-white">
                <span className="text-xs font-extrabold">
                  {cart.length > 99 ? '99+' : cart.length}
                </span>
              </div>
            )}

            {/* Pulse animation when items are added */}
            {cart.length > 0 && (
              <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20"></div>
            )}
          </div>
        </button>

        {/* Cart Panel */}
        {isCartOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-white border-2 border-red-500 rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out">
            <div className="bg-red-500 text-white px-4 py-3 font-bold text-lg text-center rounded-t-lg">
              TU PEDIDO
            </div>

            {cart.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
                </svg>
                <p className="font-medium">Tu carrito está vacío</p>
                <p className="text-sm">Agrega algunos productos deliciosos</p>
              </div>
            ) : (
              <>
                <div className="max-h-60 overflow-y-auto p-4 space-y-3">
                  {cart.map((item, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-700 flex-1">{item.name}</span>
                        <span className="text-green-600 font-bold text-lg ml-2">${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-300 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-700">TOTAL:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(1)}
                    </span>
                  </div>
                  <button
                    onClick={handleRealizarPedido}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    REALIZAR PEDIDO
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Agregar estilos CSS para la animación
const style = document.createElement('style')
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`
if (!document.head.querySelector('style[data-alert-styles]')) {
  style.setAttribute('data-alert-styles', 'true')
  document.head.appendChild(style)
}

export default App