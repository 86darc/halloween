import { useState } from 'react'
import { abgegebeneLaden, offeneAufgaben } from './aufgaben.ts'
import { testAufgaben } from './testAufgaben.ts'
import type { Benutzer } from '../types.ts'
import './OffeneAufgaben.css'

const LOCALE = 'de-CH'

function alsDatum(iso: string) {
  return new Date(`${iso}T00:00:00`)
}

interface OffeneAufgabenProps {
  benutzer: Benutzer
}

function OffeneAufgaben({ benutzer }: OffeneAufgabenProps) {
  const [abgegeben] = useState(() => abgegebeneLaden(benutzer.email))
  const offen = offeneAufgaben(testAufgaben, abgegeben)

  return (
    <section className="aufgaben">
      <header className="aufgaben__kopf">
        <h1>Offene Aufgaben</h1>
        <p>
          {offen.length === 1 ? 'Eine Aufgabe ist noch offen.' : `${offen.length} Aufgaben sind noch offen.`}
        </p>
      </header>

      {offen.length === 0 ? (
        <p className="aufgaben__leer">Alles abgegeben. Zeit für Süsses!</p>
      ) : (
        <ul className="aufgaben__liste">
          {offen.map((aufgabe) => (
            <li key={aufgabe.id} className="aufgabe">
              <div className="aufgabe__info">
                <h2>{aufgabe.titel}</h2>
                <span className="aufgabe__modul">{aufgabe.modul}</span>
              </div>
              <div className="aufgabe__abgabe">
                <span>Abgabe</span>
                <time dateTime={aufgabe.abgabedatum}>
                  {alsDatum(aufgabe.abgabedatum).toLocaleDateString(LOCALE, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                  })}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default OffeneAufgaben
