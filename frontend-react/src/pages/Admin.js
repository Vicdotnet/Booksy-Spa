import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table, Modal } from 'react-bootstrap';
import { libroService, authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [libros, setLibros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLibro, setEditingLibro] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    categoria: 'novela',
    precio: '',
    icono: '📖',
    imagen: '',
    descripcion: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // verificar si es admin
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user.token || user.rol !== 'ADMIN') {
      navigate('/login');
    } else {
      cargarLibros();
    }
  }, [navigate]);

  // cargar libros
  const cargarLibros = async () => {
    try {
      const response = await libroService.getAll();
      setLibros(response.data);
      setError('');
    } catch (err) {
      const errorMsg = err.response?.data || err.message || 'error al cargar libros';
      setError(`error al cargar libros: ${errorMsg}`);
      console.error('Error completo:', err);
      console.error('Respuesta:', err.response);
    }
  };

  // abrir modal para crear
  const handleNuevo = () => {
    setEditingLibro(null);
    setFormData({
      titulo: '',
      autor: '',
      categoria: 'novela',
      precio: '',
      icono: '📖',
      imagen: '',
      descripcion: ''
    });
    setShowModal(true);
  };

  // abrir modal para editar
  const handleEditar = (libro) => {
    setEditingLibro(libro);
    setFormData({
      titulo: libro.titulo,
      autor: libro.autor,
      categoria: libro.categoria,
      precio: libro.precio,
      icono: libro.icono,
      imagen: libro.imagen || '',
      descripcion: libro.descripcion || ''
    });
    setShowModal(true);
  };

  // manejar cambios en form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // guardar libro (crear o actualizar)
  const handleGuardar = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // convertir precio a numero entero y preparar datos
      const libroData = {
        titulo: formData.titulo,
        autor: formData.autor,
        categoria: formData.categoria,
        precio: parseInt(formData.precio),
        icono: formData.icono || '📖',
        imagen: formData.imagen || null,
        descripcion: formData.descripcion || null
      };

      if (editingLibro) {
        await libroService.update(editingLibro.id, libroData);
        setSuccess('libro actualizado exitosamente');
      } else {
        await libroService.create(libroData);
        setSuccess('libro creado exitosamente');
      }
      
      setShowModal(false);
      cargarLibros();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMsg = err.response?.data || 'error al guardar libro. verifica los datos ingresados';
      setError(errorMsg);
      console.error('Error completo:', err);
      console.error('Respuesta del servidor:', err.response);
    }
  };

  // eliminar libro
  const handleEliminar = async (id) => {
    if (window.confirm('seguro que quieres eliminar este libro?')) {
      try {
        await libroService.delete(id);
        setSuccess('libro eliminado exitosamente');
        cargarLibros();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('error al eliminar libro');
        console.error(err);
      }
    }
  };

  // cerrar sesion
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>panel de administracion</h2>
        <div>
          <span className="me-3">👤 {localStorage.getItem('username')}</span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            cerrar sesion
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <div className="mb-3">
        <Button variant="success" onClick={handleNuevo}>
          + agregar libro
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {libros.map(libro => (
                <tr key={libro.id}>
                  <td>{libro.id}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor}</td>
                  <td>{libro.categoria}</td>
                  <td>${libro.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleEditar(libro)}
                    >
                      editar
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleEliminar(libro.id)}
                    >
                      eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingLibro ? 'editar libro' : 'nuevo libro'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleGuardar}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>titulo</Form.Label>
                  <Form.Control
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>autor</Form.Label>
                  <Form.Control
                    type="text"
                    name="autor"
                    value={formData.autor}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>categoria</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="novela">novela</option>
                    <option value="divulgacion">divulgacion</option>
                    <option value="infantil">infantil</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>icono</Form.Label>
                  <Form.Control
                    type="text"
                    name="icono"
                    value={formData.icono}
                    onChange={handleChange}
                    placeholder="📖"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>url imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                cancelar
              </Button>
              <Button variant="primary" type="submit">
                guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Admin;
