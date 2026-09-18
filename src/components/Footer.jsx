// Footer: simple footer, student name passed as a prop
function Footer({ studentName }) {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>
        © {year} {studentName}. Built with ReactJS for the ICT Diploma web development module.
      </p>
    </footer>
  )
}

export default Footer
