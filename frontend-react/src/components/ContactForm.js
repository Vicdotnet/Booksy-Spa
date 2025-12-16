import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // limpiar error cuando usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'el nombre es obligatorio';
    }

    // validar email
    if (!formData.email.trim()) {
      newErrors.email = 'el correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'el formato del correo no es valido';
    }

    // validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'el mensaje es obligatorio';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // ocultar mensaje de exito despues de 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>correo electronico</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          isInvalid={!!errors.message}
        />
        <Form.Control.Feedback type="invalid">
          {errors.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        enviar mensaje
      </Button>

      {success && (
        <Alert variant="success" className="mt-3">
          gracias por contactarnos! te responderemos pronto
        </Alert>
      )}
    </Form>
  );
};

export default ContactForm;
