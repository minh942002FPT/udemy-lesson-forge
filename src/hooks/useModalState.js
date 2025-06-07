
import { useState } from 'react';

export const useModalState = () => {
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [sectionModalMode, setSectionModalMode] = useState('add');
  const [currentSectionId, setCurrentSectionId] = useState(null);

  const handleAddLesson = (sectionId) => {
    setCurrentSectionId(sectionId);
    setModalMode('add');
    setEditingLesson(null);
    setLessonModalOpen(true);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setModalMode('edit');
    setLessonModalOpen(true);
  };

  const handleAddSection = () => {
    setSectionModalMode('add');
    setEditingSection(null);
    setSectionModalOpen(true);
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setSectionModalMode('edit');
    setSectionModalOpen(true);
  };

  return {
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
  };
};
