import { createContext, useContext, useState } from 'react';

// el contexto para el carrito
const CartContext = createContext(null);

// el provider que envuelve la app
export function AppProvider({ children }){
    const [cartCount, setCartCount] = useState(0);
    
    // funcion simple para sumar al carrito
    const addToCart = () => setCartCount(c => c + 1);
    
    return <CartContext.Provider value={{ cartCount, addToCart }}>{children}</CartContext.Provider>;
}

// hook para usar el carrito
export function useCart(){
    const ctx = useContext(CartContext);
    // por si se nos olvida el provider
    if(!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
    return ctx;
}