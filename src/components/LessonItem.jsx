
import React from 'react';
import { Badge } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

const LessonItem = ({ 
  lesson, 
  lessonIndex, 
  currentLessonId, 
  onLessonSelect, 
  onEditLesson, 
  onDeleteLesson,
  sectionId 
}) => {
  return (
    <Draggable
      key={lesson.id}
      draggableId={`lesson-${lesson.id}`}
      index={lessonIndex}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${snapshot.isDragging ? 'bg-info bg-opacity-25' : ''}`}
        >
          <div
            className={`list-group-item list-group-item-action border-0 border-bottom d-flex align-items-center justify-content-between ${currentLessonId === lesson.id ? 'active' : ''}`}
            onClick={() => onLessonSelect(lesson)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center flex-grow-1">
              <div {...provided.dragHandleProps} className="me-2">
                <i className="bi bi-grip-vertical text-secondary"></i>
              </div>
              <div className="me-2">
                {lesson.completed ? (
                  <Badge bg="success" className="rounded-pill">
                    <i className="bi bi-check"></i>
                  </Badge>
                ) : (
                  <i className="bi bi-play-circle text-secondary"></i>
                )}
              </div>
              <div className="flex-grow-1">
                <div className="fw-medium">{lesson.title}</div>
                <small className="text-secondary">{lesson.duration}</small>
              </div>
            </div>
            
            <div className="d-flex align-items-center">
              <div
                className="btn btn-link btn-sm p-1 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditLesson(lesson);
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-pencil"></i>
              </div>
              <div
                className="btn btn-link btn-sm p-1 text-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteLesson(lesson.id, sectionId);
                }}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-trash"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default LessonItem;
