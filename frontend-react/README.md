# ⚛️ Frontend React - Booksy

## Evaluación 2 (30%)

Aplicación React con routing, componentes, Context API y pruebas unitarias.

### Estructura
```
src/
├── App.js                  # Componente principal
├── context/
│   └── CartContext.js      # Estado global
├── components/
│   ├── NavBar.js           # Navegación
│   ├── BookCard.js         # Tarjeta de libro
│   └── ContactForm.js      # Formulario
├── pages/
│   ├── Home.js             # Inicio
│   ├── Catalog.js          # Catálogo
│   └── Contact.js          # Contacto
├── services/
│   └── api.js              # Cliente HTTP
└── __tests__/              # Pruebas unitarias
```

### Instalación
```bash
npm install
```

### Ejecutar
```bash
npm start
```
Abre http://localhost:3000

### Pruebas
```bash
npm test
```
Presiona `a` para ejecutar todas las pruebas.

### Características

#### 3 Páginas Navegables
- ✅ Home (página de inicio)
- ✅ Catalog (catálogo de libros)
- ✅ Contact (formulario de contacto)

#### 3 Componentes Reutilizables
- ✅ NavBar - Barra de navegación con contador
- ✅ BookCard - Tarjeta de libro
- ✅ ContactForm - Formulario validado

#### Context API
**Variables:**
- ✅ `cartCount` - Contador de items en carrito
- ✅ `favorites` - Lista de favoritos

**Funciones:**
- ✅ `addToCart()` - Agregar al carrito
- ✅ `addToFavorites()` - Agregar a favoritos

#### 6 Pruebas Unitarias
**BookCard.test.js:**
- renderiza el nombre del libro
- renderiza el autor
- renderiza el botón agregar

**ContactForm.test.js:**
- muestra error con formulario vacío
- valida formato de email
- muestra mensaje de éxito

### Integración con Backend
- ✅ Consume API REST del backend
- ✅ Axios para peticiones HTTP
- ✅ Interceptor para JWT
- ✅ Manejo de estados loading/error

### Tecnologías
- React 18
- React Router DOM 6
- React Bootstrap
- Axios
- Jest + React Testing Library
