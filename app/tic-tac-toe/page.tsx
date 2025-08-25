'use client';
import { useState } from 'react';

const Page = () => {
  const [board, setBoard] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [message, setMessage] = useState('');
  const turnHandler = (index: number) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const winner = checkWinner(newBoard);
    if (winner) {
      setMessage(`${winner} wins`);
    } else if (newBoard.every((cell) => cell !== '')) {
      setMessage('Draw');
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (b: string[]): 'X' | 'O' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, bIndex, c] of lines) {
      if (b[a] && b[a] === b[bIndex] && b[a] === b[c]) {
        return b[a] as 'X' | 'O';
      }
    }
    return null;
  };
  return (
    <div className="w-screen h-screen bg-slate-100 flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 divide-x divide-y">
        {board.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-3xl"
          >
            <button
              className="w-20 h-20 rounded-md bg-slate-300 text-black"
              onClick={() => turnHandler(index)}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
      <h1>{message}</h1>
    </div>
  );
};

export default Page;
