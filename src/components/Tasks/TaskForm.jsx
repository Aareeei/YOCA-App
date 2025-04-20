import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(25);
  const [priority, setPriority] = useState('medium');
  const [start, setStart] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !start) return;

    addTask({
      title,
      duration: Number(duration),
      scheduledStart: start,
      scheduledEnd: '', // We'll calculate this later
      priority,
      pomodoro: false,
    });

    setTitle('');
    setDuration(25);
    setStart('');
    setPriority('medium');
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
