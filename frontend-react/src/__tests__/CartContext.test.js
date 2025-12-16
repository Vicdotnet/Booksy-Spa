import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '../context/CartContext';

// Componente de prueba para acceder al contexto
const TestComponent = () => {
  const { cartItems, cartTotal, addToCart, removeFromCart, clearCart } = useCart();
  
  const testBook = {
    id: 1,
    titulo: 'Test Book',
    precio: 10000
  };

  return (
    <div>
      <div data-testid="cart-count">{cartItems.length}</div>
      <div data-testid="cart-total">${cartTotal}</div>
      <button onClick={() => addToCart(testBook)}>Agregar</button>
      <button onClick={() => removeFromCart(1)}>Eliminar</button>
      <button onClick={clearCart}>Limpiar</button>
      {cartItems.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.titulo} - Cantidad: {item.quantity}
        </div>
      ))}
    </div>
  );
};

describe('CartContext', () => {
  test('inicia con carrito vacío', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0');
  });

  test('agrega items al carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const botonAgregar = screen.getByText('Agregar');
    fireEvent.click(botonAgregar);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$10000');
    expect(screen.getByText(/Test Book/)).toBeInTheDocument();
  });

  test('incrementa cantidad al agregar el mismo item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const botonAgregar = screen.getByText('Agregar');
    fireEvent.click(botonAgregar);
    fireEvent.click(botonAgregar);

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByText(/Cantidad: 2/)).toBeInTheDocument();
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$20000');
  });

  test('elimina items del carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const botonAgregar = screen.getByText('Agregar');
    const botonEliminar = screen.getByText('Eliminar');
    
    fireEvent.click(botonAgregar);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    
    fireEvent.click(botonEliminar);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0');
  });

  test('limpia el carrito completamente', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const botonAgregar = screen.getByText('Agregar');
    const botonLimpiar = screen.getByText('Limpiar');
    
    fireEvent.click(botonAgregar);
    fireEvent.click(botonAgregar);
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    
    fireEvent.click(botonLimpiar);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('$0');
  });

  test('calcula el total correctamente con múltiples items', () => {
    const MultiItemComponent = () => {
      const { cartTotal, addToCart } = useCart();
      
      const book1 = { id: 1, titulo: 'Book 1', precio: 10000 };
      const book2 = { id: 2, titulo: 'Book 2', precio: 15000 };

      return (
        <div>
          <div data-testid="total">${cartTotal}</div>
          <button onClick={() => addToCart(book1)}>Agregar Book 1</button>
          <button onClick={() => addToCart(book2)}>Agregar Book 2</button>
        </div>
      );
    };

    render(
      <CartProvider>
        <MultiItemComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Agregar Book 1'));
    fireEvent.click(screen.getByText('Agregar Book 2'));

    expect(screen.getByTestId('total')).toHaveTextContent('$25000');
  });
});
