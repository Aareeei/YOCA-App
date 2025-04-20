import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("yocaTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("yocaTasks", JSON.stringify(tasks));
  }, [tasks]);

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem("yocaTasks");
  };  

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: uuid(), completed: false }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const removeTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        removeTask,
        toggleComplete,
        selectedTask,
        setSelectedTask,
        clearAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
