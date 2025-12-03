# FakeStore - Tienda Online con AngularJS

Aplicación web de e-commerce desarrollada con AngularJS que consume la API de [FakeStore API](https://fakestoreapi.com/) para mostrar y gestionar productos de diferentes categorías.

![FakeStore Preview](https://img.shields.io/badge/Status-Completed-success)
![AngularJS](https://img.shields.io/badge/AngularJS-v1.8.2-red)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v4.6.0-purple)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Tabla de contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Funcionalidades](#-funcionalidades)
- [API Reference](#-api-reference)
- [Créditos](#-créditos)
- [Licencia](#-licencia)

---

## Características

- Interfaz moderna y responsiva con Bootstrap 4
- Consumo de API REST en tiempo real
- Sistema de carrito de compras con localStorage
- Filtrado por categorías y búsqueda por texto
- Diseño responsive para móviles y tablets
- Persistencia de datos con localStorage
- Actualización dinámica sin recargar la página
- Manejo de cantidades de productos
- Validaciones y manejo de errores
- Animaciones y transiciones suaves

---

## Tecnologías utilizadas

### Frontend
- **AngularJS** v1.8.2 - Framework JavaScript
- **HTML5** - Estructura
- **CSS3** - Estilos personalizados
- **Bootstrap 4.6.0** - Framework CSS
- **Font Awesome 5.15.3** - Iconos

### Herramientas
- **jQuery 3.5.1** - Manipulación del DOM
- **FakeStore API** - API REST de productos

---

## Estructura del Proyecto
```
proyecto-fakestore/
│
├── index.html                      # Página principal
│
├── css/
│   └── style.css                   # Estilos personalizados
│
├── js/
│   ├── app.js                      # Módulo principal de AngularJS
│   ├── controllers/
│   │   └── mainController.js      # Controlador principal
│   └── services/
│       └── storeService.js        # Servicio para API y carrito
│
├── imagenes/
│   ├── favicon.png                 # Icono de la aplicación
│   ├── imagen1.png                 # Imagen del slider 1
│   └── imagen2.png                 # Imagen del slider 2
│
└── README.md                       # Este archivo
```

---

## Instalación

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para consumir la API)
- (Opcional) [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para VS Code

### Pasos

1. **Clonar el repositorio**
```bash
   git clone https://github.com/tu-usuario/fakestore-angular.git
   cd fakestore-angular
```

2. **Abrir el proyecto**
   
   **Opción A: Con Live Server**
   - Abrir el proyecto en VS Code
   - Click derecho en `index.html`
   - Seleccionar "Open with Live Server"
   
   **Opción B: Directamente en el navegador**
   - Abrir el archivo `index.html` en el navegador
   - URL: `file:///ruta/al/proyecto/index.html`

3. **Listo**
   La aplicación debería estar funcionando correctamente.

---

## Uso

### Navegar por productos
1. La página carga automáticamente todos los productos disponibles
2. Usa el slider para ver imágenes promocionales
3. Explora los productos en formato de cards con imagen, título y precio

### Filtrar productos
**Por categoría:**
- Selecciona una categoría del menú desplegable
- Los productos se filtran automáticamente
- Se muestra un badge indicando la categoría seleccionada

**Por texto:**
- Escribe en el campo de búsqueda
- Filtra productos por nombre en tiempo real
- Funciona en combinación con el filtro de categoría

### Agregar al carrito
1. Click en "Ver Detalles" de cualquier producto
2. Se abre un modal con información completa
3. Click en "Agregar al Carrito"
4. El total se actualiza automáticamente en el navbar

### Gestionar el carrito
1. Click en el icono del carrito (navbar superior derecha)
2. Se abre el modal del carrito con todos los productos
3. Puedes:
   - ➕ Aumentar cantidad
   - ➖ Disminuir cantidad
   - 🗑️ Eliminar productos
   - 💳 Procesar pago
   - 🧹 Limpiar carrito completo

### Realizar compra
1. Con productos en el carrito, click en "Pagar"
2. Se simula el proceso de pago
3. Aparece mensaje de confirmación
4. El carrito se vacía automáticamente

---

## Funcionalidades

### Sistema de carrito
- Agregar productos al carrito
- Control de cantidades (aumentar/disminuir)
- Eliminar productos individualmente
- Calcular subtotales por producto
- Calcular total general
- Persistencia con localStorage
- Vaciar carrito completo

### Filtros y búsqueda
- Filtro por 4 categorías diferentes
- Búsqueda por texto en tiempo real
- Combinación de ambos filtros
- Actualización dinámica de resultados

### Interfaz de usuario
- Slider automático de imágenes
- Cards de productos con hover effects
- Modales de Bootstrap para detalles y carrito
- Notificaciones elegantes
- Spinners de carga
- Diseño responsivo

### Manejo de datos
- Consumo de API REST
- Manejo de errores de conexión
- Validaciones de entrada
- Estados de carga
- Persistencia local

---

## Referencia API

### Endpoints utilizados

**Obtener todos los productos**
```http
GET https://fakestoreapi.com/products
```
Retorna un array con todos los productos disponibles.

**Obtener productos por categoría**
```http
GET https://fakestoreapi.com/products/category/{categoria}
```
Retorna productos de una categoría específica.

**Obtener todas las categorías**
```http
GET https://fakestoreapi.com/products/categories
```
Retorna un array con los nombres de todas las categorías.

### Estructura de datos

**Producto:**
```javascript
{
  "id": 1,
  "title": "Nombre del producto",
  "price": 109.95,
  "description": "Descripción del producto",
  "category": "electronics",
  "image": "https://...",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

**Item del Carrito:**
```javascript
{
  "id": 1,
  "title": "Nombre del producto",
  "precio": 109.95,
  "image": "https://...",
  "cantidad": 2
}
```
---

##  Arquitectura

### Patrón MVC (Model-View-Controller)

**Model (Servicio)**
```javascript
// storeService.js
// Maneja la lógica de negocio y comunicación con la API
```

**View (HTML)**
```html
<!-- index.html -->
<!-- Presenta los datos al usuario -->
```

**Controller**
```javascript
// mainController.js
// Coordina la interacción entre Model y View
```

### Flujo de datos
```
Usuario Interactúa → Controller → Service → API
                       ↓           ↓
                    $scope ← localStorage
                       ↓
                     View
```

---

## Créditos

- **API:** [FakeStore API](https://fakestoreapi.com/) - API gratuita para e-commerce
- **Framework:** [AngularJS](https://angularjs.org/)
- **UI:** [Bootstrap](https://getbootstrap.com/)
- **Iconos:** [Font Awesome](https://fontawesome.com/)

---

## Licencia

Este proyecto es de **uso exclusivamente educativo** y fue desarrollado como parte de un desafío académico.

**Propósito:** Proyecto universitario - Materia de Desarrollo de Aplicaciones Web de la Universidad Don Bosco
**Restricciones:** No está destinado para uso comercial  
**Recursos externos:** Utiliza la API gratuita de [FakeStore API](https://fakestoreapi.com/) con fines educativos

---

## Proyecto académico

Este proyecto fue desarrollado como parte del Desafío Practico 3 para la materia de Desarrollo de Aplicaciones Web con Software Interpretados en el Cliente.

**Universidad:** Universidad Don Bosco  
**Materia:** Desarrollo de Aplicaciones Web con Software Interpretados en el Cliente
**Ciclo:** 02/2025  
**Docente:** Ing. Emerson Ernesto Torres Rodriguez
**Integrantes del Grupo:**
- FERNANDO ANTONIO LÓPEZ PAZ - LP251570
- MOISÉS DAVID GARCÍA CASCO - GC251462
- GUSTAVO ISMAEL SERRANO RIVERA - SR251873
- JEFREY GERARDO MORENO GOMEZ - MG252234
- ULISES EDUARDO SALAZAR PORTILLO – SP1628888

---

## Recursos adicionales

- [Documentación AngularJS](https://docs.angularjs.org/guide)
- [Bootstrap 4 Docs](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
- [FakeStore API Docs](https://fakestoreapi.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

---
