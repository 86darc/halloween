export interface Aufgabe {
  id: number
  titel: string
  modul: string
  /** Format JJJJ-MM-TT */
  abgabedatum: string
  beschreibung: string
}

// Wie die Konten in auth.js liegen die Abgaben im localStorage, getrennt pro Person
const SPEICHER_PREFIX = 'studyhub.abgaben.'

export function abgegebeneLaden(email: string): number[] {
  try {
    const roh = localStorage.getItem(SPEICHER_PREFIX + email)
    return roh ? JSON.parse(roh) : []
  } catch {
    return []
  }
}

export function offeneAufgaben(aufgaben: Aufgabe[], abgegeben: number[]) {
  return aufgaben.filter((aufgabe) => !abgegeben.includes(aufgabe.id))
}
