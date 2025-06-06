
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const AdminSidebarHeader = ({ searchTerm, onSearchChange, onAddSection }) => {
  return (
    <div className="mb-4">
      <h4 className="fw-bold text-primary mb-3">
        <i className="bi bi-gear-fill me-2"></i>
        Admin Panel
      </h4>
      
      {/* Search */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tìm kiếm bài học..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-primary"
        />
      </Form.Group>

      {/* Add Section Button */}
      <Button
        onClick={onAddSection}
        variant="primary"
        size="sm"
        className="w-100 mb-3"
      >
        <i className="bi bi-plus-circle me-2"></i>
        Thêm Section Mới
      </Button>
    </div>
  );
};

export default AdminSidebarHeader;
