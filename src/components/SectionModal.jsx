
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SectionModal = ({
  isOpen,
  onClose,
  onSave,
  editingSection,
  mode
}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (mode === 'edit' && editingSection) {
      setTitle(editingSection.title);
    } else {
      setTitle('');
    }
  }, [mode, editingSection, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim());
      setTitle('');
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'add' ? 'Thêm phần mới' : 'Chỉnh sửa phần'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên phần</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên phần..."
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {mode === 'add' ? 'Thêm phần' : 'Cập nhật'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SectionModal;
