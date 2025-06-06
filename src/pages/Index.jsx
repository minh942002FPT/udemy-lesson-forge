
import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminSidebar from '../components/AdminSidebar';
import AdminMainContent from '../components/AdminMainContent';
import LessonModal from '../components/LessonModal';
import SectionModal from '../components/SectionModal';
import useCourseData from '../hooks/useCourseData';
import useModalState from '../hooks/useModalState';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    sections,
    currentLesson,
    handleSectionToggle,
    handleLessonSelect,
    handleLessonComplete,
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

  const onSaveLesson = (lessonData) => {
    handleSaveLesson(lessonData, modalMode, currentSectionId, editingLesson);
  };

  const onSaveSection = (title) => {
    handleSaveSection(title, sectionModalMode, editingSection);
  };

  return (
    <>
      <AdminLayout
        sidebar={
          <AdminSidebar
            sections={sections}
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
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        }
      >
        <AdminMainContent 
          currentLesson={currentLesson}
          onLessonComplete={handleLessonComplete}
        />
      </AdminLayout>

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
    </>
  );
};

export default Index;
