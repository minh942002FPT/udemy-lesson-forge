
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AdminLayout = ({ children, sidebar }) => {
  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100 g-0">
        {/* Sidebar */}
        <Col xs={12} md={4} lg={3} className="bg-light border-end">
          <div className="h-100 overflow-auto">
            {sidebar}
          </div>
        </Col>
        
        {/* Main Content */}
        <Col xs={12} md={8} lg={9}>
          <div className="h-100 overflow-auto">
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
