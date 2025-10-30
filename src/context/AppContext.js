import { createContext, useContext, useState } from 'react';

// el contexto para el carrito
const CartContext = createContext(null);

// el provider que envuelve la app
export function AppProvider({ children }){
    // variable 1: contador del carrito
    const [cartCount, setCartCount] = useState(0);
    
    // variable 2: para saber si esta vacio o no
    const isCartEmpty = cartCount === 0;
    
    // funcion 1: para agregar libros
    const addToCart = () => setCartCount(c => c + 1);
    
    // funcion 2: para resetear el carrito
    const resetCart = () => setCartCount(0);
    
    // esto es lo que se comparte en toda la app
    const value = { 
        cartCount, 
        isCartEmpty, 
        addToCart, 
        resetCart 
    };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// hook para usar el carrito en cualquier componente
export function useCart(){
    const ctx = useContext(CartContext);
    // por si se nos olvida el provider
    if(!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
    return ctx;
}