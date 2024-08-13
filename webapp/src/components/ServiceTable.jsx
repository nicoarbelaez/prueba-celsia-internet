import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import apiClient from './axios/axiosConfig';

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiClient.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleDelete = async (identification, serviceName) => {
    try {
      await apiClient.delete(`/services/${identification}/${serviceName}`);
      setSuccess('Servicio eliminado exitosamente.');
      fetchServices();
    } catch (error) {
      setError('Error al eliminar el servicio.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedService({ ...selectedService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await apiClient.put(`/services/${selectedService.identification}/${selectedService.serviceName}`, selectedService);
      setSuccess('Servicio actualizado exitosamente.');
      setShowModal(false);
      fetchServices();
    } catch (error) {
      setError('Error al actualizar el servicio.');
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
            <th>Nombre del Servicio</th>
            <th>Fecha de Inicio</th>
            <th>Última Fecha de Facturación</th>
            <th>Último Pago</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={`${service.identification}-${service.serviceName}`}>
              <td>{service.identification}</td>
              <td>{service.serviceName}</td>
              <td>{service.startDate}</td>
              <td>{service.lastBillingDate}</td>
              <td>{service.lastPayment}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(service)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(service.identification, service.serviceName)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="identification">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                value={selectedService?.identification || ''}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="serviceName">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                type="text"
                name="serviceName"
                value={selectedService?.serviceName || ''}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={selectedService?.startDate || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastBillingDate">
              <Form.Label>Última Fecha de Facturación</Form.Label>
              <Form.Control
                type="date"
                name="lastBillingDate"
                value={selectedService?.lastBillingDate || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastPayment">
              <Form.Label>Último Pago</Form.Label>
              <Form.Control
                type="number"
                name="lastPayment"
                value={selectedService?.lastPayment || ''}
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

export default ServiceTable;
