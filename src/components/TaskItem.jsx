import { useState } from 'react'
import { validateTask, formatDue, isOverdue } from '../utils/taskHelpers.js'

// TaskItem: one task. Has a normal "view" mode and an "edit" mode.
function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(task)
  const [errors, setErrors] = useState({})
  const [isLeaving, setIsLeaving] = useState(false) // for the delete animation

  const priorityClass = task.priority.toLowerCase()
  const overdue = isOverdue(task)

  function startEditing() {
    setEditData({ ...task, date: task.date || '', time: task.time || '' })
    setErrors({})
    setIsEditing(true)
  }

  function handleEditChange(e) {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  function saveEdit(e) {
    e.preventDefault()
    // allowPast = true, so users can still edit a task that is already overdue
    const newErrors = validateTask(editData, true)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    onUpdate(task.id, {
      title: editData.title.trim(),
      priority: editData.priority,
      date: editData.date,
      time: editData.time,
    })
    setIsEditing(false)
  }

  function handleDelete() {
    // play the slide-out animation first, then remove the task
    setIsLeaving(true)
    setTimeout(() => onDelete(task.id), 250)
  }

  // ----- Edit mode -----
  if (isEditing) {
    return (
      <li className={`task-item editing priority-${editData.priority.toLowerCase()}`}>
        <form className="edit-form" onSubmit={saveEdit} noValidate>
          <div className="field">
            <label htmlFor={`title-${task.id}`}>Task name</label>
            <input
              id={`title-${task.id}`}
              name="title"
              type="text"
              value={editData.title}
              onChange={handleEditChange}
              aria-invalid={errors.title ? 'true' : 'false'}
            />
            {errors.title && <p className="error" role="alert">{errors.title}</p>}
          </div>

          <div className="field-row three">
            <div className="field">
              <label htmlFor={`date-${task.id}`}>Due date</label>
              <input
                id={`date-${task.id}`}
                name="date"
                type="date"
                value={editData.date}
                onChange={handleEditChange}
                aria-invalid={errors.date ? 'true' : 'false'}
              />
              {errors.date && <p className="error" role="alert">{errors.date}</p>}
            </div>
            <div className="field">
              <label htmlFor={`time-${task.id}`}>Due time</label>
              <input
                id={`time-${task.id}`}
                name="time"
                type="time"
                value={editData.time}
                onChange={handleEditChange}
                aria-invalid={errors.time ? 'true' : 'false'}
              />
              {errors.time && <p className="error" role="alert">{errors.time}</p>}
            </div>
            <div className="field">
              <label htmlFor={`priority-${task.id}`}>Priority</label>
              <select
                id={`priority-${task.id}`}
                name="priority"
                value={editData.priority}
                onChange={handleEditChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="edit-actions">
            <button type="submit" className="btn-primary small">Save changes</button>
            <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      </li>
    )
  }

  // ----- View mode -----
  return (
    <li
      className={`task-item priority-${priorityClass} ${task.completed ? 'done' : ''} ${
        isLeaving ? 'leaving' : ''
      }`}
    >
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as ${task.completed ? 'not completed' : 'completed'}`}
      />

      <div className="task-body">
        <span className="task-title">{task.title}</span>
        <span className="task-due">
          {formatDue(task.date, task.time)}
          {overdue && <span className="overdue">Overdue</span>}
        </span>
      </div>

      <span className={`badge badge-${priorityClass}`}>{task.priority}</span>

      <div className="task-actions">
        <button className="btn-edit" onClick={startEditing} aria-label={`Edit ${task.title}`}>
          Edit
        </button>
        <button className="btn-delete" onClick={handleDelete} aria-label={`Delete ${task.title}`}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TaskItem
