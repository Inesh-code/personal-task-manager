import { useState } from 'react'

// TaskForm: collects the title and priority, validates, then sends it up via onAddTask
function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({ title: '', priority: 'Medium' })
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (error) setError('') // clear the error once the user starts typing
  }

  function handleSubmit(e) {
    e.preventDefault()
    const title = formData.title.trim()

    // Validation
    if (title === '') {
      setError('Please enter a task title.')
      return
    }
    if (title.length < 3) {
      setError('Task title must be at least 3 characters long.')
      return
    }
    if (title.length > 60) {
      setError('Task title can be at most 60 characters long.')
      return
    }

    onAddTask(title, formData.priority)
    setFormData({ title: '', priority: 'Medium' }) // reset form
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="title">Task title *</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="e.g. Finish React assignment"
        value={formData.title}
        onChange={handleChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? 'title-error' : undefined}
      />
      {error && (
        <p id="title-error" className="error" role="alert">
          {error}
        </p>
      )}

      <label htmlFor="priority">Priority</label>
      <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit" className="btn-primary">Add task</button>
    </form>
  )
}

export default TaskForm
