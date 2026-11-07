import { meineModule } from './module.ts'
import type { Lektion } from '../types.ts'
import './Lernmaterial.css'

interface LernmaterialProps {
  lektionen: Lektion[]
}

function Lernmaterial({ lektionen }: LernmaterialProps) {
  const module = meineModule(lektionen)

  return (
    <section className="lernmaterial">
      <header className="lernmaterial__kopf">
        <h1>Meine Module</h1>
        <p>Wähle ein Modul, um seine Unterlagen zu sehen.</p>
      </header>

      <ul className="module">
        {module.map((modul) => (
          <li key={modul.name} className="modul">
            <span className="modul__icon" aria-hidden="true">
              📚
            </span>
            <strong className="modul__name">{modul.name}</strong>
            <span className="modul__dozent">{modul.dozent}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Lernmaterial
