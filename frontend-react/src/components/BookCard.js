import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <Card className="h-100 shadow-sm">
      {book.imagen ? (
        <Card.Img 
          variant="top" 
          src={book.imagen} 
          alt={book.title || book.titulo}
          style={{ 
            height: '200px', 
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div style={{ 
          height: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '5rem',
          backgroundColor: '#f8f9fa'
        }}>
          {book.icon || book.icono}
        </div>
      )}
      <Card.Body className="text-center">
        <Card.Title>
          <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>
            {book.icon || book.icono}
          </span>
          {book.title || book.titulo}
        </Card.Title>
        <Card.Text className="text-muted fst-italic">
          {book.author || book.autor}
        </Card.Text>
        <span className="badge bg-secondary mb-2">{book.category || book.categoria}</span>
        <Card.Text className="text-success fw-bold fs-4">
          ${(book.price || book.precio).toLocaleString('es-CL')}
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>
          agregar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
