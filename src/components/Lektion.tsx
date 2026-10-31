import type { CSSProperties } from 'react'
import type { Lektion as LektionDaten } from '../types.ts'

interface LektionProps {
  lektion: LektionDaten
  style: CSSProperties
}

function Lektion({ lektion, style }: LektionProps) {
  return (
    <article className="lektion" style={style}>
      <strong className="lektion__fach">{lektion.fach}</strong>
      <div className="lektion__details">
        <span>
          {lektion.start}–{lektion.ende}
        </span>
        <span>{lektion.zimmer}</span>
        <span>{lektion.dozent}</span>
      </div>
    </article>
  )
}

export default Lektion
