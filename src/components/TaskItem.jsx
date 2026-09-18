// TaskItem: one task row with a checkbox (toggle) and a delete button
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item priority-${task.priority.toLowerCase()} ${task.completed ? 'done' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-title">{task.title}</span>
      </label>
      <span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span>
      <button
        className="btn-delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  )
}

export default TaskItem
