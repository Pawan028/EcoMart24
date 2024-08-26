import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUsers, FaBoxOpen, FaClipboardList, FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate, Outlet } from 'react-router-dom';
import '../../assets/styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container className="admin-dashboard">
      <Row className="welcome-row">
        <Col>
          <h2 className="welcome">Welcome to the Admin Dashboard</h2>
          <p className="welcome-subtext">Manage your application efficiently with the options below.</p>
        </Col>
      </Row>

      <Row className="card-grid">
        <Col md={3}>
          <Card className="admin-card" onClick={() => navigate('/admin/userlist')}>
            <Card.Body>
              <Card.Title><FaUsers /> Users</Card.Title>
              <Card.Text>Manage all users</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="admin-card" onClick={() => navigate('/admin/productlist')}>
            <Card.Body>
              <Card.Title><FaBoxOpen /> Products</Card.Title>
              <Card.Text>Manage products</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="admin-card" onClick={() => navigate('/admin/orderlist')}>
            <Card.Body>
              <Card.Title><FaClipboardList /> Orders</Card.Title>
              <Card.Text>Manage orders</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="admin-card" onClick={() => navigate('/admin/locations')}>
            <Card.Body>
              <Card.Title><FaMapMarkedAlt /> Locations</Card.Title>
              <Card.Text>Manage store locations</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="main-content">
        <Outlet />
      </Row>
    </Container>
  );
};

export default AdminDashboard;
