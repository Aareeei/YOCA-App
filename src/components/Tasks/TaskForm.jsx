import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import Modal from '../UI/Modal';

const TaskForm = () => {
  const { addTask, editTask, deleteTask, selectedTask } = useContext(TaskContext);

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(25);
  const [priority, setPriority] = useState('medium');
  const [start, setStart] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (!isEditModalOpen) {
      setTitle('');
      setDuration(25);
      setPriority('medium');
      setStart('');
    }
  }, [isEditModalOpen]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !start) return;

    addTask({
      id: Date.now(),
      title,
      duration: Number(duration),
      scheduledStart: start,
      scheduledEnd: '',
      priority,
      pomodoro: false,
    });

    setTitle('');
    setDuration(25);
    setPriority('medium');
    setStart('');
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    if (!title || !start || !selectedTask) return;

    editTask({
      ...selectedTask,
      title,
      duration: Number(duration),
      scheduledStart: start,
      priority,
    });

    setEditModalOpen(false);
  };

  const openEdit = () => {
    if (!selectedTask) return;
    setTitle(selectedTask.title || '');
    setDuration(selectedTask.duration || 25);
    setPriority(selectedTask.priority || 'medium');
    setStart(selectedTask.scheduledStart || '');
    setEditModalOpen(true);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleAdd} className="flex flex-col gap-2">
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

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Task
          </button>

          <button
            type="button"
            disabled={!selectedTask}
            onClick={openEdit}
            className={`px-4 py-2 rounded ${
              selectedTask
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Edit Task
          </button>
        </div>
      </form>

      {isEditModalOpen && (
        <Modal>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <form onSubmit={handleEditSave} className="flex flex-col gap-2">
              <input
                type="text"
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

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedTask) deleteTask(selectedTask.id);
                    setEditModalOpen(false);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete Task
                </button>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TaskForm;
