
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload } from 'lucide-react';

const LessonModal = ({
  isOpen,
  onClose,
  onSave,
  editingLesson,
  mode
}) => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (mode === 'edit' && editingLesson) {
      setTitle(editingLesson.title);
      setDuration(editingLesson.duration);
      setContent(editingLesson.content || '');
      setVideoUrl(editingLesson.videoUrl || '');
    } else {
      setTitle('');
      setDuration('');
      setContent('');
      setVideoUrl('');
      setVideoFile(null);
    }
  }, [mode, editingLesson, isOpen]);

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      // Tạo URL tạm thời cho video preview
      const tempUrl = URL.createObjectURL(file);
      setVideoUrl(tempUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && duration.trim()) {
      onSave({ 
        title: title.trim(), 
        duration: duration.trim(),
        content: content.trim(),
        videoUrl: videoUrl
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
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

          <div>
            <Label htmlFor="content">Nội dung bài học (HTML)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung bài học bằng HTML..."
              rows={6}
              className="font-mono text-sm"
            />
          </div>

          <div>
            <Label htmlFor="video">Video bài học</Label>
            <div className="space-y-2">
              <Input
                id="video-url"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Hoặc nhập URL video..."
              />
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">hoặc</span>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="hidden"
                  id="video-file"
                />
                <label
                  htmlFor="video-file"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    {videoFile ? videoFile.name : 'Tải lên file video'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {videoUrl && (
            <div>
              <Label>Xem trước video</Label>
              <video
                src={videoUrl}
                controls
                className="w-full h-48 bg-gray-100 rounded-lg"
              />
            </div>
          )}

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
