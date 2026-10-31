import ProfileMenu from './ProfileMenu.jsx'
import { MENUEPUNKTE, type Menuepunkt } from '../menue.ts'
import type { Benutzer } from '../types.ts'

interface SidebarProps {
  benutzer: Benutzer
  onAbmelden: () => void
  aktiv: Menuepunkt
  onWaehlen: (punkt: Menuepunkt) => void
}

function Sidebar({ benutzer, onAbmelden, aktiv, onWaehlen }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__profil">
        {/* Klick auf das Profilbild öffnet «Abmelden» (SCRUM-21) */}
        <ProfileMenu user={benutzer} onLogout={onAbmelden} />
        <span>{benutzer.name}</span>
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
