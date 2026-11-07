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
