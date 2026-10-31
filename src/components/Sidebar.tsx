import { MENUEPUNKTE, type Menuepunkt } from '../menue.ts'

interface SidebarProps {
  aktiv: Menuepunkt
  onWaehlen: (punkt: Menuepunkt) => void
}

function Sidebar({ aktiv, onWaehlen }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__profil">
        <div className="sidebar__bild" aria-hidden="true">MM</div>
        <span>Max Muster</span>
      </div>
      <nav>
        <ul className="sidebar__menu">
          {MENUEPUNKTE.map((punkt) => (
            <li key={punkt}>
              <button
                type="button"
                className={punkt === aktiv ? 'sidebar__punkt sidebar__punkt--aktiv' : 'sidebar__punkt'}
                aria-current={punkt === aktiv ? 'page' : undefined}
                onClick={() => onWaehlen(punkt)}
              >
                {punkt}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
