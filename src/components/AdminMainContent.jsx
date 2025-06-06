
import React from 'react';
import { Card, Nav, Tab, Button, Badge, Form } from 'react-bootstrap';

const AdminMainContent = ({ currentLesson, onLessonComplete, onLessonUpdate }) => {
  const handleToggleComplete = () => {
    if (currentLesson) {
      onLessonComplete(currentLesson.id, !currentLesson.completed);
    }
  };

  if (!currentLesson) {
    return (
      <div className="d-flex align-items-center justify-content-center h-100 bg-light">
        <Card className="text-center shadow-lg border-0" style={{maxWidth: '500px'}}>
          <Card.Body className="p-5">
            <div className="mb-4">
              <i className="bi bi-mortarboard text-primary" style={{fontSize: '4rem'}}></i>
            </div>
            <h3 className="text-primary fw-bold mb-3">Chào mừng đến Admin Panel</h3>
            <p className="text-secondary mb-4">
              Chọn một bài học từ sidebar để xem chi tiết và quản lý nội dung.
            </p>
            <div className="d-flex justify-content-center">
              <Badge bg="primary" className="px-3 py-2">
                <i className="bi bi-arrow-left me-2"></i>
                Bắt đầu từ sidebar
              </Badge>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-100 d-flex flex-column">
      {/* Video Player Area */}
      <Card className="border-0 shadow-sm">
        <div 
          className="position-relative bg-dark d-flex align-items-center justify-content-center"
          style={{ height: '300px' }}
        >
          {currentLesson.videoUrl ? (
            <video
              src={currentLesson.videoUrl}
              controls
              className="w-100 h-100"
              style={{objectFit: 'cover'}}
            />
          ) : (
            <div className="text-center text-white">
              <i className="bi bi-camera-video fs-1 mb-3"></i>
              <p>Chưa có video cho bài học này</p>
            </div>
          )}
          
          {/* Video Overlay */}
          <div className="position-absolute top-0 start-0 p-3">
            <Badge bg="dark" className="bg-opacity-75">
              <i className="bi bi-play-fill me-1"></i>
              {currentLesson.duration}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Lesson Info */}
      <Card className="border-0 shadow-sm mt-3">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h2 className="fw-bold mb-2">{currentLesson.title}</h2>
              <div className="d-flex align-items-center">
                <Badge 
                  bg={currentLesson.completed ? 'success' : 'secondary'} 
                  className="me-2"
                >
                  {currentLesson.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                </Badge>
                <span className="text-secondary">Thời lượng: {currentLesson.duration}</span>
              </div>
            </div>
            
            <Button
              variant={currentLesson.completed ? 'outline-success' : 'success'}
              onClick={handleToggleComplete}
            >
              <i className={`bi ${currentLesson.completed ? 'bi-check-circle-fill' : 'bi-circle'} me-2`}></i>
              {currentLesson.completed ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Tabs Content */}
      <Card className="border-0 shadow-sm mt-3 flex-grow-1">
        <Card.Body>
          <Tab.Container defaultActiveKey="content">
            <Nav variant="pills" className="mb-4">
              <Nav.Item>
                <Nav.Link eventKey="content" className="fw-semibold">
                  <i className="bi bi-file-text me-2"></i>
                  Nội dung
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings" className="fw-semibold">
                  <i className="bi bi-gear me-2"></i>
                  Cài đặt
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="stats" className="fw-semibold">
                  <i className="bi bi-bar-chart me-2"></i>
                  Thống kê
                </Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Tab.Content>
              <Tab.Pane eventKey="content">
                <div className="border rounded p-4 bg-light">
                  <h5 className="fw-bold mb-3">Nội dung bài học</h5>
                  {currentLesson.content ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: currentLesson.content }} 
                      className="lesson-content"
                    />
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-file-earmark-text text-secondary" style={{fontSize: '3rem'}}></i>
                      <p className="text-secondary mt-3">Chưa có nội dung cho bài học này</p>
                    </div>
                  )}
                </div>
              </Tab.Pane>
              
              <Tab.Pane eventKey="settings">
                <div className="border rounded p-4 bg-light">
                  <h5 className="fw-bold mb-3">Cài đặt bài học</h5>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Cho phép tải xuống</Form.Label>
                    <Form.Check 
                      type="switch"
                      label="Học viên có thể tải video về máy"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Tự động chuyển bài</Form.Label>
                    <Form.Check 
                      type="switch"
                      label="Tự động chuyển sang bài tiếp theo khi hoàn thành"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Yêu cầu hoàn thành</Form.Label>
                    <Form.Check 
                      type="switch"
                      label="Bắt buộc xem hết video mới được chuyển bài"
                    />
                  </Form.Group>
                </div>
              </Tab.Pane>
              
              <Tab.Pane eventKey="stats">
                <div className="border rounded p-4 bg-light">
                  <h5 className="fw-bold mb-3">Thống kê bài học</h5>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <Card className="border-0 bg-primary text-white">
                        <Card.Body className="text-center">
                          <i className="bi bi-eye fs-2 mb-2"></i>
                          <h3 className="fw-bold">1,234</h3>
                          <small>Lượt xem</small>
                        </Card.Body>
                      </Card>
                    </div>
                    
                    <div className="col-md-6">
                      <Card className="border-0 bg-success text-white">
                        <Card.Body className="text-center">
                          <i className="bi bi-check-circle fs-2 mb-2"></i>
                          <h3 className="fw-bold">89%</h3>
                          <small>Tỷ lệ hoàn thành</small>
                        </Card.Body>
                      </Card>
                    </div>
                    
                    <div className="col-md-6">
                      <Card className="border-0 bg-warning text-white">
                        <Card.Body className="text-center">
                          <i className="bi bi-clock fs-2 mb-2"></i>
                          <h3 className="fw-bold">4.5</h3>
                          <small>Thời gian xem trung bình (phút)</small>
                        </Card.Body>
                      </Card>
                    </div>
                    
                    <div className="col-md-6">
                      <Card className="border-0 bg-info text-white">
                        <Card.Body className="text-center">
                          <i className="bi bi-star fs-2 mb-2"></i>
                          <h3 className="fw-bold">4.8</h3>
                          <small>Đánh giá trung bình</small>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminMainContent;
