
import React from 'react';
import { Play, Pause, Volume2, Maximize } from 'lucide-react';

const VideoPlayer = ({ currentLesson }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  if (!currentLesson) {
    return (
      <div className="bg-gray-900 h-96 flex items-center justify-center text-white">
        <div className="text-center">
          <h3 className="text-xl mb-2">Chọn một bài học để bắt đầu</h3>
          <p className="text-gray-400">Hãy chọn bài học từ danh sách bên phải</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900 h-96">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
      
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-6 transition-all duration-300 transform hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-12 h-12 text-white" />
          ) : (
            <Play className="w-12 h-12 text-white ml-2" />
          )}
        </button>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <span className="text-sm">0:16 / {currentLesson.duration}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Volume2 className="w-5 h-5" />
            <Maximize className="w-5 h-5" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-600 h-1 mt-2 rounded">
          <div className="bg-white h-1 rounded" style={{ width: '15%' }}></div>
        </div>
      </div>

      {/* Video Title Overlay */}
      <div className="absolute top-4 left-4 text-white">
        <h2 className="text-lg font-medium">{currentLesson.title}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;
