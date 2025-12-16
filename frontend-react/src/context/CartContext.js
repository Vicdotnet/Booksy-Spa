import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // estado para items del carrito
  const [cartItems, setCartItems] = useState([]);
  
  // estado para libros favoritos
  const [favorites, setFavorites] = useState([]);

  // funcion para agregar al carrito
  const addToCart = (book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  // funcion para remover del carrito
  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  // funcion para actualizar cantidad
  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === bookId ? { ...item, quantity } : item
        )
      );
    }
  };

  // funcion para limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // contador de items
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // total del carrito
  const cartTotal = cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);

  // funcion para agregar a favoritos
  const addToFavorites = (book) => {
    if (!favorites.find(fav => fav.id === book.id)) {
      setFavorites(prevFavorites => [...prevFavorites, book]);
    }
  };

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    favorites,
    addToFavorites
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
