import React, { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const BREAK_DURATION = 0.01 * 60;

const PomodoroTimer = () => {
  const { selectedTask, toggleComplete, addTask } = useContext(TaskContext);

  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Set timer when task changes (for initial load)
  useEffect(() => {
    if (selectedTask && !isBreak) {
      const durationInSeconds = selectedTask.duration ? selectedTask.duration * 60 : 25 * 60;
      setSecondsLeft(durationInSeconds);
      setIsRunning(false);
    }
  }, [selectedTask]);

  useEffect(() => {
    let timer = null;

    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            const nextMode = !isBreak;
            const newDuration = nextMode
              ? BREAK_DURATION
              : (selectedTask?.duration || 25) * 60;

            setIsBreak(nextMode);
            setSecondsLeft(newDuration);
            setIsRunning(false);

            if (!nextMode && selectedTask) {
              toggleComplete(selectedTask.id);
            }

            return newDuration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isBreak, selectedTask, toggleComplete]);

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!selectedTask) return null;

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">
        {isBreak ? 'Break Time' : 'Focus on:'} {selectedTask.title}
      </h2>
      <div className="text-4xl font-mono text-center mb-4">{formatTime(secondsLeft)}</div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`py-2 px-4 rounded text-white ${
            isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setIsBreak(false);
            const resetDuration = selectedTask?.duration ? selectedTask.duration * 60 : 25 * 60;
            setSecondsLeft(resetDuration);
          }}
          className="py-2 px-4 rounded bg-gray-500 hover:bg-gray-600 text-white"
        >
          Reset
        </button>
        <button
          onClick={() => {
            if (!selectedTask) return;
            const now = new Date();
            const futureTime = new Date(now.getTime() + 30 * 60 * 1000);
            const hours = String(futureTime.getHours()).padStart(2, '0');
            const minutes = String(futureTime.getMinutes()).padStart(2, '0');
            const newTime = `${hours}:${minutes}`;

            const deferredTask = {
              ...selectedTask,
              scheduledStart: newTime,
              completed: false,
            };

            toggleComplete(selectedTask.id);
            setIsRunning(false);
            setIsBreak(false);
            const resetDuration = selectedTask?.duration ? selectedTask.duration * 60 : 25 * 60;
            setSecondsLeft(resetDuration);
            addTask(deferredTask);
            alert(`Task rescheduled to ${newTime}`);
          }}
          className="py-2 px-4 rounded bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Skip & Reschedule
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
