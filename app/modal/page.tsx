'use client';

import { useState } from 'react';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </button>
      {isOpen && <Modal setFn={closeModal} />}
    </div>
  );
};

export default Page;

const Modal = ({ setFn }: { setFn: () => void }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black/40 ">
      <div className="bg-white flex flex-col p-10 h-40 w-40 gap-5">
        <h1>Modal</h1>
        <button onClick={setFn}>Close Modal</button>
      </div>
    </div>
  );
};
