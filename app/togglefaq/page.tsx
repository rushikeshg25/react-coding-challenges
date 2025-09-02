'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Page = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <ToggleFAQ
        question="What is React?"
        desc="React is a JavaScript library for building user interfaces."
      />
      <ToggleFAQ
        question="What is Next.js?"
        desc="Next.js is a React framework for building server-side and statically generated applications."
      />
    </div>
  );
};

export default Page;

const ToggleFAQ = ({ question, desc }: { question: string; desc: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-2 border-black p-2 flex flex-col gap-2">
      <div className=" flex flex-row gap-5">
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <ChevronDown /> : <ChevronRight />}
        </button>
        <div>{question}</div>
      </div>
      {isOpen && <div>{desc}</div>}
    </div>
  );
};
