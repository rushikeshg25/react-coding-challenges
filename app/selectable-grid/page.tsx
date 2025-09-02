'use client';
import { useCallback, useRef, useState } from 'react';

interface BoundingBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const Page = () => {
  const [selectedCells, setSelectedCells] = useState<Set<number>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [boundingBox, setBoundingBox] = useState<BoundingBox | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const { clientX, clientY } = event;
    const rect = gridRef.current.getBoundingClientRect();
    const startX = clientX - rect.left;
    const startY = clientY - rect.top;
    setSelectedCells(new Set());
    setIsDragging(true);
    setBoundingBox({
      startX,
      startY,
      endX: startX,
      endY: startY,
    });
  };

  const isCellInBoundingBox = (cellIndex: number, boundingBox: BoundingBox) => {

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !gridRef.current || !boundingBox) return;

      const rect = gridRef.current.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      const newBoundingBox = {
        ...boundingBox,
        endX,
        endY,
      };

      setBoundingBox(newBoundingBox);

      const newSelectedCells = new Set<number>();
      for (let i = 0; i < 100; i++) {
        if (isCellInBoundingBox(i, newBoundingBox)) {
          newSelectedCells.add(i);
        }
      }
      setSelectedCells(newSelectedCells);
    },
    [isDragging, boundingBox]
  );

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-3">
      <h1>Selectable Grid</h1>
      <div
        className="grid grid-cols-10 gap-1"
        ref={gridRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {Array.from(
          {
            length: 100,
          },
          (_, index) => {
            return (
              <div
                key={index}
                className="border border-black  p-4 text-center"
              ></div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Page;
