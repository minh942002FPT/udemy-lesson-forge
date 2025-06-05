
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
        { id: 1, title: "Introduction to Part 1", duration: "1 phút", completed: true },
        { id: 2, title: "Useful Resources for Part 1", duration: "1 phút", completed: false },
      ],
      expanded: true
    },
    {
      id: 2,
      title: "Phần 4: [Optional] Review of Essential JavaScript for React",
      lessons: [
        { id: 3, title: "JavaScript Fundamentals", duration: "15 phút", completed: false },
        { id: 4, title: "Modern JavaScript Features", duration: "12 phút", completed: false },
      ],
      expanded: false
    },
    {
      id: 3,
      title: "Phần 5: Working With Components, Props, and JSX",
      lessons: [
        { id: 5, title: "What are Components?", duration: "8 phút", completed: false },
        { id: 6, title: "Creating Your First Component", duration: "10 phút", completed: false },
      ],
      expanded: false
    }
  ]);

  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(sections[0].lessons[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
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
    setSectionModalOpen(true);
  };

  const handleSaveSection = (title: string) => {
    const newSection: Section = {
      id: Date.now(),
      title,
      lessons: [],
      expanded: true
    };
    setSections([...sections, newSection]);
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
              <p>
                Đây là khóa học React toàn diện giúp bạn nắm vững các khái niệm 
                cơ bản và nâng cao của React, Next.js, Redux và nhiều công nghệ khác.
              </p>
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
      />
    </div>
  );
};

export default Index;
