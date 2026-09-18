import TaskItem from './TaskItem.jsx'

// TaskList: loops through tasks and renders a TaskItem for each one
function TaskList({ tasks, onToggle, onDelete, onUpdate, onCreateTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <p>No tasks here yet.</p>
        <button className="btn-link" onClick={onCreateTask}>Create a task</button>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  )
}

export default TaskList
