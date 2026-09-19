import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import NavTabs from './components/NavTabs.jsx'
import CreateTaskScreen from './components/CreateTaskScreen.jsx'
import ViewTasksScreen from './components/ViewTasksScreen.jsx'
import Footer from './components/Footer.jsx'

// TODO: check these details before submitting
const STUDENT_NAME = 'Inesh Fernando'
const REG_NUMBER = 'PSBUC/DIP/ICT/SL/26/LC/0005'

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
  // useState: which screen is showing ('create' or 'view')
  const [screen, setScreen] = useState('create')
  // useState: welcome message shown for a few seconds
  const [welcome, setWelcome] = useState('')

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

  // useEffect 4: scroll back to the top when the screen changes
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screen])

  // Add a new task (called from TaskForm through props)
  function addTask(newTaskData) {
    const newTask = {
      id: Date.now(),
      title: newTaskData.title,
      priority: newTaskData.priority,
      date: newTaskData.date,
      time: newTaskData.time,
      completed: false,
    }
    setTasks([newTask, ...tasks])
  }

  // Edit an existing task (called from TaskItem when "Save" is clicked)
  function updateTask(id, changes) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, ...changes } : t)))
  }

  // Toggle completed / not completed
  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  // Remove a task
  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <div className="app">
      <Header
        title="Personal Task Manager"
        studentName={STUDENT_NAME}
        regNumber={REG_NUMBER}
        description="A simple app to plan your tasks with a due date, time and priority, tick them off when done and edit or remove them any time."
      />

      {welcome && <p className="welcome" role="status">{welcome}</p>}

      <NavTabs screen={screen} onChange={setScreen} pendingCount={pendingCount} />

      {/* The key makes React re-create this box on each screen change,
          so the entrance animation plays every time */}
      <main className="screen" key={screen}>
        {screen === 'create' ? (
          <CreateTaskScreen onAddTask={addTask} onViewTasks={() => setScreen('view')} />
        ) : (
          <ViewTasksScreen
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onCreateTask={() => setScreen('create')}
          />
        )}
      </main>

      <Footer studentName={STUDENT_NAME} />
    </div>
  )
}

export default App
