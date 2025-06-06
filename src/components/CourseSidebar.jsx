
import React from 'react';
import { Button, ListGroup, Accordion } from 'react-bootstrap';
import useDragAndDrop from '../hooks/useDragAndDrop';

const CourseSidebar = ({
  sections,
  currentLessonId,
  onLessonSelect,
  onSectionToggle,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onAddSection,
  onEditSection,
  onDeleteSection,
  onReorderItems
}) => {
  const {
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop
  } = useDragAndDrop();

  const isDraggedOver = (item, type) => {
    return dragOverItem && dragOverItem.item.id === item.id && dragOverItem.type === type;
  };

  const isDragging = (item, type) => {
    return draggedItem && draggedItem.item.id === item.id && draggedItem.type === type;
  };

  return (
    <div className="bg-white border-start h-100 overflow-auto">
      {/* Header */}
      <div className="p-3 border-bottom bg-light">
        <h3 className="fw-semibold fs-5 text-dark mb-3">Nội dung khóa học</h3>
        <Button
          onClick={onAddSection}
          variant="outline-secondary"
          size="sm"
          className="w-100"
        >
          <i className="bi bi-plus me-2"></i>
          Thêm phần mới
        </Button>
      </div>

      {/* Course Content */}
      <div className="p-3">
        {sections.map((section) => (
          <div key={section.id} className="mb-3">
            {/* Section Header */}
            <div 
              className={`d-flex align-items-center justify-content-between p-2 rounded ${
                isDraggedOver(section, 'section') ? 'bg-info bg-opacity-25 border border-info' : 'bg-light'
              }`}
              style={{ 
                opacity: isDragging(section, 'section') ? 0.5 : 1,
                cursor: 'grab'
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, section, 'section')}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, section, 'section')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, section, 'section', onReorderItems)}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-grip-vertical me-2 text-secondary"></i>
                <div
                  className="d-flex align-items-center flex-grow-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onSectionToggle(section.id)}
                >
                  {section.expanded ? (
                    <i className="bi bi-chevron-down me-2"></i>
                  ) : (
                    <i className="bi bi-chevron-right me-2"></i>
                  )}
                  <span className="fw-medium text-dark">{section.title}</span>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <span className="small text-secondary me-2">
                  {section.lessons.length} bài học
                </span>
                
                {/* Section Actions */}
                <div className="d-flex">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSection(section);
                    }}
                    className="p-1"
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSection(section.id);
                    }}
                    className="p-1 text-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </div>
            </div>

            {/* Section Lessons */}
            {section.expanded && (
              <div className="mt-2">
                <ListGroup>
                  {section.lessons.map((lesson) => (
                    <ListGroup.Item
                      key={lesson.id}
                      action
                      active={currentLessonId === lesson.id}
                      className={`d-flex align-items-center justify-content-between p-2 ${
                        isDraggedOver(lesson, 'lesson') ? 'bg-info bg-opacity-25' : ''
                      }`}
                      style={{ 
                        opacity: isDragging(lesson, 'lesson') ? 0.5 : 1,
                        cursor: 'grab' 
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, lesson, 'lesson')}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDragEnter={(e) => handleDragEnter(e, lesson, 'lesson')}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, lesson, 'lesson', onReorderItems)}
                      onClick={() => onLessonSelect(lesson)}
                    >
                      <div className="d-flex align-items-center flex-grow-1 min-width-0">
                        <i className="bi bi-grip-vertical me-2 text-secondary"></i>
                        <div>
                          {lesson.completed ? (
                            <span className="badge rounded-pill bg-success me-2"><i className="bi bi-check"></i></span>
                          ) : (
                            <i className="bi bi-play-circle me-2 text-secondary"></i>
                          )}
                        </div>
                        <div className="ms-1 overflow-hidden">
                          <p className="mb-0 text-truncate">
                            {lesson.title}
                          </p>
                          <small className="text-secondary">{lesson.duration}</small>
                        </div>
                      </div>
                      
                      {/* Lesson Actions */}
                      <div className="d-flex align-items-center">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditLesson(lesson);
                          }}
                          className="p-1"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteLesson(lesson.id, section.id);
                          }}
                          className="p-1 text-danger"
                        >
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                
                {/* Add Lesson Button */}
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onAddLesson(section.id)}
                  className="w-100 text-start text-secondary mt-2"
                >
                  <i className="bi bi-plus me-2"></i>
                  Thêm bài học
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
