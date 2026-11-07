import { useState } from 'react'
import AufgabeDetail from './AufgabeDetail.tsx'
import {
  abgegebeneLaden,
  abgegebeneSpeichern,
  fristText,
  nachAbgabedatum,
  offeneAufgaben,
  type Aufgabe,
} from './aufgaben.ts'
import { testAufgaben } from './testAufgaben.ts'
import { daysUntil } from '../exams/exams.ts'
import type { Benutzer } from '../types.ts'
import { alsIsoDatum } from '../utils/datum.ts'
import './OffeneAufgaben.css'

const LOCALE = 'de-CH'

function alsDatum(iso: string) {
  return new Date(`${iso}T00:00:00`)
}

function dringlichkeit(tage: number) {
  if (tage < 0) return 'aufgabe aufgabe--ueberfaellig'
  if (tage <= 1) return 'aufgabe aufgabe--bald'
  return 'aufgabe'
}

interface OffeneAufgabenProps {
  benutzer: Benutzer
}

function OffeneAufgaben({ benutzer }: OffeneAufgabenProps) {
  const [heute] = useState(() => alsIsoDatum(new Date()))
  const [abgegeben, setAbgegeben] = useState(() => abgegebeneLaden(benutzer.email))
  const [gewaehlt, setGewaehlt] = useState<Aufgabe | null>(null)
  const [meldung, setMeldung] = useState('')
  const offen = nachAbgabedatum(offeneAufgaben(testAufgaben, abgegeben))

  function abgeben(aufgabe: Aufgabe) {
    const neu = [...abgegeben, aufgabe.id]
    abgegebeneSpeichern(benutzer.email, neu)
    setAbgegeben(neu)
    setGewaehlt(null)
    setMeldung(`Abgegeben: ${aufgabe.titel}`)
  }

  function oeffnen(aufgabe: Aufgabe) {
    setMeldung('')
    setGewaehlt(aufgabe)
  }

  if (gewaehlt) {
    return (
      <section className="aufgaben">
        <AufgabeDetail
          aufgabe={gewaehlt}
          datum={alsDatum(gewaehlt.abgabedatum).toLocaleDateString(LOCALE, { dateStyle: 'full' })}
          tage={daysUntil(gewaehlt.abgabedatum, heute)}
          onZurueck={() => setGewaehlt(null)}
          onAbgeben={() => abgeben(gewaehlt)}
        />
      </section>
    )
  }

  return (
    <section className="aufgaben">
      <header className="aufgaben__kopf">
        <h1>Offene Aufgaben</h1>
        <p>
          {offen.length === 1 ? 'Eine Aufgabe ist noch offen.' : `${offen.length} Aufgaben sind noch offen.`}
        </p>
      </header>

      {meldung && (
        <p className="aufgaben__meldung" role="status">
          {meldung}
        </p>
      )}

      {offen.length === 0 ? (
        <p className="aufgaben__leer">Alles abgegeben. Zeit für Süsses!</p>
      ) : (
        <ul className="aufgaben__liste">
          {offen.map((aufgabe) => {
            const tage = daysUntil(aufgabe.abgabedatum, heute)

            return (
              <li key={aufgabe.id}>
                <button type="button" className={dringlichkeit(tage)} onClick={() => oeffnen(aufgabe)}>
                  <span className="aufgabe__info">
                    <strong className="aufgabe__titel">{aufgabe.titel}</strong>
                    <span className="aufgabe__modul">{aufgabe.modul}</span>
                  </span>
                  <span className="aufgabe__abgabe">
                    <span className="aufgabe__label">Abgabe</span>
                    <time dateTime={aufgabe.abgabedatum}>
                      {alsDatum(aufgabe.abgabedatum).toLocaleDateString(LOCALE, {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </time>
                    <span className="aufgabe__frist">{fristText(tage)}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default OffeneAufgaben
