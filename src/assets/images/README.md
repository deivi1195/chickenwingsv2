# Estructura de Imágenes Recomendada

## 📁 public/images/ (Imágenes estáticas)
- Fondos de página
- Imágenes grandes (>500KB)
- Imágenes que se referencian dinámicamente
- Favicons y metadatos

## 📁 src/assets/images/ (Imágenes procesadas)
- Logos y iconos pequeños
- Imágenes de productos del menú
- Imágenes que se importan en componentes
- Imágenes que necesitan optimización

## Ejemplo de uso:

### Public (no procesadas):
```jsx
// Fondo de página
<div className="bg-cover" style={{backgroundImage: 'url(/images/hero-bg.jpg)'}} />

// Imagen dinámica
<img src={`/images/products/${productId}.jpg`} />
```

### Assets (procesadas):
```jsx
// Logo importado
import logo from '../assets/images/logo.png'
<img src={logo} alt="Logo" />

// Icono optimizado
import cartIcon from '../assets/icons/cart.svg'
<img src={cartIcon} alt="Carrito" />
```