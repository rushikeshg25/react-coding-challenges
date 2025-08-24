'use client';

import { useState } from 'react';

interface ProgressBarT {
  currentValue: number;
  maxValue: number;
}

const MAX_VALUE = 100;
const Page = () => {
  const [currentValue, setCurrentValue] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-5">
      <ProgressBar currentValue={currentValue} maxValue={MAX_VALUE} />
      <div className="flex flex-row gap-2">
        <button
          className="border border-black rounded px-3 py-1"
          onClick={() =>
            setCurrentValue((prev) =>
              prev !== MAX_VALUE ? prev + 10 : MAX_VALUE
            )
          }
        >
          Increment
        </button>
        {currentValue}
        <button
          className="border border-black rounded px-3 py-1"
          onClick={() =>
            setCurrentValue((prev) => (prev !== 0 ? prev - 10 : 0))
          }
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Page;

const ProgressBar = ({ currentValue, maxValue }: ProgressBarT) => {
  return (
    <div>
      <div className="w-96 h-2 bg-neutral-400 rounded-full outline-1 outline-black">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${(currentValue / maxValue) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
