import { useState, useEffect } from 'react'
import { validateTask, todayString } from '../utils/taskHelpers.js'

const emptyForm = { title: '', priority: 'Medium', date: '', time: '' }

// TaskForm: collects title, priority, date and time, validates, then sends it up via onAddTask
function TaskForm({ onAddTask, onViewTasks }) {
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  // useEffect: hide the success message after 4 seconds
  useEffect(() => {
    if (!successMessage) return
    const timer = setTimeout(() => setSuccessMessage(''), 4000)
    return () => clearTimeout(timer)
  }, [successMessage])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // clear the error for this field once the user changes it
    if (errors[name]) setErrors({ ...errors, [name]: '' })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validateTask(formData)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAddTask({ ...formData, title: formData.title.trim() })
    setSuccessMessage(`"${formData.title.trim()}" was added to your tasks.`)
    setFormData(emptyForm) // reset form
    setErrors({})
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Task name *</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Finish React assignment"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && <p className="error" role="alert">{errors.title}</p>}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="date">Due date *</label>
          <input
            id="date"
            name="date"
            type="date"
            min={todayString()}
            value={formData.date}
            onChange={handleChange}
            aria-invalid={errors.date ? 'true' : 'false'}
          />
          {errors.date && <p className="error" role="alert">{errors.date}</p>}
        </div>

        <div className="field">
          <label htmlFor="time">Due time *</label>
          <input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            aria-invalid={errors.time ? 'true' : 'false'}
          />
          {errors.time && <p className="error" role="alert">{errors.time}</p>}
        </div>
      </div>

      <fieldset className="field priority-picker">
        <legend>Priority *</legend>
        {['Low', 'Medium', 'High'].map((level) => (
          <label key={level} className={`priority-option option-${level.toLowerCase()}`}>
            <input
              type="radio"
              name="priority"
              value={level}
              checked={formData.priority === level}
              onChange={handleChange}
            />
            <span>{level}</span>
          </label>
        ))}
      </fieldset>

      <button type="submit" className="btn-primary">Add task</button>

      {successMessage && (
        <div className="success" role="status">
          <span>{successMessage}</span>
          <button type="button" className="btn-link" onClick={onViewTasks}>
            View all tasks
          </button>
        </div>
      )}
    </form>
  )
}

export default TaskForm
