import type { ReactNode } from 'react'
import TopNav from './TopNav.tsx'
import Sidebar from './Sidebar.tsx'
import type { Menuepunkt } from '../menue.ts'

interface LayoutProps {
  aktiv: Menuepunkt
  onWaehlen: (punkt: Menuepunkt) => void
  children: ReactNode
}

function Layout({ aktiv, onWaehlen, children }: LayoutProps) {
  return (
    <div className="layout">
      <TopNav />
      <main className="layout__inhalt">{children}</main>
      <Sidebar aktiv={aktiv} onWaehlen={onWaehlen} />
    </div>
  )
}

export default Layout
