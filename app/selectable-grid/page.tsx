'use client';
import { useEffect, useState } from 'react';

interface cell {
  x: number;
  y: number;
  isColoured: boolean;
}

const Page = () => {
  const [mat, setMat] = useState<cell[]>([]);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);
  const handleMousedown = (cell: cell) => {
    setIsDragging(true);
    setStartPos({ x: cell.x, y: cell.y });
  };
  const createMatrix = () => {
    const newMat = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        newMat.push({ x: i, y: j, isColoured: false });
      }
    }
    setMat(newMat);
  };

  const handleMouseEnter = (cell: cell) => {
    if (!startPos || !isDragging) return;
    const endPost = { x: cell.x, y: cell.y };
    const minx = Math.min(startPos.x, endPost.x);
    const miny = Math.min(startPos.y, endPost.y);
    const maxx = Math.max(startPos.x, endPost.x);
    const maxy = Math.max(startPos.y, endPost.y);
    setMat((prev) =>
      prev.map((c) => ({
        ...c,
        isColoured: c.x >= minx && c.x <= maxx && c.y >= miny && c.y <= maxy,
      }))
    );
  };

  useEffect(() => {
    createMatrix();
  }, []);

  const handleMouseup = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
      onMouseUp={handleMouseup}
    >
      {
        <div className="grid grid-cols-10 gap-1">
          {mat.map((cell, idx) => (
            <div
              className="size-10 border border-black"
              style={{
                backgroundColor: cell.isColoured ? 'red' : 'white',
              }}
              key={idx}
              onMouseDown={() => handleMousedown(cell)}
              onMouseEnter={() => handleMouseEnter(cell)}
            ></div>
          ))}
        </div>
      }
    </div>
  );
};

export default Page;
