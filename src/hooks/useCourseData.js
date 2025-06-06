
import { useState } from 'react';

const useCourseData = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Phần 1: Welcome, Welcome, Welcome!",
      lessons: [
        { 
          id: 1, 
          title: "Course Overview & Setup", 
          duration: "5 phút", 
          completed: true,
          content: "<h3>Tổng quan khóa học</h3><p>Trong phần này chúng ta sẽ tìm hiểu...</p>",
          videoUrl: ""
        },
        { 
          id: 2, 
          title: "Setting Up Development Environment", 
          duration: "8 phút", 
          completed: false,
          content: "<h3>Cài đặt môi trường</h3><p>Hướng dẫn cài đặt Node.js, VSCode...</p>",
          videoUrl: ""
        },
      ],
      expanded: true
    },
    {
      id: 2,
      title: "Phần 2: PART 1: REACT FUNDAMENTALS [4 PROJECTS]",
      lessons: [
        { 
          id: 3, 
          title: "What is React?", 
          duration: "12 phút", 
          completed: false,
          content: "<h3>React là gì?</h3><p>React là thư viện JavaScript...</p>",
          videoUrl: ""
        },
        { 
          id: 4, 
          title: "First React Component", 
          duration: "15 phút", 
          completed: false,
          content: "<h3>Component đầu tiên</h3><p>Tạo component Hello World...</p>",
          videoUrl: ""
        },
      ],
      expanded: false
    },
    {
      id: 3,
      title: "Phần 3: A First Look at React",
      lessons: [
        { 
          id: 5, 
          title: "Understanding JSX", 
          duration: "10 phút", 
          completed: false,
          content: "<h3>Hiểu về JSX</h3><p>JSX là cú pháp mở rộng...</p>",
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

  const handleLessonComplete = (lessonId, completed) => {
    setSections(sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson =>
        lesson.id === lessonId
          ? { ...lesson, completed }
          : lesson
      )
    })));
    
    if (currentLesson?.id === lessonId) {
      setCurrentLesson({ ...currentLesson, completed });
    }
  };

  const handleDeleteLesson = (lessonId, sectionId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
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
    if (window.confirm('Bạn có chắc chắn muốn xóa phần này? Tất cả bài học trong phần cũng sẽ bị xóa.')) {
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

  const handleReorderItems = (data, type) => {
    if (type === 'sections') {
      setSections(data);
    } else if (type === 'lessons') {
      const newSections = [...sections];
      newSections[data.sectionIndex] = {
        ...newSections[data.sectionIndex],
        lessons: data.lessons
      };
      setSections(newSections);
    } else if (type === 'move-lesson') {
      const newSections = [...sections];
      newSections[data.sourceSectionIndex] = {
        ...newSections[data.sourceSectionIndex],
        lessons: data.sourceLessons
      };
      newSections[data.destSectionIndex] = {
        ...newSections[data.destSectionIndex],
        lessons: data.destLessons
      };
      setSections(newSections);
    }
  };

  return {
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
  };
};

export default useCourseData;
