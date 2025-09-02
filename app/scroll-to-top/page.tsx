import { useEffect, useRef, useState } from 'react';

const App = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setVisible(!entry.isIntersecting);
      });
    });
    observer.observe(topRef.current!);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="flex flex-col w-screen gap-32">
      <div className="w-full bg-green-500 h-96" ref={topRef}></div>
      <div className="w-full bg-red-500 h-96"></div>
      <div className="w-full bg-blue-500 h-96"></div>
      <div className="w-full bg-amber-500 h-96"></div>
      <div className="w-full bg-neutral-500 h-96"></div>
      <div className="w-full bg-gray-500 h-96"></div>
      <div className="w-full bg-teal-500 h-96"></div>
      <div className="w-full bg-yellow-500 h-96"></div>
      {visible && (
        <button
          className="fixed bottom-2 right-2 size-10 rounded-2xl border-black border bg-blue-950"
          onClick={handleTop}
        ></button>
      )}
    </div>
  );
};

export default App;
