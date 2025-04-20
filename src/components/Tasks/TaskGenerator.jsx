import React, { useState, useContext } from 'react';
import { generateTasksFromPrompt } from '../../utils/ai';
import { TaskContext } from '../../context/TaskContext';

const TaskGenerator = () => {
  const { addTask, clearAllTasks } = useContext(TaskContext);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const tasks = await generateTasksFromPrompt(input);
      console.log("Parsed Tasks from AI:", tasks);

      const created = tasks.map((task, index) => {
        if (!task.start) {
          console.warn(`Task ${index} is missing 'start':`, task);
          return null;
        }

        const startTime = new Date(task.start);
        if (isNaN(startTime)) {
          console.warn(`Invalid start datetime for task ${index}:`, task.start);
          return null;
        }

        const start = startTime.toTimeString().slice(0, 5); // HH:MM

        return {
          ...task,
          scheduledStart: start,
          completed: false,
        };
      }).filter(Boolean); // Remove null tasks

      console.log("Created Tasks:", created);

      created.forEach(addTask);
    } catch (error) {
      console.error("Task generation failed:", error);
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">AI Task Generator</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g., Plan my tomorrow with 3 tasks starting at 9 AM"
        className="w-full border p-2 rounded mb-2"
      />
      <div className="flex space-x-2">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {loading ? 'Generating...' : 'Generate Tasks'}
        </button>
        <button
          onClick={clearAllTasks}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reset Calendar
        </button>
      </div>
    </div>
  );
};

export default TaskGenerator;
