'use client';
import React, { useState } from 'react';

const generateArray = () => {
  const a: number[] = [];
  for (let i = 1; i <= 8; i++) {
    a.push(i, i);
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Page = () => {
  const [array, setArray] = useState<number[]>(generateArray());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const handleClick = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (array[first] === array[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="grid grid-cols-4 gap-2">
        {array.map((num, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-16 h-16 flex items-center justify-center border-2 border-black cursor-pointer text-xl font-bold"
              style={{ background: isFlipped ? '#fff' : '#aaa' }}
            >
              {isFlipped ? num : '?'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
