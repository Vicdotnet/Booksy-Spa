import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import { libroService } from '../services/api';

const Catalog = () => {
  const [booksData, setBooksData] = useState([]);
  const [filter, setFilter] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // cargar libros desde la api
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await libroService.getAll();
        setBooksData(response.data);
        setError(null);
      } catch (err) {
        setError('error al cargar los libros');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = filter === 'todos' 
    ? booksData 
    : booksData.filter(book => book.categoria === filter);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="section-title">nuestro catalogo</h2>
      
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'todos' ? 'active' : ''}`}
          onClick={() => setFilter('todos')}
        >
          todos
        </button>
        <button 
          className={`filter-btn ${filter === 'novela' ? 'active' : ''}`}
          onClick={() => setFilter('novela')}
        >
          novelas
        </button>
        <button 
          className={`filter-btn ${filter === 'divulgacion' ? 'active' : ''}`}
          onClick={() => setFilter('divulgacion')}
        >
          divulgacion
        </button>
        <button 
          className={`filter-btn ${filter === 'infantil' ? 'active' : ''}`}
          onClick={() => setFilter('infantil')}
        >
          infantiles
        </button>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredBooks.map(book => (
          <Col key={book.id}>
            <BookCard book={{...book, title: book.titulo, author: book.autor, category: book.categoria, price: book.precio, icon: book.icono}} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Catalog;
