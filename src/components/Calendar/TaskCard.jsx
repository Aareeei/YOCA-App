export default function TaskCard({ task, onEdit }) {
    return (
      <div className="task-card">
        <h3>{task.title}</h3>
        <p>{task.startTime} - {task.endTime}</p>
        <button onClick={() => onEdit(task)}>Edit</button>
      </div>
    );
  }
  