import { useState } from 'react'
import TaskList from './TaskList.jsx'
import ApiTasks from './ApiTasks.jsx'

// Screen 2: view, edit, complete and delete tasks
function ViewTasksScreen({ tasks, onToggle, onDelete, onUpdate, onCreateTask }) {
  const [filter, setFilter] = useState('all')

  const pendingCount = tasks.filter((t) => !t.completed).length

  // Show the tasks that match the chosen filter
  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  // Sort by due date and time (earliest first). Tasks without a date go last.
  const sorted = [...filtered].sort((a, b) => {
    const aTime = a.date && a.time ? new Date(`${a.date}T${a.time}`).getTime() : Infinity
    const bTime = b.date && b.time ? new Date(`${b.date}T${b.time}`).getTime() : Infinity
    return aTime - bTime
  })

  return (
    <>
      <section className="panel">
        <div className="list-head">
          <h2>All tasks</h2>
          <span className="count">
            {pendingCount} pending of {tasks.length}
          </span>
        </div>

        <div className="filters">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={filter === f ? 'filter active' : 'filter'}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <TaskList
          tasks={sorted}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onCreateTask={onCreateTask}
        />
      </section>

      <section className="panel">
        <h2>Sample tasks from an API</h2>
        <ApiTasks />
      </section>
    </>
  )
}

export default ViewTasksScreen
