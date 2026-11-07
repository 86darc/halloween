import { fristText, type Aufgabe } from './aufgaben.ts'

interface AufgabeDetailProps {
  aufgabe: Aufgabe
  datum: string
  tage: number
  onZurueck: () => void
  onAbgeben: () => void
}

function AufgabeDetail({ aufgabe, datum, tage, onZurueck, onAbgeben }: AufgabeDetailProps) {
  return (
    <article className="aufgabe-detail">
      <button type="button" className="aufgabe-detail__zurueck" onClick={onZurueck}>
        ← Alle offenen Aufgaben
      </button>

      <span className="aufgabe__modul">{aufgabe.modul}</span>
      <h1>{aufgabe.titel}</h1>

      <dl className="aufgabe-detail__fakten">
        <div>
          <dt>Abgabe</dt>
          <dd>
            <time dateTime={aufgabe.abgabedatum}>{datum}</time>
          </dd>
        </div>
        <div>
          <dt>Frist</dt>
          <dd>{fristText(tage)}</dd>
        </div>
      </dl>

      <h2>Auftrag</h2>
      <p className="aufgabe-detail__text">{aufgabe.beschreibung}</p>

      <button type="button" className="btn aufgabe-detail__abgeben" onClick={onAbgeben}>
        Als abgegeben markieren
      </button>
    </article>
  )
}

export default AufgabeDetail
