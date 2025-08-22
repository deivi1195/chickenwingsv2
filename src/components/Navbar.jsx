import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Flame } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { getTotalItems } = useCart()

  const navigation = [
    { name: 'MENÚ', href: '/' },
    { name: 'CONTACTO', href: '/contacto' },
    { name: 'MAPA', href: '/mapa' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-black border-b-4 border-red-600 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-yellow-400" />
            <div className="flex flex-col">
              <span className="text-lg font-black text-yellow-400" style={{textShadow: '2px 2px 0px #000'}}>CHICKEN</span>
              <span className="text-lg font-black text-red-600 -mt-1" style={{textShadow: '2px 2px 0px #000'}}>WINGS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-white cursor-pointer hover:text-yellow-400 transition-colors" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce">
                  {getTotalItems()}
                </span>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-t border-gray-700">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-bold transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-yellow-400'
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar