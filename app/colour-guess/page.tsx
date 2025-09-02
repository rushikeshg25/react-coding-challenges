'use client';
import { useEffect, useState } from 'react';

const digits = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

const generateOptions = () => {
  const options: string[] = [];
  let i = 3;
  while (i > 0) {
    let option = '#';
    for (let j = 0; j < 6; j++) {
      option += digits[Math.floor(Math.random() * digits.length)];
    }
    options.push(option);
    i--;
  }
  return options;
};

const Page = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [correctOption, setCorrectOption] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const generateQuestion = () => {
    const newOptions = generateOptions();
    const newCorrectOption =
      newOptions[Math.floor(Math.random() * newOptions.length)];

    setOptions(newOptions);
    setCorrectOption(newCorrectOption);
    setIsCorrect(null);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleClick = (options: string) => {
    if (options === correctOption) {
      setIsCorrect(true);
      setTimeout(() => {
        generateQuestion();
      }, 5000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-5">
      <h1>Guess the Colour</h1>
      <div
        className={`h-40 w-40  rounded-full`}
        style={{ backgroundColor: correctOption }}
      ></div>
      <div className="flex flex-row gap-2">
        {options.map((option, index) => {
          return (
            <button key={index} onClick={() => handleClick(option)}>
              {option}
            </button>
          );
        })}
      </div>
      {isCorrect === null ? (
        <></>
      ) : isCorrect ? (
        <h1 className="text-green-500">Correct!</h1>
      ) : (
        <h1 className="text-red-500">Incorrect</h1>
      )}
    </div>
  );
};

export default Page;
