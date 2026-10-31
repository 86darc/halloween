import { useState } from 'react'
import './App.css'
import Layout from './components/Layout.tsx'
import Stundenplan from './components/Stundenplan.tsx'
import type { Menuepunkt } from './menue.ts'
import type { Lektion } from './types.ts'
import stundenplanDaten from './data/stundenplan.json'

const lektionen: Lektion[] = stundenplanDaten

function App() {
  const [aktiv, setAktiv] = useState<Menuepunkt>('Unterrichtsplan')

  return (
    <Layout aktiv={aktiv} onWaehlen={setAktiv}>
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
