
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CourseHeader = ({
  courseTitle,
  searchTerm,
  onSearchChange
}) => {
  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{courseTitle}</h1>
          <p className="text-sm text-gray-300 mt-1">React, Next.js, Redux & More</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm bài học..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 w-64"
            />
          </div>
          
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            Chia sẻ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
