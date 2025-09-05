'use client';

import { useEffect, useRef, useState } from 'react';

const Page = () => {
  const [cur, setCur] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCur((prev) => prev + 1);
    }, 2000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    startInterval();
    return () => {
      stopInterval();
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-5">
      <h1>{cur}</h1>
      <button
        onClick={() => {
          setCur((prev) => prev + 1);
          startInterval();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Page;
