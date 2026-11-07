import { useState } from 'react'
import { erfassteLektionen } from './anwesenheit.ts'
import type { Lektion } from '../types.ts'
import './Anwesenheit.css'

const LOCALE = 'de-CH'
const ALLE = ''

interface AnwesenheitProps {
  lektionen: Lektion[]
}

function Anwesenheit({ lektionen }: AnwesenheitProps) {
  const [jetzt] = useState(() => new Date())
  const [modul, setModul] = useState(ALLE)
  const erfasst = erfassteLektionen(lektionen, jetzt)
  const module = [...new Set(erfasst.map((e) => e.lektion.fach))].sort((a, b) => a.localeCompare(b, 'de'))
  const eintraege = modul === ALLE ? erfasst : erfasst.filter((e) => e.lektion.fach === modul)

  return (
    <section className="anwesenheit">
      <header className="anwesenheit__kopf">
        <h1>Anwesenheit</h1>
        <p>Deine besuchten und verpassten Lektionen.</p>
      </header>

      <div className="anwesenheit__filter">
        <label htmlFor="anwesenheit-modul">Modul</label>
        <select id="anwesenheit-modul" value={modul} onChange={(e) => setModul(e.target.value)}>
          <option value={ALLE}>Alle Module</option>
          {module.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

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
