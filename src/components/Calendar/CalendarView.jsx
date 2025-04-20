// src/components/Calendar/CalendarView.jsx

import React, { useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TaskContext } from '../../context/TaskContext';

const CalendarView = () => {
  const { tasks, setSelectedTask } = useContext(TaskContext);

  const events = tasks.map((task) => {
    const [hour, minute] = task.scheduledStart?.split(':') || ['08', '00'];
    const date = new Date();
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
    return {
      id: task.id,
      title: task.title,
      start: new Date(date),
      end: new Date(date.getTime() + task.duration * 60000),
      color:
        task.priority === 'high'
          ? '#EF4444'
          : task.priority === 'medium'
          ? '#FACC15'
          : '#4ADE80'
    };
  });

  return (
    <div className="bg-white p-4 rounded shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Today’s Calendar</h2>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        allDaySlot={false}
        height="auto"
        slotMinTime="00:00:00"  // Show from midnight
        slotMaxTime="24:00:00"  // Show until end of day
        nowIndicator={true}
        editable={false}
        selectable={false}
        events={events}
        eventClick={(info) => {
          const selected = tasks.find(t => t.id === info.event.id);
          if (selected) setSelectedTask(selected);
        }}
      />
    </div>
  );
};

export default CalendarView;
