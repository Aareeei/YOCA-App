import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/Tasks/TaskForm';
import CalendarView from './components/Calendar/CalendarView';
import PomodoroTimer from './components/Pomodoro/PomodoroTimer';
import DailySummary from './components/Summary/DailySummary';
import TaskGenerator from './components/Tasks/TaskGenerator';




const App = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">YOCA: Yet Another Calendar App</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <CalendarView />
          </div>
          <div className="md:col-span-1">
            <TaskGenerator /> 
            <TaskForm />
            <PomodoroTimer />
            <DailySummary />
          </div>
        </div>
      </div>
    </TaskProvider>
    
  );
};

export default App;
