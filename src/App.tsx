import { useState } from 'react'
import './App.css'
import Layout from './components/Layout.tsx'
import Stundenplan from './components/Stundenplan.tsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import { clearSession, getSession } from './auth.js'
import type { Menuepunkt } from './menue.ts'
import type { Benutzer, Lektion } from './types.ts'
import stundenplanDaten from './data/stundenplan.json'

const lektionen: Lektion[] = stundenplanDaten

function App() {
  const [benutzer, setBenutzer] = useState<Benutzer | null>(() => getSession())
  const [zeigeRegistrierung, setZeigeRegistrierung] = useState(false)
  const [aktiv, setAktiv] = useState<Menuepunkt>('Unterrichtsplan')

  function angemeldet(neuerBenutzer: Benutzer) {
    setBenutzer(neuerBenutzer)
    setAktiv('Unterrichtsplan')
    setZeigeRegistrierung(false)
  }

  function abmelden() {
    clearSession()
    setBenutzer(null)
    setZeigeRegistrierung(false)
  }

  // Ohne Anmeldung sind nur Login und Registrierung sichtbar (SCRUM-22)
  if (!benutzer) {
    return zeigeRegistrierung ? (
      <RegisterScreen onRegistered={angemeldet} onSwitchToLogin={() => setZeigeRegistrierung(false)} />
    ) : (
      <LoginScreen onLoggedIn={angemeldet} onSwitchToRegister={() => setZeigeRegistrierung(true)} />
    )
  }

  return (
    <Layout benutzer={benutzer} onAbmelden={abmelden} aktiv={aktiv} onWaehlen={setAktiv}>
      {aktiv === 'Unterrichtsplan' ? (
        <Stundenplan lektionen={lektionen} />
      ) : (
        <section>
          <h1>{aktiv}</h1>
          <p>Diese Seite folgt bald.</p>
        </section>
      )}
    </Layout>
  )
}

export default App
