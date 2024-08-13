import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import apiClient from './axios/axiosConfig';

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await apiClient.get('/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedClient({ ...selectedClient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await apiClient.put(`/clients/${selectedClient.identification}`, selectedClient);
      setSuccess('Cliente actualizado exitosamente.');
      setShowModal(false);
      fetchClients();
    } catch (error) {
      setError('Error al actualizar el cliente.');
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Tipo de Identificación</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.identification}>
              <td>{client.identification}</td>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.idType}</td>
              <td>{client.birthDate}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(client)}>Editar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="identification">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                value={selectedClient?.identification || ''}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={selectedClient?.firstName || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={selectedClient?.lastName || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="idType">
              <Form.Label>Tipo de Identificación</Form.Label>
              <Form.Control
                as="select"
                name="idType"
                value={selectedClient?.idType || ''}
                onChange={handleChange}
              >
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
                value={selectedClient?.birthDate || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={selectedClient?.phoneNumber || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={selectedClient?.email || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientTable;
