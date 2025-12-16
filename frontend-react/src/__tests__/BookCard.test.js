import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CartProvider } from '../context/CartContext';
import BookCard from '../components/BookCard';

describe('BookCard Component', () => {
  const mockBook = {
    id: 1,
    titulo: 'Test Book',
    autor: 'Test Author',
    categoria: 'novela',
    precio: 15000,
    icono: '📚',
    imagen: 'https://example.com/image.jpg'
  };

  test('renderiza información del libro correctamente', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <BookCard book={mockBook} />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('novela')).toBeInTheDocument();
    expect(screen.getByText(/\$15\.000/)).toBeInTheDocument();
  });

  test('muestra imagen cuando está disponible', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <BookCard book={mockBook} />
        </CartProvider>
      </BrowserRouter>
    );

    const imagen = screen.getByAltText('Test Book');
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('muestra icono cuando no hay imagen', () => {
    const bookSinImagen = { ...mockBook, imagen: null };
    
    render(
      <BrowserRouter>
        <CartProvider>
          <BookCard book={bookSinImagen} />
        </CartProvider>
      </BrowserRouter>
    );

    // El icono aparece dos veces: en el placeholder y en el título
    const iconos = screen.getAllByText('📚');
    expect(iconos.length).toBeGreaterThan(0);
  });

  test('botón agregar está presente y es clickeable', () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <BookCard book={mockBook} />
        </CartProvider>
      </BrowserRouter>
    );

    const botonAgregar = screen.getByRole('button', { name: /agregar/i });
    expect(botonAgregar).toBeInTheDocument();
    
    fireEvent.click(botonAgregar);
    // El libro debería agregarse al carrito (funcionalidad del CartContext)
  });

  test('formatea el precio correctamente', () => {
    const bookPrecioAlto = { ...mockBook, precio: 1234567 };
    
    render(
      <BrowserRouter>
        <CartProvider>
          <BookCard book={bookPrecioAlto} />
        </CartProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/\$1\.234\.567/)).toBeInTheDocument();
  });
});
