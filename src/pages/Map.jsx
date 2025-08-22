import React from 'react'
import { MapPin, Car, Bus, Bike, Clock, DollarSign, Navigation } from 'lucide-react'

const Map = () => {
  const locationDetails = [
    {
      icon: MapPin,
      title: 'Dirección',
      info: 'Calle Principal #123\nCiudad, Estado 12345',
      color: 'text-primary'
    },
    {
      icon: Car,
      title: 'Estacionamiento',
      info: 'Estacionamiento gratuito disponible',
      color: 'text-secondary'
    },
    {
      icon: Bus,
      title: 'Transporte Público',
      info: 'Parada de autobús a 2 cuadras',
      color: 'text-accent'
    },
    {
      icon: Bike,
      title: 'Delivery',
      info: 'Servicio a domicilio disponible\nRadio de 5km',
      color: 'text-success'
    }
  ]

  const deliveryZones = [
    {
      zone: 'Zona 1',
      area: 'Centro de la ciudad',
      time: '20-30 min',
      cost: 'Gratis',
      color: 'bg-success'
    },
    {
      zone: 'Zona 2',
      area: 'Barrios cercanos',
      time: '30-45 min',
      cost: '$2',
      color: 'bg-secondary'
    },
    {
      zone: 'Zona 3',
      area: 'Áreas metropolitanas',
      time: '45-60 min',
      cost: '$3',
      color: 'bg-primary'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Nuestra Ubicación
          </h1>
          <p className="text-xl text-white/90">
            Encuéntranos fácilmente y disfruta de nuestras deliciosas alitas
          </p>
        </div>
      </section>

      {/* Location Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Location Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-8">
                  Encuéntranos Aquí
                </h2>
                
                <div className="space-y-6">
                  {locationDetails.map((item, index) => (
                    <div key={index} className="card flex items-start space-x-4">
                      <div className={`${item.color} mt-1`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 whitespace-pre-line">
                          {item.info}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Directions Button */}
              <div className="card text-center">
                <a
                  href="https://maps.google.com/?q=Chicken+Wings+Restaurant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2 text-lg"
                >
                  <Navigation className="h-5 w-5" />
                  <span>Obtener Direcciones</span>
                </a>
              </div>
            </div>

            {/* Map Container */}
            <div className="card p-0 overflow-hidden">
              <div className="aspect-w-16 aspect-h-12">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959313176!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Delivery Zones */}
          <div>
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
              Zonas de Delivery
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {deliveryZones.map((zone, index) => (
                <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
                  <div className={`${zone.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {zone.zone}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    {zone.area}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-accent">
                      <Clock className="h-4 w-4" />
                      <span className="font-semibold">{zone.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-2 text-success">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold text-lg">{zone.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-4">
                Información de Delivery
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Pedido mínimo: $10</li>
                <li>• Tiempo estimado puede variar según demanda</li>
                <li>• Aceptamos efectivo y tarjetas</li>
                <li>• Delivery disponible todos los días</li>
                <li>• Seguimiento en tiempo real</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-4">
                Horarios de Atención
              </h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Lunes - Jueves:</span>
                  <span>11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Viernes - Sábado:</span>
                  <span>11:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo:</span>
                  <span>12:00 PM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Map