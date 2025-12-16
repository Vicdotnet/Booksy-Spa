import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { pedidoService } from '../services/api';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    direccion: '',
    telefono: ''
  });
  const navigate = useNavigate();

  // manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // manejar finalizacion de compra
  const handleCheckout = () => {
    setShowCheckout(true);
  };

  // manejar confirmacion de pedido
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    
    try {
      // crear objeto pedido
      const pedido = {
        nombreCompleto: formData.nombreCompleto,
        email: formData.email,
        direccion: formData.direccion,
        telefono: formData.telefono,
        total: cartTotal,
        items: JSON.stringify(cartItems.map(item => ({
          titulo: item.titulo,
          cantidad: item.quantity,
          precio: item.precio
        })))
      };

      // guardar pedido en backend
      await pedidoService.crear(pedido);
      
      setOrderComplete(true);
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('error al crear pedido:', error);
      alert('error al procesar el pedido. por favor intenta nuevamente');
    }
  };

  // si el carrito esta vacio
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <Container className="my-5">
        <Alert variant="info">
          <h4>tu carrito esta vacio</h4>
          <p>agrega algunos libros para comenzar tu compra</p>
          <Button variant="primary" onClick={() => navigate('/catalogo')}>
            ir al catalogo
          </Button>
        </Alert>
      </Container>
    );
  }

  // si la orden fue completada
  if (orderComplete) {
    return (
      <Container className="my-5">
        <Alert variant="success">
          <h4>compra exitosa!</h4>
          <p>gracias por tu compra. te redirigiremos al inicio...</p>
        </Alert>
      </Container>
    );
  }

  // formulario de checkout
  if (showCheckout) {
    return (
      <Container className="my-5">
        <h2 className="mb-4">finalizar compra</h2>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Body>
                <h5>datos de envio</h5>
                <Form onSubmit={handleConfirmOrder}>
                  <Form.Group className="mb-3">
                    <Form.Label>nombre completo</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="nombreCompleto"
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      required 
                      placeholder="ingresa tu nombre completo" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>correo electronico</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="tu@email.com" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>direccion</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required 
                      placeholder="calle, numero, comuna" 
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>telefono</Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required 
                      placeholder="+56 9 1234 5678" 
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button variant="secondary" onClick={() => setShowCheckout(false)}>
                      volver al carrito
                    </Button>
                    <Button variant="success" type="submit">
                      confirmar pedido
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>resumen del pedido</h5>
                <hr />
                {cartItems.map(item => (
                  <div key={item.id} className="mb-2">
                    <small>{item.titulo} x{item.quantity}</small>
                    <br />
                    <small className="text-muted">
                      ${(item.precio * item.quantity).toLocaleString('es-CL')}
                    </small>
                  </div>
                ))}
                <hr />
                <h6>Total: ${cartTotal.toLocaleString('es-CL')}</h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // vista del carrito
  return (
    <Container className="my-5">
      <h2 className="mb-4">tu carrito</h2>
      <Row>
        <Col md={8}>
          {cartItems.map(item => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={2} className="text-center">
                    <span style={{ fontSize: '2rem' }}>{item.icono}</span>
                  </Col>
                  <Col xs={4}>
                    <h6>{item.titulo}</h6>
                    <small className="text-muted">{item.autor}</small>
                  </Col>
                  <Col xs={3}>
                    <div className="d-flex align-items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <strong>${(item.precio * item.quantity).toLocaleString('es-CL')}</strong>
                  </Col>
                  <Col xs={1}>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>resumen de compra</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>subtotal:</span>
                <strong>${cartTotal.toLocaleString('es-CL')}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>envio:</span>
                <strong>gratis</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <h6>total:</h6>
                <h6>${cartTotal.toLocaleString('es-CL')}</h6>
              </div>
              <Button variant="success" className="w-100 mb-2" onClick={handleCheckout}>
                finalizar compra
              </Button>
              <Button variant="outline-secondary" className="w-100" onClick={clearCart}>
                vaciar carrito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
