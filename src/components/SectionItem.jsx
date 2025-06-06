
import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import LessonItem from './LessonItem';

const SectionItem = ({ 
  section, 
  sectionIndex, 
  currentLessonId,
  onSectionToggle,
  onLessonSelect,
  onEditSection,
  onDeleteSection,
  onEditLesson,
  onDeleteLesson,
  onAddLesson
}) => {
  return (
    <Draggable
      key={section.id}
      draggableId={`section-${section.id}`}
      index={sectionIndex}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`mb-3 ${snapshot.isDragging ? 'shadow-lg' : ''}`}
        >
          {/* Section Header */}
          <div
            className={`card border-0 shadow-sm ${snapshot.isDragging ? 'bg-primary bg-opacity-10' : ''}`}
          >
            <div className="card-header bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div {...provided.dragHandleProps} className="me-2">
                    <i className="bi bi-grip-vertical text-white fs-5"></i>
                  </div>
                  <div
                    className="d-flex align-items-center flex-grow-1 text-white"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSectionToggle(section.id)}
                  >
                    {section.expanded ? (
                      <i className="bi bi-chevron-down me-2"></i>
                    ) : (
                      <i className="bi bi-chevron-right me-2"></i>
                    )}
                    <span className="fw-semibold">{section.title}</span>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <Badge bg="light" text="dark" className="me-2">
                    {section.lessons.length} bài
                  </Badge>
                  
                  <div
                    className="btn btn-outline-light btn-sm me-1 p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSection(section);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-pencil"></i>
                  </div>
                  <div
                    className="btn btn-outline-danger btn-sm p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSection(section.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="bi bi-trash"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Lessons */}
            {section.expanded && (
              <div className="card-body p-0">
                <Droppable droppableId={`${sectionIndex}`} type="lesson">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {section.lessons.map((lesson, lessonIndex) => (
                        <LessonItem
                          key={lesson.id}
                          lesson={lesson}
                          lessonIndex={lessonIndex}
                          currentLessonId={currentLessonId}
                          onLessonSelect={onLessonSelect}
                          onEditLesson={onEditLesson}
                          onDeleteLesson={onDeleteLesson}
                          sectionId={section.id}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                
                {/* Add Lesson Button */}
                <div className="p-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onAddLesson(section.id)}
                    className="w-100"
                  >
                    <i className="bi bi-plus me-2"></i>
                    Thêm Bài Học
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SectionItem;
