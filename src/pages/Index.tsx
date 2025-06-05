
import React, { useState } from 'react';
import CourseSidebar from '@/components/CourseSidebar';
import LessonModal from '@/components/LessonModal';
import SectionModal from '@/components/SectionModal';
import CourseHeader from '@/components/CourseHeader';
import MainContent from '@/components/MainContent';
import { useCourseData } from '@/hooks/useCourseData';
import { useModalState } from '@/hooks/useModalState';

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
    <div className="min-h-screen bg-gray-100">
      <CourseHeader
        courseTitle="The Ultimate React Course 2025"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        <MainContent currentLesson={currentLesson} />

        {/* Sidebar */}
        <div className="w-96">
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
        </div>
      </div>

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
