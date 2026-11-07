export interface Note {
  id: number
  modul: string
  pruefung: string
  /** Format JJJJ-MM-TT */
  datum: string
  /** Schweizer Notenskala von 1 bis 6, genügend ab 4 */
  note: number
}

export const GENUEGEND = 4

/** Neueste Note zuerst */
export function nachDatum(noten: Note[]) {
  return [...noten].sort((a, b) => b.datum.localeCompare(a.datum))
}

export function alsNote(wert: number) {
  return wert.toLocaleString('de-CH', { minimumFractionDigits: 1, maximumFractionDigits: 2 })
}

export function durchschnitt(werte: number[]) {
  return werte.reduce((summe, wert) => summe + wert, 0) / werte.length
}

export interface Modulschnitt {
  modul: string
  anzahl: number
  schnitt: number
}

/** Alle Noten zählen gleich viel. Module alphabetisch sortiert. */
export function schnittProModul(noten: Note[]): Modulschnitt[] {
  const proModul = new Map<string, number[]>()
  for (const { modul, note } of noten) {
    proModul.set(modul, [...(proModul.get(modul) ?? []), note])
  }
  return [...proModul]
    .map(([modul, werte]) => ({ modul, anzahl: werte.length, schnitt: durchschnitt(werte) }))
    .sort((a, b) => a.modul.localeCompare(b.modul, 'de'))
}

/** Jedes Modul zählt gleich viel, egal wie viele Prüfungen es hatte. */
export function gesamtdurchschnitt(modulschnitte: Modulschnitt[]) {
  return durchschnitt(modulschnitte.map((m) => m.schnitt))
}
