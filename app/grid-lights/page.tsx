'use client';

import { useState } from 'react';

const Page = () => {
  const [order, setOrder] = useState<number[]>([]);
  const [reversing, setReversing] = useState(false);
  const clickHandler = (e: MouseEvent, index: number) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    if (newOrder.length === 9) {
      setReversing(true);

      let i = newOrder.length - 1;
      const interval = setInterval(() => {
        setOrder((prev) => prev.slice(0, i));
        i--;
        if (i < 0) {
          clearInterval(interval);
          setReversing(false);
        }
      }, 500);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="size-10 border border-black"
            onClick={(e) => clickHandler(e, idx)}
            style={{
              backgroundColor: order.includes(idx) ? 'green' : 'white',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Page;
