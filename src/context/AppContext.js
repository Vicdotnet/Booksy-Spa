import { createContext, useContext, useState } from 'react';

export const AppContext = createContext(null); 

// el provider que envuelve la app
export function AppProvider({ children }){
    const [cartCount, setCartCount] = useState(0);
    const [userName, setUserName] = useState('invitado');
    const addToCart = () => setCartCount(c => c + 1);
    const login = (name) => setUserName(name);
    
    const value = { cartCount, addToCart, userName, login };
    
    // usamos el AppContext que exportamos
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// hook para usar el carrito
export function useCart(){
    const ctx = useContext(AppContext); 
    // por si se nos olvida el provider
    if(!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
    return ctx;
}