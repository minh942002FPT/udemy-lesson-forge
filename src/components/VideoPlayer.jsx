
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const VideoPlayer = ({ currentLesson }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!currentLesson) {
    return (
      <div className="bg-dark d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
        <div className="text-center text-white">
          <h3 className="fs-4 mb-2">Chọn một bài học để bắt đầu</h3>
          <p className="text-secondary">Hãy chọn bài học từ danh sách bên phải</p>
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative bg-dark" style={{ height: '400px' }}>
      {/* Video Background */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-dark"></div>
      
      {/* Play Button Overlay */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center">
        <Button 
          variant="light" 
          className="rounded-circle p-4 opacity-75 hover-opacity-100"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <i className="bi bi-pause-fill fs-1"></i>
          ) : (
            <i className="bi bi-play-fill fs-1"></i>
          )}
        </Button>
      </div>

      {/* Video Controls */}
      <div className="position-absolute bottom-0 start-0 end-0 p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
        <div className="d-flex align-items-center justify-content-between text-white">
          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="text-white p-0" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                <i className="bi bi-pause-fill"></i>
              ) : (
                <i className="bi bi-play-fill"></i>
              )}
            </Button>
            <span className="small">0:16 / {currentLesson.duration}</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-volume-up"></i>
            <i className="bi bi-fullscreen"></i>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2 bg-secondary w-100 rounded" style={{ height: '4px' }}>
          <div className="bg-white rounded" style={{ width: '15%', height: '100%' }}></div>
        </div>
      </div>

      {/* Video Title Overlay */}
      <div className="position-absolute top-0 start-0 p-3 text-white">
        <h2 className="fs-5 fw-medium">{currentLesson.title}</h2>
      </div>
    </div>
  );
};

export default VideoPlayer;
