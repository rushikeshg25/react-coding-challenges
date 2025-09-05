'use client';

import { useEffect, useState } from 'react';

interface CellT {
  x: number;
  y: number;
  isColoured: boolean;
}

interface PosT {
  x: number;
  y: number;
}

const Page = () => {
  const [startPos, setStartPos] = useState<PosT | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mat, setMat] = useState<CellT[]>([]);
  const generateMatrix = () => {
    const newMat = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        newMat.push({ x: i, y: j, isColoured: false });
      }
    }
    setMat(newMat);
  };
  useEffect(() => {
    generateMatrix();
  }, []);

  const handleMouseDown = (cell: CellT) => {
    setIsDragging(true);
    setStartPos({ x: cell.x, y: cell.y });
  };
  const handleMouseEnter = (cell: CellT) => {
    if (!startPos || !isDragging) return;
    const endPos = { x: cell.x, y: cell.y };
    const minx = Math.min(startPos.x, endPos.x);
    const miny = Math.min(startPos.y, endPos.y);
    const maxx = Math.max(startPos.x, endPos.x);
    const maxy = Math.max(startPos.y, endPos.y);
    setMat((prev) =>
      prev.map((c) => ({
        ...c,
        isColoured: c.x >= minx && c.x <= maxx && c.y >= miny && c.y <= maxy,
      }))
    );
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-screen h-screen"
      onMouseUp={handleMouseUp}
    >
      <div className="grid grid-cols-10 gap-1">
        {mat.map((cell, idx) => (
          <div
            className="size-10 border border-black"
            style={{
              backgroundColor: cell.isColoured ? 'red' : 'white',
            }}
            key={idx}
            onMouseDown={() => handleMouseDown(cell)}
            onMouseEnter={() => handleMouseEnter(cell)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
