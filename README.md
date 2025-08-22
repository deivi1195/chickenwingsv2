# 🍗 Chicken Wings Restaurant App

Una aplicación web moderna para un restaurante de alitas construida con **React** y **Tailwind CSS**.

## ✨ Características

- 🛒 **Carrito de compras interactivo** - Agrega y gestiona pedidos
- 📱 **Diseño responsive** - Perfecto en móviles, tablets y desktop
- 🎨 **UI moderna** - Diseño atractivo con gradientes y animaciones
- 🧭 **Navegación SPA** - Navegación fluida entre páginas
- 📋 **Menú completo** - Todas las categorías de alitas y acompañantes
- 📞 **Página de contacto** - Formulario funcional y información de contacto
- 🗺️ **Página de ubicación** - Mapa integrado y zonas de delivery
- 🔥 **Animaciones suaves** - Efectos hover y transiciones

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   - La aplicación estará disponible en `http://localhost:5173`

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **React Router DOM** - Enrutamiento para aplicaciones React
- **Lucide React** - Iconos modernos para React
- **Context API** - Gestión de estado para el carrito

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx      # Barra de navegación
│   ├── MenuItem.jsx    # Tarjeta de producto del menú
│   └── CartSummary.jsx # Resumen del carrito
├── pages/              # Páginas principales
│   ├── Menu.jsx        # Página del menú principal
│   ├── Contact.jsx     # Página de contacto
│   └── Map.jsx         # Página de ubicación y mapa
├── context/            # Contextos de React
│   └── CartContext.jsx # Contexto del carrito de compras
├── data/               # Datos estáticos
│   └── menuData.js     # Información del menú
├── App.jsx             # Componente principal
├── main.jsx           # Punto de entrada
└── index.css          # Estilos globales y Tailwind
```

## 🎨 Características del Diseño

### Colores Principales
- **Primary:** `#ff6b35` (Naranja vibrante)
- **Secondary:** `#f7931e` (Naranja dorado)
- **Accent:** `#ffeb3b` (Amarillo brillante)
- **Success:** `#4caf50` (Verde)
- **Danger:** `#ff1744` (Rojo)

### Responsive Design
- **Mobile First:** Diseñado primero para móviles
- **Breakpoints:** Adaptado para sm, md, lg, xl
- **Menú hamburguesa** en dispositivos móviles
- **Grid adaptativo** para elementos del menú

## 🛒 Funcionalidades del Carrito

- ✅ Agregar productos al carrito
- ✅ Incrementar/decrementar cantidades
- ✅ Eliminar productos individuales
- ✅ Limpiar carrito completo
- ✅ Cálculo automático del total
- ✅ Contador de productos en navbar
- ✅ Persistencia durante la sesión
- ✅ Checkout simulado

## 📱 Páginas Incluidas

### 🏠 Menú Principal (`/`)
- Hero section con branding
- Categorías de productos organizadas
- Carrito lateral sticky
- Sección de salsas disponibles

### 📞 Contacto (`/contacto`)
- Formulario de contacto funcional
- Información de contacto completa
- Enlaces a redes sociales
- Validación de formularios

### 🗺️ Mapa (`/mapa`)
- Mapa de Google Maps embebido
- Información de ubicación
- Zonas de delivery con precios
- Horarios de atención
- Botón para obtener direcciones

## 🔧 Personalización

### Modificar el menú
Edita el archivo `src/data/menuData.js` para agregar, quitar o modificar productos.

### Cambiar colores
Modifica el archivo `tailwind.config.js` en la sección `theme.extend.colors`.

### Agregar nuevas páginas
1. Crea el componente en `src/pages/`
2. Agrega la ruta en `src/App.jsx`
3. Actualiza la navegación en `src/components/Navbar.jsx`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---

¡Disfruta construyendo tu restaurante de alitas! 🍗🔥