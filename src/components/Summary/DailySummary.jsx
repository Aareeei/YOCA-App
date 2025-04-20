import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const DailySummary = () => {
  const { tasks } = useContext(TaskContext);

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const focusScore = total === 0 ? 0 : Math.round((completed / total) * 100);

  const getMessage = () => {
    if (focusScore === 100) return "Outstanding! You nailed every task.";
    if (focusScore >= 80) return "Great work! Almost everything done.";
    if (focusScore >= 50) return "Good effort! Try to tighten your schedule tomorrow.";
    return "You had an off day. Let's rebuild tomorrow!";
  };

  return (
    <div className="bg-white p-4 mt-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Daily Productivity Summary</h2>
      <div className="text-sm">
        <p><strong>Total Tasks:</strong> {total}</p>
        <p><strong>Completed:</strong> {completed}</p>
        <p><strong>Pending/Skipped:</strong> {pending}</p>
        <p><strong>Focus Score:</strong> {focusScore}%</p>
        <p className="mt-2 italic text-gray-600">{getMessage()}</p>
      </div>
    </div>
  );
};

export default DailySummary;
