
import React from 'react';
import { ChevronDown, ChevronRight, Play, Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

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

interface CourseSidebarProps {
  sections: Section[];
  currentLessonId: number | null;
  onLessonSelect: (lesson: Lesson) => void;
  onSectionToggle: (sectionId: number) => void;
  onAddLesson: (sectionId: number) => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (lessonId: number, sectionId: number) => void;
  onAddSection: () => void;
  onEditSection: (section: Section) => void;
  onDeleteSection: (sectionId: number) => void;
  onReorderItems: (draggedItem: any, targetItem: any, type: string) => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
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
  onReorderItems
}) => {
  const {
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop
  } = useDragAndDrop();

  const isDraggedOver = (item, type) => {
    return dragOverItem && dragOverItem.item.id === item.id && dragOverItem.type === type;
  };

  const isDragging = (item, type) => {
    return draggedItem && draggedItem.item.id === item.id && draggedItem.type === type;
  };

  return (
    <div className="bg-white border-l border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">Nội dung khóa học</h3>
        <Button
          onClick={onAddSection}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm phần mới
        </Button>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            {/* Section Header */}
            <div 
              className={`group flex items-center justify-between p-3 rounded-lg hover:bg-gray-200 transition-colors ${
                isDraggedOver(section, 'section') ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-100'
              } ${isDragging(section, 'section') ? 'opacity-50' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, section, 'section')}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, section, 'section')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, section, 'section', onReorderItems)}
            >
              <div className="flex items-center">
                <GripVertical className="w-4 h-4 mr-2 text-gray-400 cursor-grab active:cursor-grabbing" />
                <div
                  className="flex items-center flex-1 cursor-pointer"
                  onClick={() => onSectionToggle(section.id)}
                >
                  {section.expanded ? (
                    <ChevronDown className="w-5 h-5 mr-2" />
                  ) : (
                    <ChevronRight className="w-5 h-5 mr-2" />
                  )}
                  <span className="font-medium text-gray-900">{section.title}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {section.lessons.length} bài học
                </span>
                
                {/* Section Actions */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditSection(section);
                    }}
                    className="p-1 h-auto"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSection(section.id);
                    }}
                    className="p-1 h-auto text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Section Lessons */}
            {section.expanded && (
              <div className="mt-2 space-y-1">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                      currentLessonId === lesson.id
                        ? 'bg-purple-50 border-l-4 border-purple-600'
                        : isDraggedOver(lesson, 'lesson') 
                        ? 'bg-blue-50 border-2 border-blue-300' 
                        : 'hover:bg-gray-50'
                    } ${isDragging(lesson, 'lesson') ? 'opacity-50' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lesson, 'lesson')}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDragEnter={(e) => handleDragEnter(e, lesson, 'lesson')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, lesson, 'lesson', onReorderItems)}
                    onClick={() => onLessonSelect(lesson)}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <GripVertical className="w-4 h-4 mr-2 text-gray-400 cursor-grab active:cursor-grabbing flex-shrink-0" />
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        ) : (
                          <Play className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          currentLessonId === lesson.id ? 'text-purple-700' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                    </div>
                    
                    {/* Lesson Actions */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditLesson(lesson);
                        }}
                        className="p-1 h-auto"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteLesson(lesson.id, section.id);
                        }}
                        className="p-1 h-auto text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* Add Lesson Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddLesson(section.id)}
                  className="w-full justify-start text-gray-600 hover:text-gray-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm bài học
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
