
import React from 'react';
import { Button, ListGroup, Accordion, Badge, Form } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AdminSidebar = ({
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
  onReorderItems,
  searchTerm,
  onSearchChange
}) => {

  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'section') {
      const newSections = Array.from(sections);
      const [removed] = newSections.splice(source.index, 1);
      newSections.splice(destination.index, 0, removed);
      onReorderItems(newSections, 'sections');
    } else if (type === 'lesson') {
      const sourceSectionIndex = parseInt(source.droppableId);
      const destSectionIndex = parseInt(destination.droppableId);
      
      if (sourceSectionIndex === destSectionIndex) {
        // Same section reorder
        const section = sections[sourceSectionIndex];
        const newLessons = Array.from(section.lessons);
        const [removed] = newLessons.splice(source.index, 1);
        newLessons.splice(destination.index, 0, removed);
        
        onReorderItems({
          sectionIndex: sourceSectionIndex,
          lessons: newLessons
        }, 'lessons');
      } else {
        // Move between sections
        const sourceSection = sections[sourceSectionIndex];
        const destSection = sections[destSectionIndex];
        const sourceLessons = Array.from(sourceSection.lessons);
        const destLessons = Array.from(destSection.lessons);
        const [removed] = sourceLessons.splice(source.index, 1);
        destLessons.splice(destination.index, 0, removed);
        
        onReorderItems({
          sourceSectionIndex,
          destSectionIndex,
          sourceLessons,
          destLessons
        }, 'move-lesson');
      }
    }
  };

  const filteredSections = sections.map(section => ({
    ...section,
    lessons: section.lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.lessons.length > 0 || searchTerm === '');

  return (
    <div className="p-3 h-100">
      {/* Header */}
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

      {/* Sections with Drag & Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredSections.map((section, sectionIndex) => (
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
                                                  onDeleteLesson(lesson.id, section.id);
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
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AdminSidebar;
