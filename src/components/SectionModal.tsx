
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface Section {
  id: number;
  title: string;
  lessons: any[];
  expanded: boolean;
}

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  editingSection?: Section | null;
  mode: 'add' | 'edit';
}

const SectionModal: React.FC<SectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingSection,
  mode
}) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (mode === 'edit' && editingSection) {
      setTitle(editingSection.title);
    } else {
      setTitle('');
    }
  }, [mode, editingSection, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim());
      setTitle('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {mode === 'add' ? 'Thêm phần mới' : 'Chỉnh sửa phần'}
          </h3>
          <Button variant="ghost" onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="section-title">Tên phần</Label>
            <Input
              id="section-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên phần..."
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              {mode === 'add' ? 'Thêm phần' : 'Cập nhật'}
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

export default SectionModal;
