// Header: shows app title, student details and a short description (all via props)
function Header({ title, studentName, regNumber, description }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <p className="description">{description}</p>
      <dl className="student">
        <div>
          <dt>Student</dt>
          <dd>{studentName}</dd>
        </div>
        <div>
          <dt>Registration no.</dt>
          <dd>{regNumber}</dd>
        </div>
      </dl>
    </header>
  )
}

export default Header
