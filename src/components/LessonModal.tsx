
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lesson: Omit<Lesson, 'id' | 'completed'>) => void;
  editingLesson?: Lesson | null;
  mode: 'add' | 'edit';
}

const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingLesson,
  mode
}) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (mode === 'edit' && editingLesson) {
      setTitle(editingLesson.title);
      setDuration(editingLesson.duration);
    } else {
      setTitle('');
      setDuration('');
    }
  }, [mode, editingLesson, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && duration.trim()) {
      onSave({ title: title.trim(), duration: duration.trim() });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {mode === 'add' ? 'Thêm bài học mới' : 'Chỉnh sửa bài học'}
          </h3>
          <Button variant="ghost" onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Tên bài học</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên bài học..."
              required
            />
          </div>

          <div>
            <Label htmlFor="duration">Thời lượng</Label>
            <Input
              id="duration"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="VD: 5 phút"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              {mode === 'add' ? 'Thêm bài học' : 'Cập nhật'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonModal;
