import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import apiClient from './axios/axiosConfig';

const ServiceForm = () => {
  const [service, setService] = useState({
    identification: '',
    serviceName: '',
    startDate: '',
    lastBillingDate: '',
    lastPayment: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones
    if (Object.values(service).some(field => field === '')) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      await apiClient.post('/services', service);
      setSuccess('Servicio registrado exitosamente.');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('El registro ya existe.');
      } else {
        setError('Error al registrar el servicio.');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group controlId="identification">
        <Form.Label>Identificación del Cliente</Form.Label>
        <Form.Control
          type="text"
          name="identification"
          value={service.identification}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="serviceName">
        <Form.Label>Nombre del Servicio</Form.Label>
        <Form.Control
          as="select"
          name="serviceName"
          value={service.serviceName}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>
          <option value="Internet 200 MB">Internet 200 MB</option>
          <option value="Internet 400 MB">Internet 400 MB</option>
          <option value="Internet 600 MB">Internet 600 MB</option>
          <option value="Directv Go">Directv Go</option>
          <option value="Paramount+">Paramount+</option>
          <option value="Win+">Win+</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="startDate">
        <Form.Label>Fecha de Inicio</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={service.startDate}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="lastBillingDate">
        <Form.Label>Última Fecha de Facturación</Form.Label>
        <Form.Control
          type="date"
          name="lastBillingDate"
          value={service.lastBillingDate}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="lastPayment">
        <Form.Label>Último Pago</Form.Label>
        <Form.Control
          type="text"
          name="lastPayment"
          value={service.lastPayment}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Registrar
      </Button>
    </Form>
  );
};

export default ServiceForm;
