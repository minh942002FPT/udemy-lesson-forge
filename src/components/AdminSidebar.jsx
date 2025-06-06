
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AdminSidebarHeader from './AdminSidebarHeader';
import SectionItem from './SectionItem';

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
      <AdminSidebarHeader 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onAddSection={onAddSection}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredSections.map((section, sectionIndex) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  sectionIndex={sectionIndex}
                  currentLessonId={currentLessonId}
                  onSectionToggle={onSectionToggle}
                  onLessonSelect={onLessonSelect}
                  onEditSection={onEditSection}
                  onDeleteSection={onDeleteSection}
                  onEditLesson={onEditLesson}
                  onDeleteLesson={onDeleteLesson}
                  onAddLesson={onAddLesson}
                />
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
