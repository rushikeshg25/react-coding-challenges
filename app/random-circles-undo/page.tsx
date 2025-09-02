'use client';
import React, { useState } from 'react';

interface pos {
  x: number;
  y: number;
}

const Page = () => {
  const [positions, setPositions] = useState<pos[]>([]);
  const clickListner = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    setPositions([...positions, { x: clientX, y: clientY }]);
  };
  const undoHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setPositions(positions.slice(0, -1));
  };
  return (
    <>
      <div className="w-screen h-screen bg-neutral-500" onClick={clickListner}>
        <button className="w-16 h-10 bg-white fixed z-10" onClick={undoHandler}>
          Undo
        </button>
        {positions.map((pos, index) => {
          return (
            <div
              key={index}
              className="w-10 h-10 bg-blue-500 absolute"
              style={{ left: pos.x, top: pos.y }}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default Page;
