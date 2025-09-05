'use client';

import { useEffect, useRef, useState } from 'react';

const LIMIT = 2000;

const Page = () => {
  const [scrolly, setScrolly] = useState(0);
  const lastUpdated = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() - lastUpdated.current > LIMIT) {
        setScrolly(window.scrollY);
        lastUpdated.current = Date.now();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(scrolly);
  }, [scrolly]);

  return (
    <div className="flex flex-col bg-neutral-400 ">
      <div className="fixed top-1/2 left-1/2">{scrolly}</div>
      <div className="w-screen h-screen bg-neutral-500 flex items-center justify-center"></div>
      <div className="w-screen h-screen bg-neutral-500 flex items-center justify-center"></div>
      <div className="w-screen h-screen bg-neutral-500 flex items-center justify-center"></div>
      <div className="w-screen h-screen bg-neutral-500 flex items-center justify-center"></div>
    </div>
  );
};

export default Page;
