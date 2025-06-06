
import { useState } from 'react';

const useDragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleDragStart = (e, item, type) => {
    setDraggedItem({ item, type });
    e.dataTransfer.effectAllowed = 'move';
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, item, type) => {
    e.preventDefault();
    setDragOverItem({ item, type });
  };

  const handleDragLeave = (e) => {
    // Chỉ reset nếu rời khỏi container chính
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverItem(null);
    }
  };

  const handleDrop = (e, targetItem, targetType, onReorder) => {
    e.preventDefault();
    
    if (!draggedItem || !targetItem) return;

    // Nếu cùng loại và khác item
    if (draggedItem.type === targetType && draggedItem.item.id !== targetItem.id) {
      onReorder(draggedItem.item, targetItem, draggedItem.type);
    }
    
    // Nếu lesson được kéo vào section khác
    if (draggedItem.type === 'lesson' && targetType === 'section') {
      onReorder(draggedItem.item, targetItem, 'lesson-to-section');
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  return {
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop
  };
};

export default useDragAndDrop;
