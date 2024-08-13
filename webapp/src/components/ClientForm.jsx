import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import apiClient from './axios/axiosConfig';

const ClientForm = () => {
  const [client, setClient] = useState({
    identification: '',
    firstName: '',
    lastName: '',
    idType: '',
    birthDate: '',
    phoneNumber: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones
    if (Object.values(client).some(field => field === '')) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      await apiClient.post('/clients', client);
      setSuccess('Cliente registrado exitosamente.');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('El registro ya existe.');
      } else {
        setError('Error al registrar el cliente.');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group controlId="identification">
        <Form.Label>Identificación</Form.Label>
        <Form.Control
          type="text"
          name="identification"
          value={client.identification}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="firstName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={client.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={client.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="idType">
        <Form.Label>Tipo de Identificación</Form.Label>
        <Form.Control
          as="select"
          name="idType"
          value={client.idType}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>
          <option value="CC">Cédula</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="RC">Registro Civil</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="birthDate">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="birthDate"
          value={client.birthDate}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="text"
          name="phoneNumber"
          value={client.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={client.email}
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

export default ClientForm;
