// src/components/DraggableButton.tsx
import React, { useState, useEffect } from "react";

const DraggableButton: React.FC = () => {
  const [position, setPosition] = useState({
    x: window.innerWidth - 100,
    y: window.innerHeight * 0.6,
  });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(true);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDragging(true);
    setRel({
      x: e.pageX - position.x,
      y: e.pageY - position.y,
    });
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.pageX - (rel ? rel.x : 0),
      y: e.pageY - (rel ? rel.y : 0),
    });
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  if (!visible) return null;

  return (
    <div
      style={{
        zIndex: 100,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <button
        className="p-4 bg-blue-500 text-white rounded mr-2"
        onMouseDown={handleMouseDown}
      >
        Drag me
      </button>
      <button
        className="p-2 bg-red-500 text-white rounded"
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

export default DraggableButton;
