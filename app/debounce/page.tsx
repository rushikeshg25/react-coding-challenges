'use client';

import { useEffect, useState } from 'react';

const Page = () => {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
      console.log('debouncedInput', debouncedInput);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <div className="w-screen h-screen bg-neutral-500 flex items-center justify-center">
      <input
        type="text"
        onChange={(e) => {
          setInput(e.target.value);
          console.log(e.target.value);
        }}
        value={input}
      />
      {debouncedInput}
    </div>
  );
};

export default Page;
