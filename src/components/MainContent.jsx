
import React from 'react';
import VideoPlayer from './VideoPlayer';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';

const MainContent = ({ currentLesson }) => {
  return (
    <div className="flex-grow-1 d-flex flex-column">
      <VideoPlayer currentLesson={currentLesson} />
      
      {/* Video Info and Navigation */}
      <div className="bg-white p-4 border-bottom">
        {currentLesson && (
          <div>
            <h2 className="fs-3 fw-bold mb-2">{currentLesson.title}</h2>
            <p className="text-secondary">
              Thời lượng: {currentLesson.duration} • 
              {currentLesson.completed ? ' Đã hoàn thành' : ' Chưa hoàn thành'}
            </p>
          </div>
        )}
      </div>

      {/* Course Progress and Tabs */}
      <div className="bg-white p-4 flex-grow-1">
        <Tab.Container defaultActiveKey="overview">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="overview" className="text-primary">Tổng quan</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="qa" className="text-secondary">Hỏi đáp</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="notes" className="text-secondary">Ghi chú</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="notifications" className="text-secondary">Thông báo</Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Tab.Content>
            <Tab.Pane eventKey="overview">
              <h3 className="fw-semibold mb-2">Về bài học này</h3>
              {currentLesson?.content ? (
                <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
              ) : (
                <p>
                  Đây là khóa học React toàn diện giúp bạn nắm vững các khái niệm 
                  cơ bản và nâng cao của React, Next.js, Redux và nhiều công nghệ khác.
                </p>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="qa">
              <p>Phần hỏi đáp sẽ được hiển thị ở đây.</p>
            </Tab.Pane>
            <Tab.Pane eventKey="notes">
              <p>Phần ghi chú sẽ được hiển thị ở đây.</p>
            </Tab.Pane>
            <Tab.Pane eventKey="notifications">
              <p>Phần thông báo sẽ được hiển thị ở đây.</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

export default MainContent;
