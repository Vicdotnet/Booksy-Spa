import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Alert, Badge } from 'react-bootstrap';
import { pedidoService, authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user.token) {
      navigate('/login');
      return;
    }
    
    cargarPedidos();
  }, [navigate]);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const response = await pedidoService.misPedidos();
      setPedidos(response.data);
    } catch (err) {
      setError('error al cargar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="my-5">
        <p>cargando pedidos...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">mis pedidos</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {pedidos.length === 0 ? (
        <Alert variant="info">
          aun no has realizado ninguna compra
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Pedido #</th>
                  <th>Fecha</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(pedido => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{new Date(pedido.fecha).toLocaleDateString('es-CL')}</td>
                    <td>{pedido.direccion}</td>
                    <td>{pedido.telefono}</td>
                    <td>${pedido.total.toLocaleString('es-CL')}</td>
                    <td>
                      <Badge bg="success">{pedido.estado}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MisPedidos;
