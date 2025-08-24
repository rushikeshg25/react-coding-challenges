'use client';

import { useState } from 'react';

const DICE = new Map([
  ['1', '/assets/dice/1.png'],
  ['2', '/assets/dice/2.png'],
  ['3', '/assets/dice/3.png'],
  ['4', '/assets/dice/4.png'],
  ['5', '/assets/dice/5.png'],
  ['6', '/assets/dice/6.png'],
]);
const Page = () => {
  const [num, setNum] = useState(1);
  const [dices, setDices] = useState<number[]>([]);
  const handler = () => {
    const newDices = Array(num)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
    setDices(newDices);
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5">
      <div className="flex flex-row gap-2">
        <input
          type="number"
          onChange={(e) => setNum(parseInt(e.target.value))}
          placeholder="Enter a number"
        />
        <button className="border-2 border-black p-1" onClick={handler}>
          Roll
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {dices.map((num, index) => {
          return (
            <img
              src={DICE.get(num.toString())}
              key={index}
              alt={num.toString()}
              className="w-20 h-20"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
