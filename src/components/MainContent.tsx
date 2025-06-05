
import React from 'react';
import VideoPlayer from './VideoPlayer';

const MainContent = ({ currentLesson }) => {
  return (
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
  );
};

export default MainContent;
