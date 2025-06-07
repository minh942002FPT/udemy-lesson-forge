
import { useState } from 'react';

export const useCourseData = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Phần 3: A First Look at React",
      lessons: [
        { 
          id: 1, 
          title: "Introduction to Part 1", 
          duration: "1 phút", 
          completed: true,
          content: "<h2>Giới thiệu về React</h2><p>React là một thư viện JavaScript...</p>",
          videoUrl: ""
        },
        { 
          id: 2, 
          title: "Useful Resources for Part 1", 
          duration: "1 phút", 
          completed: false,
          content: "<h2>Tài liệu hữu ích</h2><p>Danh sách các tài liệu...</p>",
          videoUrl: ""
        },
      ],
      expanded: true
    },
    {
      id: 2,
      title: "Phần 4: [Optional] Review of Essential JavaScript for React",
      lessons: [
        { 
          id: 3, 
          title: "JavaScript Fundamentals", 
          duration: "15 phút", 
          completed: false,
          content: "<h2>Cơ bản JavaScript</h2><p>Các khái niệm cơ bản...</p>",
          videoUrl: ""
        },
        { 
          id: 4, 
          title: "Modern JavaScript Features", 
          duration: "12 phút", 
          completed: false,
          content: "<h2>Tính năng JS hiện đại</h2><p>ES6, ES7...</p>",
          videoUrl: ""
        },
      ],
      expanded: false
    },
    {
      id: 3,
      title: "Phần 5: Working With Components, Props, and JSX",
      lessons: [
        { 
          id: 5, 
          title: "What are Components?", 
          duration: "8 phút", 
          completed: false,
          content: "<h2>Component là gì?</h2><p>Tìm hiểu về component...</p>",
          videoUrl: ""
        },
        { 
          id: 6, 
          title: "Creating Your First Component", 
          duration: "10 phút", 
          completed: false,
          content: "<h2>Tạo Component đầu tiên</h2><p>Bước đầu tạo component...</p>",
          videoUrl: ""
        },
      ],
      expanded: false
    }
  ]);

  const [currentLesson, setCurrentLesson] = useState(sections[0].lessons[0]);

  const handleSectionToggle = (sectionId) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleDeleteLesson = (lessonId, sectionId) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
      setSections(sections.map(section =>
        section.id === sectionId
          ? { ...section, lessons: section.lessons.filter(l => l.id !== lessonId) }
          : section
      ));
      
      if (currentLesson?.id === lessonId) {
        setCurrentLesson(null);
      }
    }
  };

  const handleSaveLesson = (lessonData, modalMode, currentSectionId, editingLesson) => {
    if (modalMode === 'add' && currentSectionId) {
      const newLesson = {
        id: Date.now(),
        ...lessonData,
        completed: false
      };
      
      setSections(sections.map(section =>
        section.id === currentSectionId
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      ));
    } else if (modalMode === 'edit' && editingLesson) {
      setSections(sections.map(section => ({
        ...section,
        lessons: section.lessons.map(lesson =>
          lesson.id === editingLesson.id
            ? { ...lesson, ...lessonData }
            : lesson
        )
      })));
      
      if (currentLesson?.id === editingLesson.id) {
        setCurrentLesson({ ...currentLesson, ...lessonData });
      }
    }
  };

  const handleDeleteSection = (sectionId) => {
    if (confirm('Bạn có chắc chắn muốn xóa phần này? Tất cả bài học trong phần cũng sẽ bị xóa.')) {
      setSections(sections.filter(section => section.id !== sectionId));
      
      const deletedSection = sections.find(s => s.id === sectionId);
      if (deletedSection && currentLesson && deletedSection.lessons.some(l => l.id === currentLesson.id)) {
        setCurrentLesson(null);
      }
    }
  };

  const handleSaveSection = (title, sectionModalMode, editingSection) => {
    if (sectionModalMode === 'add') {
      const newSection = {
        id: Date.now(),
        title,
        lessons: [],
        expanded: true
      };
      setSections([...sections, newSection]);
    } else if (sectionModalMode === 'edit' && editingSection) {
      setSections(sections.map(section =>
        section.id === editingSection.id
          ? { ...section, title }
          : section
      ));
    }
  };

  const handleReorderItems = (draggedItem, targetItem, type) => {
    if (type === 'section') {
      const draggedIndex = sections.findIndex(s => s.id === draggedItem.id);
      const targetIndex = sections.findIndex(s => s.id === targetItem.id);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newSections = [...sections];
        const [removed] = newSections.splice(draggedIndex, 1);
        newSections.splice(targetIndex, 0, removed);
        setSections(newSections);
      }
    } else if (type === 'lesson') {
      setSections(sections.map(section => {
        const draggedLessonInSection = section.lessons.find(l => l.id === draggedItem.id);
        const targetLessonInSection = section.lessons.find(l => l.id === targetItem.id);
        
        if (draggedLessonInSection && targetLessonInSection) {
          const draggedIndex = section.lessons.findIndex(l => l.id === draggedItem.id);
          const targetIndex = section.lessons.findIndex(l => l.id === targetItem.id);
          
          const newLessons = [...section.lessons];
          const [removed] = newLessons.splice(draggedIndex, 1);
          newLessons.splice(targetIndex, 0, removed);
          
          return { ...section, lessons: newLessons };
        }
        return section;
      }));
    } else if (type === 'lesson-to-section') {
      const sourceSectionId = sections.find(s => 
        s.lessons.some(l => l.id === draggedItem.id)
      )?.id;
      
      if (sourceSectionId && sourceSectionId !== targetItem.id) {
        setSections(sections.map(section => {
          if (section.id === sourceSectionId) {
            return {
              ...section,
              lessons: section.lessons.filter(l => l.id !== draggedItem.id)
            };
          } else if (section.id === targetItem.id) {
            return {
              ...section,
              lessons: [...section.lessons, draggedItem]
            };
          }
          return section;
        }));
      }
    }
  };

  return {
    sections,
    currentLesson,
    handleSectionToggle,
    handleLessonSelect,
    handleDeleteLesson,
    handleSaveLesson,
    handleDeleteSection,
    handleSaveSection,
    handleReorderItems
  };
};
