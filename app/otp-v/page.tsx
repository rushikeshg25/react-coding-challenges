'use client';
import { useRef, useState } from 'react';

const Page = () => {
  const [otp, setOTP] = useState<string[]>(['', '', '', '']);
  const refs = useRef<HTMLInputElement[]>([]);

  const changeHandler = (val: string, idx: number) => {
    console.log(val, idx);
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOTP(newOtp);
    if (idx < 3) {
      refs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key !== 'Backspace') return;
    e.preventDefault();

    const newOtp = [...otp];

    if (otp[idx]) {
      // If current has a value: clear it AND move focus to previous in the same press
      newOtp[idx] = '';
      setOTP(newOtp);
      if (idx > 0) refs.current[idx - 1]?.focus();
    } else if (idx > 0) {
      // If current is already empty: clear previous and move focus there
      newOtp[idx - 1] = '';
      setOTP(newOtp);
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen w-screen">
      <div className="flex flex-row items-center justify-center gap-4">
        {Array.from({ length: 4 }).map((_, num) => (
          <input
            key={num}
            className="border border-black size-16 rounded-md shadow-md text-center text-xl font-semibold"
            maxLength={1}
            ref={(el) => {
              if (!el) return;
              refs.current[num] = el;
            }}
            onChange={(e) => changeHandler(e.target.value, num)}
            onKeyDown={(e) => handleKeyDown(e, num)}
            value={otp[num]}
          ></input>
        ))}
      </div>
    </div>
  );
};

export default Page;
