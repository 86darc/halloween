import { useState } from 'react'
import Lektion from './Lektion.tsx'
import type { Lektion as LektionDaten } from '../types.ts'
import {
  alsIsoDatum,
  alsKurzdatum,
  inMinuten,
  kalenderwoche,
  montagDerWoche,
  tageAddieren,
} from '../utils/datum.ts'

const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr']
const STARTSTUNDE = 8
const ENDSTUNDE = 17
// Eine Rasterzeile entspricht 15 Minuten. Zeile 1 ist die Kopfzeile mit den Wochentagen.
const MINUTEN_PRO_ZEILE = 15
const STUNDEN = Array.from({ length: ENDSTUNDE - STARTSTUNDE }, (_, i) => STARTSTUNDE + i)

function zeileFuer(zeit: string): number {
  return (inMinuten(zeit) - STARTSTUNDE * 60) / MINUTEN_PRO_ZEILE + 2
}

interface StundenplanProps {
  lektionen: LektionDaten[]
}

function Stundenplan({ lektionen }: StundenplanProps) {
  const [montag, setMontag] = useState(() => montagDerWoche(new Date()))

  const tage = WOCHENTAGE.map((_, i) => tageAddieren(montag, i))
  const tagesIndex = new Map(tage.map((tag, i) => [alsIsoDatum(tag), i]))
  const lektionenDerWoche = lektionen.filter((l) => tagesIndex.has(l.datum))

  return (
    <section className="stundenplan">
      <div className="stundenplan__kopf">
        <button type="button" onClick={() => setMontag(tageAddieren(montag, -7))} aria-label="Vorherige Woche">
          ◀
        </button>
        <h1>KW {kalenderwoche(montag)}</h1>
        <button type="button" onClick={() => setMontag(tageAddieren(montag, 7))} aria-label="Nächste Woche">
          ▶
        </button>
      </div>
      <p className="stundenplan__zeitraum">
        {alsKurzdatum(tage[0])} – {alsKurzdatum(tage[4])}
        {tage[4].getFullYear()}
      </p>

      <div className="stundenplan__raster">
        {WOCHENTAGE.map((name, i) => (
          <div key={name} className="stundenplan__tag" style={{ gridColumn: i + 2, gridRow: 1 }}>
            {name} <small>{alsKurzdatum(tage[i])}</small>
          </div>
        ))}

        {STUNDEN.map((stunde) => {
          const zeile = zeileFuer(`${stunde}:00`)
          return [
            <div key={`zeit-${stunde}`} className="stundenplan__zeit" style={{ gridColumn: 1, gridRow: `${zeile} / span 4` }}>
              {stunde}:00
            </div>,
            <div key={`linie-${stunde}`} className="stundenplan__linie" style={{ gridColumn: '2 / -1', gridRow: `${zeile} / span 4` }} />,
          ]
        })}

        {lektionenDerWoche.map((lektion) => (
          <Lektion
            key={lektion.id}
            lektion={lektion}
            style={{
              gridColumn: (tagesIndex.get(lektion.datum) ?? 0) + 2,
              gridRow: `${zeileFuer(lektion.start)} / ${zeileFuer(lektion.ende)}`,
            }}
          />
        ))}
      </div>

      {lektionenDerWoche.length === 0 && <p className="stundenplan__leer">Keine Lektionen in dieser Woche.</p>}
      <p className="stundenplan__legende">Legende: Z = Zimmer, S = Stockwerk</p>
    </section>
  )
}

export default Stundenplan
