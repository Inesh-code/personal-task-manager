import TaskForm from './TaskForm.jsx'

// Screen 1: create a new task
function CreateTaskScreen({ onAddTask, onViewTasks }) {
  return (
    <section className="panel">
      <h2>Create a task</h2>
      <p className="panel-intro">Fill in all fields. Fields marked * are required.</p>
      <TaskForm onAddTask={onAddTask} onViewTasks={onViewTasks} />
    </section>
  )
}

export default CreateTaskScreen
