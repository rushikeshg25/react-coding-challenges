'use client';
import { useEffect, useRef, useState } from 'react';

const WORDS = [
  'crane',
  'lodge',
  'piano',
  'frost',
  'glide',
  'thing',
  'quiet',
  'shore',
  'grasp',
  'light',
];

const Page = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [answer, setAnswer] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const inputBoxesRef = useRef<HTMLInputElement[]>([]);
  const [status, setStatus] = useState('');
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  useEffect(() => {
    const newAnswer = WORDS[Math.floor(Math.random() * WORDS.length)];
    setAnswer(newAnswer);
    setStatus('');
  }, []);

  const resetInputs = () => {
    inputBoxesRef.current.forEach((el) => {
      if (el) el.value = '';
    });
    if (inputBoxesRef.current[0]) {
      inputBoxesRef.current[0].focus();
    }
  };

  const keyDownhandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (status) return;
    if (e.key === 'Backspace' && currentWord.length > 0) {
      const newWord = currentWord.slice(0, -1);
      setCurrentWord(newWord);
      const targetIndex = Math.max(0, newWord.length - 1);
      if (inputBoxesRef.current[targetIndex]) {
        inputBoxesRef.current[targetIndex].focus();
      }
    } else if (e.key === 'Enter' && currentWord.length === 5) {
      submitGuess();
    }
  };

  const submitGuess = () => {
    if (currentWord.length !== 5) return;
    const newGuesses = [...guesses, currentWord];
    setGuesses(newGuesses);
    if (currentWord === answer) {
      setStatus('You won! 🎉');
    } else if (newGuesses.length === 6) {
      setStatus(`You lost! The word was: ${answer}`);
    } else {
      resetInputs();
      setCurrentWord('');
    }
    setCurrentGuessIndex(currentGuessIndex + 1);
  };

  const onchangehandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (status) return;
    const value = e.target.value.toLowerCase();
    if (!/^[a-z]$/.test(value) && value !== '') return;
    if (
      value !== '' &&
      index === currentWord.length &&
      currentWord.length < 5
    ) {
      const newWord = currentWord + value;
      setCurrentWord(newWord);

      // Move to next input
      if (index < 4) {
        inputBoxesRef.current[index + 1]?.focus();
      }

      // Auto-submit when 5 letters are entered
      if (newWord.length === 5) {
        setTimeout(submitGuess, 100);
      }
    }
  };

  const restartGame = () => {
    setGuesses([]);
    setCurrentWord('');
    setCurrentGuessIndex(0);
    setStatus('');
    resetInputs();
    const ans = WORDS[Math.floor(Math.random() * WORDS.length)];
    setAnswer(ans);
    setTimeout(resetInputs, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-2">
      <h1 className="text-2xl font-bold bg0">Wordle</h1>
      {guesses.map((guess, index) => {
        return <PrevGuesses word={guess} key={index} answer={answer} />;
      })}
      <div className="flex flex-row gap-2">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <input
              type="text"
              maxLength={1}
              className=" text-center h-10 w-10 border border-black flex items-center justify-center text-2xl"
              style={{
                backgroundColor: status === 'You won!' ? 'green' : '',
              }}
              key={index}
              ref={(el) => {
                if (el) {
                  inputBoxesRef.current[index] = el;
                }
              }}
              onChange={(e) => onchangehandler(e, index)}
              onKeyDown={(e) => keyDownhandler(e, index)}
              disabled={guesses.length === 6}
            />
          );
        })}
      </div>

      {status && (
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{status}</h2>
          <button
            onClick={restartGame}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;

const PrevGuesses = ({ word, answer }: { word: string; answer: string }) => {
  return (
    <div className="flex flex-row gap-2">
      {word.split('').map((char, index) => (
        <div
          key={index}
          className="h-12 w-12 border-2 border-gray-400 rounded flex items-center justify-center text-2xl font-bold uppercase"
          style={{
            backgroundColor:
              char === answer[index]
                ? '#22c55e'
                : answer.includes(char)
                ? '#fbbf24'
                : '#9ca3af',

            color:
              char === answer[index] || answer.includes(char)
                ? 'white'
                : 'black',
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
};
