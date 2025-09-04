'use client';
import { useEffect, useState } from 'react';

const shuffleArray = (arr: string[]) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const Page = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'correct' | 'incorrect' | null>(null);

  const resetQuestion = async () => {
    setStatus(null);
    setLoading(true);
    const res = await fetch(
      'https://opentdb.com/api.php?amount=1&type=multiple'
    );
    const data = await res.json();
    console.log(data);
    const questionData = data.results[0];
    const allOptions = [
      ...questionData.incorrect_answers,
      questionData.correct_answer,
    ];

    setQuestion(questionData.question);
    setAnswer(questionData.correct_answer);
    setOptions(shuffleArray(allOptions)); // 👈 Fisher–Yates shuffle
    setLoading(false);
  };

  useEffect(() => {
    resetQuestion();
  }, []);

  const clickHandler = (option: string) => {
    if (option === answer) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl h-screen gap-5">
      <h1>MCQ</h1>
      <div className="text-2xl tracking-tight ">{question}</div>
      <div className="grid grid-cols-2 gap-5">
        {options.map((option, index) => (
          <button
            key={index}
            className={`
              w-full h-12 text-center text-lg font-semibold
              border-2 border-gray-300 rounded-lg
              focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
              disabled:bg-gray-100 disabled:cursor-not-allowed
              transition-colors duration-200
              hover:border-gray-400
            `}
            onClick={() => {
              clickHandler(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <h2>
        {status === 'correct'
          ? 'Correct!'
          : status === 'incorrect'
          ? 'Incorrect'
          : ''}
      </h2>
      <button onClick={resetQuestion}>Reset</button>
    </div>
  );
};

export default Page;
