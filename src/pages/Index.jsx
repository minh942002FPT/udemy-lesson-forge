
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CourseSidebar from '../components/CourseSidebar';
import LessonModal from '../components/LessonModal';
import SectionModal from '../components/SectionModal';
import MainContent from '../components/MainContent';
import useCourseData from '../hooks/useCourseData';
import useModalState from '../hooks/useModalState';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    sections,
    currentLesson,
    handleSectionToggle,
    handleLessonSelect,
    handleDeleteLesson,
    handleSaveLesson,
    handleDeleteSection,
    handleSaveSection,
    handleReorderItems
  } = useCourseData();

  const {
    lessonModalOpen,
    setLessonModalOpen,
    sectionModalOpen,
    setSectionModalOpen,
    editingLesson,
    editingSection,
    modalMode,
    sectionModalMode,
    currentSectionId,
    handleAddLesson,
    handleEditLesson,
    handleAddSection,
    handleEditSection
  } = useModalState();

  const filteredSections = sections.map(section => ({
    ...section,
    lessons: section.lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.lessons.length > 0 || searchTerm === '');

  const onSaveLesson = (lessonData) => {
    handleSaveLesson(lessonData, modalMode, currentSectionId, editingLesson);
  };

  const onSaveSection = (title) => {
    handleSaveSection(title, sectionModalMode, editingSection);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Container fluid className="p-0">
        <Row className="g-0" style={{height: 'calc(100vh - 0px)'}}>
          <Col>
            <MainContent currentLesson={currentLesson} />
          </Col>
          
          {/* Sidebar */}
          <Col xs={4} md={3} lg={3} className="border-start">
            <CourseSidebar
              sections={filteredSections}
              currentLessonId={currentLesson?.id || null}
              onLessonSelect={handleLessonSelect}
              onSectionToggle={handleSectionToggle}
              onAddLesson={handleAddLesson}
              onEditLesson={handleEditLesson}
              onDeleteLesson={handleDeleteLesson}
              onAddSection={handleAddSection}
              onEditSection={handleEditSection}
              onDeleteSection={handleDeleteSection}
              onReorderItems={handleReorderItems}
            />
          </Col>
        </Row>
      </Container>

      {/* Modals */}
      <LessonModal
        isOpen={lessonModalOpen}
        onClose={() => setLessonModalOpen(false)}
        onSave={onSaveLesson}
        editingLesson={editingLesson}
        mode={modalMode}
      />

      <SectionModal
        isOpen={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
        onSave={onSaveSection}
        editingSection={editingSection}
        mode={sectionModalMode}
      />
    </div>
  );
};

export default Index;
