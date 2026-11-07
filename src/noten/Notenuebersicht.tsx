import { alsNote, GENUEGEND, nachDatum } from './noten.ts'
import { testNoten } from './testNoten.ts'
import './Notenuebersicht.css'

const LOCALE = 'de-CH'

function Notenuebersicht() {
  const noten = nachDatum(testNoten)

  return (
    <section className="noten">
      <header className="noten__kopf">
        <h1>Noten</h1>
        <p>Deine Prüfungsnoten, die neueste zuerst.</p>
      </header>

      {noten.length === 0 ? (
        <p className="noten__leer">Noch keine Noten eingetragen.</p>
      ) : (
        <div className="noten__tabelle">
          <table>
            <thead>
              <tr>
                <th scope="col">Datum</th>
                <th scope="col">Modul</th>
                <th scope="col">Prüfung</th>
                <th scope="col" className="noten__zahl">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {noten.map((n) => (
                <tr key={n.id}>
                  <td>
                    <time dateTime={n.datum}>{new Date(`${n.datum}T00:00:00`).toLocaleDateString(LOCALE)}</time>
                  </td>
                  <td>{n.modul}</td>
                  <td>{n.pruefung}</td>
                  <td className="noten__zahl">
                    <span className={n.note < GENUEGEND ? 'note note--ungenuegend' : 'note'}>{alsNote(n.note)}</span>
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

export default Notenuebersicht
