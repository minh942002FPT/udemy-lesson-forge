import React, { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import CourseSidebar from '@/components/CourseSidebar';
import LessonModal from '@/components/LessonModal';
import SectionModal from '@/components/SectionModal';
import CourseHeader from '@/components/CourseHeader';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
}

interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
  expanded: boolean;
}

const Index = () => {
  const [sections, setSections] = useState<Section[]>([
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

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(sections[0].lessons[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [sectionModalMode, setSectionModalMode] = useState<'add' | 'edit'>('add');
  const [currentSectionId, setCurrentSectionId] = useState<number | null>(null);

  const handleSectionToggle = (sectionId: number) => {
    setSections(sections.map(section =>
      section.id === sectionId
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const handleAddLesson = (sectionId: number) => {
    setCurrentSectionId(sectionId);
    setModalMode('add');
    setEditingLesson(null);
    setLessonModalOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setModalMode('edit');
    setLessonModalOpen(true);
  };

  const handleDeleteLesson = (lessonId: number, sectionId: number) => {
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

  const handleSaveLesson = (lessonData: Omit<Lesson, 'id' | 'completed'>) => {
    if (modalMode === 'add' && currentSectionId) {
      const newLesson: Lesson = {
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

  const handleAddSection = () => {
    setSectionModalMode('add');
    setEditingSection(null);
    setSectionModalOpen(true);
  };

  const handleEditSection = (section: Section) => {
    setEditingSection(section);
    setSectionModalMode('edit');
    setSectionModalOpen(true);
  };

  const handleDeleteSection = (sectionId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa phần này? Tất cả bài học trong phần cũng sẽ bị xóa.')) {
      setSections(sections.filter(section => section.id !== sectionId));
      
      // Nếu bài học hiện tại thuộc phần bị xóa, reset current lesson
      const deletedSection = sections.find(s => s.id === sectionId);
      if (deletedSection && currentLesson && deletedSection.lessons.some(l => l.id === currentLesson.id)) {
        setCurrentLesson(null);
      }
    }
  };

  const handleSaveSection = (title: string) => {
    if (sectionModalMode === 'add') {
      const newSection: Section = {
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
      // Sắp xếp lại sections
      const draggedIndex = sections.findIndex(s => s.id === draggedItem.id);
      const targetIndex = sections.findIndex(s => s.id === targetItem.id);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newSections = [...sections];
        const [removed] = newSections.splice(draggedIndex, 1);
        newSections.splice(targetIndex, 0, removed);
        setSections(newSections);
      }
    } else if (type === 'lesson') {
      // Sắp xếp lại lessons trong cùng section
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
      // Di chuyển lesson sang section khác
      const sourceSectionId = sections.find(s => 
        s.lessons.some(l => l.id === draggedItem.id)
      )?.id;
      
      if (sourceSectionId && sourceSectionId !== targetItem.id) {
        setSections(sections.map(section => {
          if (section.id === sourceSectionId) {
            // Xóa lesson khỏi section cũ
            return {
              ...section,
              lessons: section.lessons.filter(l => l.id !== draggedItem.id)
            };
          } else if (section.id === targetItem.id) {
            // Thêm lesson vào section mới
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

  const filteredSections = sections.map(section => ({
    ...section,
    lessons: section.lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.lessons.length > 0 || searchTerm === '');

  return (
    <div className="min-h-screen bg-gray-100">
      <CourseHeader
        courseTitle="The Ultimate React Course 2025"
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <VideoPlayer currentLesson={currentLesson} />
          
          {/* Video Info and Navigation */}
          <div className="bg-white p-6 border-b border-gray-200">
            {currentLesson && (
              <div>
                <h2 className="text-2xl font-bold mb-2">{currentLesson.title}</h2>
                <p className="text-gray-600">
                  Thời lượng: {currentLesson.duration} • 
                  {currentLesson.completed ? ' Đã hoàn thành' : ' Chưa hoàn thành'}
                </p>
              </div>
            )}
          </div>

          {/* Course Progress and Tabs */}
          <div className="bg-white p-6 flex-1">
            <div className="border-b border-gray-200 mb-4">
              <nav className="flex space-x-8">
                <button className="border-b-2 border-purple-600 pb-2 text-purple-600 font-medium">
                  Tổng quan
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">
                  Hỏi đáp
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">
                  Ghi chú
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">
                  Thông báo
                </button>
              </nav>
            </div>

            <div className="text-gray-700">
              <h3 className="font-semibold mb-2">Về bài học này</h3>
              {currentLesson?.content ? (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                />
              ) : (
                <p>
                  Đây là khóa học React toàn diện giúp bạn nắm vững các khái niệm 
                  cơ bản và nâng cao của React, Next.js, Redux và nhiều công nghệ khác.
                </p>
              )}
            </div>
          </div>
        </div>

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
        onSave={handleSaveLesson}
        editingLesson={editingLesson}
        mode={modalMode}
      />

      <SectionModal
        isOpen={sectionModalOpen}
        onClose={() => setSectionModalOpen(false)}
        onSave={handleSaveSection}
        editingSection={editingSection}
        mode={sectionModalMode}
      />
    </div>
  );
};

export default Index;
