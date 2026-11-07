import { useState } from 'react'
import { erfassteLektionen } from './anwesenheit.ts'
import type { Lektion } from '../types.ts'
import './Anwesenheit.css'

const LOCALE = 'de-CH'

interface AnwesenheitProps {
  lektionen: Lektion[]
}

function Anwesenheit({ lektionen }: AnwesenheitProps) {
  const [jetzt] = useState(() => new Date())
  const eintraege = erfassteLektionen(lektionen, jetzt)

  return (
    <section className="anwesenheit">
      <header className="anwesenheit__kopf">
        <h1>Anwesenheit</h1>
        <p>Deine besuchten und verpassten Lektionen.</p>
      </header>

      {eintraege.length === 0 ? (
        <p className="anwesenheit__leer">Noch keine Lektionen erfasst.</p>
      ) : (
        <div className="anwesenheit__tabelle">
          <table>
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Zeit</th>
                <th scope="col">Modul</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {eintraege.map(({ lektion, anwesend }) => (
                <tr key={lektion.id}>
                  <td>
                    <time dateTime={lektion.datum}>
                      {new Date(`${lektion.datum}T00:00:00`).toLocaleDateString(LOCALE, {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </td>
                  <td>
                    {lektion.start}–{lektion.ende}
                  </td>
                  <td>{lektion.fach}</td>
                  <td>
                    <span className={anwesend ? 'status status--anwesend' : 'status status--abwesend'}>
                      {anwesend ? 'Anwesend' : 'Abwesend'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Anwesenheit
