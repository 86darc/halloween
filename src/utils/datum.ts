// Alle Berechnungen laufen in lokaler Zeit, damit es keine Verschiebungen durch Zeitzonen gibt.

export function montagDerWoche(datum: Date): Date {
  const montag = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate())
  const wochentag = (montag.getDay() + 6) % 7 // 0 = Montag
  montag.setDate(montag.getDate() - wochentag)
  return montag
}

export function tageAddieren(datum: Date, tage: number): Date {
  const neu = new Date(datum)
  neu.setDate(neu.getDate() + tage)
  return neu
}

/** Kalenderwoche nach ISO 8601: Woche 1 ist die Woche mit dem ersten Donnerstag im Jahr. */
export function kalenderwoche(datum: Date): number {
  const donnerstag = tageAddieren(montagDerWoche(datum), 3)
  const ersterJanuar = new Date(donnerstag.getFullYear(), 0, 1)
  const tageSeitJahresbeginn = Math.round((donnerstag.getTime() - ersterJanuar.getTime()) / 86_400_000)
  return Math.floor(tageSeitJahresbeginn / 7) + 1
}

/** Gibt das Datum im Format JJJJ-MM-TT zurück, wie in den Testdaten. */
export function alsIsoDatum(datum: Date): string {
  const monat = String(datum.getMonth() + 1).padStart(2, '0')
  const tag = String(datum.getDate()).padStart(2, '0')
  return `${datum.getFullYear()}-${monat}-${tag}`
}

export function alsKurzdatum(datum: Date): string {
  return `${datum.getDate()}.${datum.getMonth() + 1}.`
}

/** "08:15" → 495 Minuten seit Mitternacht */
export function inMinuten(zeit: string): number {
  const [stunden, minuten] = zeit.split(':').map(Number)
  return stunden * 60 + minuten
}
