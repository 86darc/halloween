import type { ReactNode } from 'react'
import TopNav from './TopNav.tsx'
import Sidebar from './Sidebar.tsx'
import type { Menuepunkt } from '../menue.ts'
import type { Benutzer } from '../types.ts'

interface LayoutProps {
  benutzer: Benutzer
  onAbmelden: () => void
  aktiv: Menuepunkt
  onWaehlen: (punkt: Menuepunkt) => void
  children: ReactNode
}

function Layout({ benutzer, onAbmelden, aktiv, onWaehlen, children }: LayoutProps) {
  return (
    <div className="layout">
      <TopNav />
      <main className="layout__inhalt">{children}</main>
      <Sidebar benutzer={benutzer} onAbmelden={onAbmelden} aktiv={aktiv} onWaehlen={onWaehlen} />
    </div>
  )
}

export default Layout
