import { Container, Row, Col } from 'react-bootstrap';
import ClientForm from './components/ClientForm';
import ServiceForm from './components/ServiceForm';
import ServiceTable from './components/ServiceTable';
import ClientTable from './components/ClientTable';

const App = () => {
  return (
    <Container>
      <h1 className="my-4">Gestión de Clientes y Servicios</h1>
      <Row>
        <Col md={6}>
          <h2>Registrar Cliente</h2>
          <ClientForm />
        </Col>
        <Col md={6}>
          <h2>Registrar Servicio</h2>
          <ServiceForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Lista de Servicios</h2>
          <ServiceTable />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Lista de Clientes</h2>
          <ClientTable />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
