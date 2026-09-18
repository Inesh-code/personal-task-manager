import { useState, useEffect } from 'react'

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=5'

// ApiTasks: fetches 5 todos from JSONPlaceholder and displays them
function ApiTasks() {
  const [apiTasks, setApiTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // useEffect: load data from the API once when the component mounts
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setApiTasks(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load tasks from the API. Check your internet connection and refresh.')
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="empty">Loading tasks from the API...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <>
      <p className="api-note">Loaded from jsonplaceholder.typicode.com/todos</p>
      <table className="api-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {apiTasks.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>
                <span className={item.completed ? 'status done' : 'status'}>
                  {item.completed ? 'Completed' : 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ApiTasks
