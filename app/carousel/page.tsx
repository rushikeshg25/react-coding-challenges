'use client';

import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  '/assets/dice/1.png',
  '/assets/dice/2.png',
  '/assets/dice/3.png',
  '/assets/dice/4.png',
  '/assets/dice/5.png',
  '/assets/dice/6.png',
];
const n = IMAGES.length;
const Page = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startInterval = () => {
    if (intervalRef.current) {
      stopInterval();
    }
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev === n - 1 ? 0 : prev + 1));
    }, 2000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  useEffect(() => {
    return () => stopInterval();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-5">
      <h1>Carousel</h1>
      <img src={IMAGES[currentImage]} alt={'carousel'} className="w-40 h-40" />
      <div className="flex flex-row gap-2">
        <button
          className="border-2 border-blue-500 rounded-lg p-2"
          onClick={() => {
            startInterval();
            setCurrentImage((prev) => {
              if (prev === 0) {
                return n - 1;
              }
              return prev - 1;
            });
          }}
        >
          Prev
        </button>
        <button
          className="border-2 border-blue-500 rounded-lg p-2"
          onClick={() => {
            startInterval();
            setCurrentImage((prev) => {
              if (prev === n - 1) {
                return 0;
              }
              return prev + 1;
            });
          }}
        >
          Next
        </button>
        <button
          className="border-2 border-blue-500 rounded-lg p-2"
          onClick={startInterval}
        >
          Start
        </button>
        <button
          className="border-2 border-blue-500 rounded-lg p-2"
          onClick={stopInterval}
        >
          Pause
        </button>
      </div>
    </div>
  );
};

export default Page;
