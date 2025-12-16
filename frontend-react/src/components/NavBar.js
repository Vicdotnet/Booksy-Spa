import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { authService } from '../services/api';

const NavBar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  // manejar logout
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          📚 booksy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">catalogo</Nav.Link>
            <Nav.Link as={Link} to="/contacto">contacto</Nav.Link>
            <Nav.Link as={Link} to="/carrito">
              🛒 carrito <Badge bg="primary">{cartCount}</Badge>
            </Nav.Link>
            
            {currentUser.token ? (
              <>
                {currentUser.rol === 'ADMIN' && (
                  <Nav.Link as={Link} to="/admin">
                    🔧 admin
                  </Nav.Link>
                )}
                <Nav.Link as={Link} to="/mis-pedidos">
                  📦 mis pedidos
                </Nav.Link>
                <Nav.Link>
                  👤 {currentUser.username}
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout}
                  className="ms-2"
                >
                  salir
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                🔐 login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
