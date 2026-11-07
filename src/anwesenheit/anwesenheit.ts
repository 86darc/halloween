import type { Lektion } from '../types.ts'
import { alsIsoDatum, inMinuten } from '../utils/datum.ts'

// Testdaten: IDs der Lektionen aus dem Stundenplan, bei denen ich gefehlt habe
const ABWESEND = new Set([3, 13, 21, 26, 31])

export interface Eintrag {
  lektion: Lektion
  anwesend: boolean
}

/** Erfasst ist eine Lektion erst, wenn sie vorbei ist. Die neueste steht oben. */
export function erfassteLektionen(lektionen: Lektion[], jetzt: Date): Eintrag[] {
  const heute = alsIsoDatum(jetzt)
  const minuten = jetzt.getHours() * 60 + jetzt.getMinutes()

  return lektionen
    .filter((l) => l.datum < heute || (l.datum === heute && inMinuten(l.ende) <= minuten))
    .sort((a, b) => b.datum.localeCompare(a.datum) || b.start.localeCompare(a.start))
    .map((lektion) => ({ lektion, anwesend: !ABWESEND.has(lektion.id) }))
}

/** Anteil der besuchten Lektionen zwischen 0 und 1, ohne erfasste Lektionen null */
export function anwesenheitsquote(eintraege: Eintrag[]) {
  if (eintraege.length === 0) return null
  return eintraege.filter((e) => e.anwesend).length / eintraege.length
}
