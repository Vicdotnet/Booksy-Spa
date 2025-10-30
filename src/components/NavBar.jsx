import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/AppContext';

// barra de navegacion principal
function NavBar(){
    // traemos el contador y la variable de vacio del context
    const { cartCount, isCartEmpty } = useCart();
    
    return (
        <Navbar bg="light" expand="md" className="mb-3 border-bottom">
        <Container>
            {/* titulo de la app */}
            <Navbar.Brand as={Link} to="/">Booksy SPA</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav className="me-auto">
                {/* links de navegacion */}
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
                <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            </Nav>
            <Nav>
                {/* el carrito de compras */}
                <Nav.Link as={Link} to="/catalogo">
                    🛒 
                    {/* solo muestra badge si no esta vacio */}
                    {!isCartEmpty && <Badge bg="primary" pill>{cartCount}</Badge>}
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavBar;