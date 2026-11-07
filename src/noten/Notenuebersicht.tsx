import { alsNote, gesamtdurchschnitt, GENUEGEND, nachDatum, schnittProModul } from './noten.ts'
import { testNoten } from './testNoten.ts'
import './Notenuebersicht.css'

const LOCALE = 'de-CH'

function Notenuebersicht() {
  const noten = nachDatum(testNoten)
  const modulschnitte = schnittProModul(noten)

  if (noten.length === 0) {
    return (
      <section className="noten">
        <header className="noten__kopf">
          <h1>Noten</h1>
        </header>
        <p className="noten__leer">Noch keine Noten eingetragen.</p>
      </section>
    )
  }

  return (
    <section className="noten">
      <header className="noten__kopf">
        <h1>Noten</h1>
        <p>Deine Prüfungsnoten und Durchschnitte.</p>
      </header>

      <div className="gesamtschnitt">
        <span className="gesamtschnitt__titel">Gesamtdurchschnitt</span>
        <strong className="gesamtschnitt__wert">{alsNote(gesamtdurchschnitt(modulschnitte))}</strong>
        <span className="gesamtschnitt__detail">Mittel aus {modulschnitte.length} Modulschnitten</span>
      </div>

      <h2 className="noten__titel">Durchschnitt pro Modul</h2>
      <ul className="modulschnitte">
        {modulschnitte.map((m) => (
          <li key={m.modul} className={m.schnitt < GENUEGEND ? 'modulschnitt modulschnitt--ungenuegend' : 'modulschnitt'}>
            <span className="modulschnitt__modul">{m.modul}</span>
            <strong className="modulschnitt__wert">{alsNote(m.schnitt)}</strong>
            <span className="modulschnitt__anzahl">{m.anzahl === 1 ? '1 Note' : `${m.anzahl} Noten`}</span>
          </li>
        ))}
      </ul>

      <h2 className="noten__titel">Alle Noten</h2>
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
    </section>
  )
}

export default Notenuebersicht
