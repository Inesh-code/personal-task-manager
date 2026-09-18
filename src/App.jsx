import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import ApiTasks from './components/ApiTasks.jsx'
import Footer from './components/Footer.jsx'

// TODO: change these to your own details before submitting
const STUDENT_NAME = 'Inesh Fernando'
const REG_NUMBER = 'ICT/2026/000'

// Load saved tasks from the browser (so tasks stay after a refresh)
function loadSavedTasks() {
  try {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  // useState: the main task list
  const [tasks, setTasks] = useState(loadSavedTasks)
  // useState: welcome message shown for a few seconds
  const [welcome, setWelcome] = useState('')
  // useState: which tasks to show (all / active / completed)
  const [filter, setFilter] = useState('all')

  const pendingCount = tasks.filter((t) => !t.completed).length

  // useEffect 1: update the browser tab title whenever pending tasks change
  useEffect(() => {
    document.title =
      pendingCount > 0 ? `(${pendingCount}) Task Manager` : 'Task Manager - all done'
  }, [pendingCount])

  // useEffect 2: show a welcome message once, when the app first loads
  useEffect(() => {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
    setWelcome(`${greeting}! Let's get some tasks done today.`)
    const timer = setTimeout(() => setWelcome(''), 5000)
    return () => clearTimeout(timer) // cleanup
  }, [])

  // useEffect 3: save tasks to localStorage every time the list changes
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch {
      // storage not available - ignore
    }
  }, [tasks])

  // Add a new task (called from TaskForm through props)
  function addTask(title, priority) {
    const newTask = {
      id: Date.now(),
      title: title,
      priority: priority,
      completed: false,
    }
    setTasks([newTask, ...tasks])
  }

  // Toggle completed / not completed
  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  // Remove a task
  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <div className="app">
      <Header
        title="Personal Task Manager"
        studentName={STUDENT_NAME}
        regNumber={REG_NUMBER}
        description="A simple app to add your tasks, set a priority, tick them off when done and remove them when you no longer need them."
      />

      {welcome && <p className="welcome" role="status">{welcome}</p>}

      <main className="main">
        <section className="panel">
          <h2>Add a task</h2>
          <TaskForm onAddTask={addTask} />
        </section>

        <section className="panel">
          <div className="list-head">
            <h2>My tasks</h2>
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
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
        </section>

        <section className="panel">
          <h2>Sample tasks from an API</h2>
          <ApiTasks />
        </section>
      </main>

      <Footer studentName={STUDENT_NAME} />
    </div>
  )
}

export default App
