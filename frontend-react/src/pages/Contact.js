import React from 'react';
import { Container } from 'react-bootstrap';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <Container className="my-5">
      <h2 className="section-title">contactanos</h2>
      <p className="text-center text-muted mb-4">
        envianos tus consultas o pedidos especiales
      </p>
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ContactForm />
      </div>
    </Container>
  );
};

export default Contact;
