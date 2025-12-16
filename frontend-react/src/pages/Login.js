import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // manejar cambios en inputs
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // manejar submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(credentials);
      
      if (response.data.token) {
        // guardar datos en localstorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('rol', response.data.rol);
        
        // redirigir segun rol
        if (response.data.rol === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/catalogo');
        }
      } else {
        setError('credenciales invalidas');
      }
    } catch (err) {
      setError('error al iniciar sesion. verifica tus credenciales');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">iniciar sesion</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    placeholder="ingresa tu usuario"
                  />
                  <Form.Text className="text-muted">
                    admin o user
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="ingresa tu contraseña"
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'ingresando...' : 'ingresar'}
                </Button>
              </Form>

              <hr />

              <div className="text-center text-muted">
                <small>
                  <strong>credenciales de prueba:</strong><br />
                  admin / admin123 (administrador)<br />
                  user / user123 (usuario)
                </small>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Login;
