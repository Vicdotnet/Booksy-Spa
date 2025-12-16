import React from 'react';
import { Container, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* carrusel de imagenes */}
      <Carousel>
        <Carousel.Item>
          <div style={{ 
            height: '400px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <div className="text-center">
              <span style={{ fontSize: '5rem' }}>📚</span>
              <h2>descubre nuevas historias</h2>
              <p>cientos de titulos esperando por ti</p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ 
            height: '400px', 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <div className="text-center">
              <span style={{ fontSize: '5rem' }}>🎯</span>
              <h2>novedades cada semana</h2>
              <p>mantente al dia con los ultimos lanzamientos</p>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ 
            height: '400px', 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <div className="text-center">
              <span style={{ fontSize: '5rem' }}>🚚</span>
              <h2>envios a todo chile</h2>
              <p>recibe tus libros donde estes</p>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

      <div className="hero-section">
        <Container>
          <h1>bienvenidos a booksy</h1>
          <p>tu libreria de barrio favorita ahora en digital</p>
          <p>encuentra novelas contemporaneas, textos de divulgacion y libros infantiles ilustrados</p>
          <Button as={Link} to="/catalogo" variant="light" size="lg" className="mt-3">
            explorar catalogo
          </Button>
        </Container>
      </div>
      
      <Container className="my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div style={{ fontSize: '3rem' }}>📚</div>
              <h3>catalogo variado</h3>
              <p>novelas, divulgacion y libros infantiles</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div style={{ fontSize: '3rem' }}>🚚</div>
              <h3>envio rapido</h3>
              <p>recibe tus libros en la comodidad de tu hogar</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="p-4">
              <div style={{ fontSize: '3rem' }}>💬</div>
              <h3>atencion personalizada</h3>
              <p>consulta por pedidos especiales</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
