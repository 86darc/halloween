import { useState } from 'react'
import MaterialListe from './MaterialListe.tsx'
import { materialienFuer } from './materialien.ts'
import { meineModule, type Modul } from './module.ts'
import type { Lektion } from '../types.ts'
import './Lernmaterial.css'

interface LernmaterialProps {
  lektionen: Lektion[]
}

function Lernmaterial({ lektionen }: LernmaterialProps) {
  const [gewaehlt, setGewaehlt] = useState<Modul | null>(null)
  const module = meineModule(lektionen)

  if (gewaehlt) {
    return (
      <section className="lernmaterial">
        <MaterialListe modul={gewaehlt} onZurueck={() => setGewaehlt(null)} />
      </section>
    )
  }

  return (
    <section className="lernmaterial">
      <header className="lernmaterial__kopf">
        <h1>Meine Module</h1>
        <p>Wähle ein Modul, um seine Unterlagen zu sehen.</p>
      </header>

      <ul className="module">
        {module.map((modul) => {
          const anzahl = materialienFuer(modul.name).length

          return (
            <li key={modul.name}>
              <button type="button" className="modul" onClick={() => setGewaehlt(modul)}>
                <span className="modul__icon" aria-hidden="true">
                  📚
                </span>
                <strong className="modul__name">{modul.name}</strong>
                <span className="modul__dozent">{modul.dozent}</span>
                <span className="modul__anzahl">{anzahl === 1 ? '1 Unterlage' : `${anzahl} Unterlagen`}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Lernmaterial
