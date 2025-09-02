'use client';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTimer = () => {
    const total = hours * 60 * 60 + minutes * 60 + seconds;
    if (total > 0) {
      setTimeLeft(total);
      setHasStarted(true);
      setRunning(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (running && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && running) {
      setRunning(false);
      setHasStarted(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running, timeLeft]);

  useEffect(() => {
    if (hasStarted) {
      setHours(Math.floor(timeLeft / 3600));
      setMinutes(Math.floor((timeLeft % 3600) / 60));
      setSeconds(timeLeft % 60);
    }
  }, [timeLeft, hasStarted]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1>Timer</h1>
      <div className="flex flex-row items-center justify-center gap-2">
        <input
          className="w-10 h-10 border-red-300 border-2"
          placeholder="hours"
          type="number"
          value={hours}
          disabled={hasStarted}
          onChange={(e) => setHours(parseInt(e.target.value))}
        />
        <input
          className="w-10 h-10 border-red-300 border-2"
          placeholder="minutes"
          type="number"
          value={minutes}
          disabled={hasStarted}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
        />
        <input
          className="w-10 h-10 border-red-300 border-2"
          placeholder="seconds"
          type="number"
          value={seconds}
          disabled={hasStarted}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
        />
      </div>
      {!hasStarted ? (
        <div>
          <button onClick={startTimer}>Start</button>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          {running ? (
            <button onClick={() => setRunning(false)}>Stop</button>
          ) : (
            <button onClick={() => setRunning(true)}>Resume</button>
          )}
          <button
            onClick={() => {
              setHasStarted(false);
              setRunning(false);
              setHours(0);
              setMinutes(0);
              setSeconds(0);
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
