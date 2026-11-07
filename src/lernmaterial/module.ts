import type { Lektion } from '../types.ts'

export interface Modul {
  name: string
  dozent: string
}

/** Die eigenen Module sind die Fächer aus dem Stundenplan, alphabetisch sortiert. */
export function meineModule(lektionen: Lektion[]): Modul[] {
  const dozenten = new Map<string, string>()
  for (const lektion of lektionen) {
    if (!dozenten.has(lektion.fach)) dozenten.set(lektion.fach, lektion.dozent)
  }
  return [...dozenten]
    .map(([name, dozent]) => ({ name, dozent }))
    .sort((a, b) => a.name.localeCompare(b.name, 'de'))
}
