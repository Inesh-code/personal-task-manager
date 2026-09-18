// Helper functions shared by the form and the task items

// Today's date as "YYYY-MM-DD" (the format used by <input type="date">)
export function todayString() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

// Checks the form data and returns an object of error messages.
// An empty object means everything is valid.
export function validateTask(data, allowPast = false) {
  const errors = {}
  const title = data.title.trim()

  if (title === '') {
    errors.title = 'Please enter a task title.'
  } else if (title.length < 3) {
    errors.title = 'Task title must be at least 3 characters long.'
  } else if (title.length > 60) {
    errors.title = 'Task title can be at most 60 characters long.'
  }

  if (!data.date) errors.date = 'Please choose a due date.'
  if (!data.time) errors.time = 'Please choose a due time.'

  if (!allowPast && data.date && data.time) {
    const due = new Date(`${data.date}T${data.time}`)
    if (due < new Date()) {
      errors.date = 'The due date and time cannot be in the past.'
    }
  }

  return errors
}

// Turns date + time into friendly text, e.g. "Mon, 21 Sep 2026 at 2:30 PM"
export function formatDue(date, time) {
  if (!date || !time) return 'No due date'
  const due = new Date(`${date}T${time}`)
  const day = due.toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
  const clock = due.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${day} at ${clock}`
}

// A task is overdue if it is not completed and its due time has passed
export function isOverdue(task) {
  if (task.completed || !task.date || !task.time) return false
  return new Date(`${task.date}T${task.time}`) < new Date()
}
