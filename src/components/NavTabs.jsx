// NavTabs: switches between the two screens. The coloured pill slides under the active tab.
function NavTabs({ screen, onChange, pendingCount }) {
  return (
    <nav className="tabs" aria-label="Screens">
      <span
        className="tab-pill"
        style={{ transform: screen === 'view' ? 'translateX(100%)' : 'translateX(0)' }}
        aria-hidden="true"
      />
      <button
        className={screen === 'create' ? 'tab active' : 'tab'}
        onClick={() => onChange('create')}
        aria-current={screen === 'create' ? 'page' : undefined}
      >
        Create task
      </button>
      <button
        className={screen === 'view' ? 'tab active' : 'tab'}
        onClick={() => onChange('view')}
        aria-current={screen === 'view' ? 'page' : undefined}
      >
        All tasks <span className="tab-count">{pendingCount}</span>
      </button>
    </nav>
  )
}

export default NavTabs
