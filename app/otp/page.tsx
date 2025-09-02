'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <OTPInput onComplete={(otp) => console.log(otp)} />
    </div>
  );
};

export default Page;

type OTPInputProps = {
  onComplete?: (otp: string) => void;
  onOTPChange?: (otp: string) => void;
  className?: string;
  disabled?: boolean;
};

const OTPInput = ({
  className,
  disabled,
  onComplete,
  onOTPChange,
}: OTPInputProps) => {
  const [otp, setOTP] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (disabled) return;
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, [disabled]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOTP = [...otp];
    newOTP[index] = value.slice(-1);
    setOTP(newOTP);

    if (onOTPChange) {
      onOTPChange(newOTP.join(''));
    }

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpString = newOTP.join('');
    if (otpString.length === 4 && onComplete) {
      onComplete(otpString);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('text').replace(/\D/g, '');

    if (pastedValue.length > 0) {
      const newOTP = [...otp];
      const digits = pastedValue.slice(0, 4).split('');
      digits.forEach((digit, index) => {
        if (index < 4) newOTP[index] = digit;
      });
      setOTP(newOTP);
      if (onOTPChange) {
        onOTPChange(newOTP.join(''));
      }
      const nextEmptyIndex = newOTP.findIndex((digit) => digit === '');
      const focusIndex =
        nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(digits.length, 3);
      inputRefs.current[focusIndex]?.focus();

      const otpString = newOTP.join('');
      if (otpString.length === 4 && onComplete) {
        onComplete(otpString);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOTP(newOtp);
        if (onOTPChange) {
          onOTPChange(newOtp.join(''));
        }
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleChange(index, e.target.value)}
          onPaste={handlePaste}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-lg font-semibold
            border-2 border-gray-300 rounded-lg
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors duration-200
            hover:border-gray-400
          `}
        />
      ))}
    </div>
  );
};
