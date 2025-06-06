
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const LessonModal = ({
  isOpen,
  onClose,
  onSave,
  editingLesson,
  mode
}) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (mode === 'edit' && editingLesson) {
      setTitle(editingLesson.title);
      setDuration(editingLesson.duration);
      setContent(editingLesson.content || '');
      setVideoUrl(editingLesson.videoUrl || '');
    } else {
      setTitle('');
      setDuration('');
      setContent('');
      setVideoUrl('');
      setVideoFile(null);
    }
  }, [mode, editingLesson, isOpen]);

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      // Tạo URL tạm thời cho video preview
      const tempUrl = URL.createObjectURL(file);
      setVideoUrl(tempUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && duration.trim()) {
      onSave({ 
        title: title.trim(), 
        duration: duration.trim(),
        content: content.trim(),
        videoUrl: videoUrl
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'add' ? 'Thêm bài học mới' : 'Chỉnh sửa bài học'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên bài học</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên bài học..."
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Thời lượng</Form.Label>
            <Form.Control
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="VD: 5 phút"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung bài học (HTML)</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài học bằng HTML..."
              rows={6}
              className="font-monospace small"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Video bài học</Form.Label>
            <Form.Control
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Nhập URL video..."
              className="mb-2"
            />
            
            <div className="d-flex align-items-center mb-2">
              <span className="text-secondary small">hoặc</span>
            </div>
            
            <div className="border border-2 border-dashed p-4 text-center">
              <Form.Control
                type="file"
                accept="video/*"
                onChange={handleVideoFileChange}
                className="d-none"
                id="video-file"
              />
              <Form.Label htmlFor="video-file" className="d-flex flex-column align-items-center justify-content-center mb-0" style={{cursor: 'pointer'}}>
                <i className="bi bi-upload fs-3 text-secondary mb-2"></i>
                <span className="text-secondary">
                  {videoFile ? videoFile.name : 'Tải lên file video'}
                </span>
              </Form.Label>
            </div>
          </Form.Group>

          {videoUrl && (
            <Form.Group className="mb-3">
              <Form.Label>Xem trước video</Form.Label>
              <video
                src={videoUrl}
                controls
                className="w-100 bg-light rounded"
                style={{height: "200px"}}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {mode === 'add' ? 'Thêm bài học' : 'Cập nhật'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LessonModal;
