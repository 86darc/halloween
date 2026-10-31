function TopNav() {
  return (
    <header className="topnav">
      <span className="topnav__logo">
        <span aria-hidden="true">🎃</span> StudyHub
      </span>
      <nav className="topnav__links">
        <a href="#">Home</a>
        <a href="#">News</a>
      </nav>
      <span className="topnav__fledermaeuse" aria-hidden="true">
        🦇 <span>🦇</span>
      </span>
      <input className="topnav__suche" type="search" placeholder="Suchen …" aria-label="Suchen" />
    </header>
  )
}

export default TopNav
