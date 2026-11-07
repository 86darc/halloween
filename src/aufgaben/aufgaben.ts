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

/** Nächste Abgabe zuerst, Überfälliges steht damit ganz oben. */
export function nachAbgabedatum(aufgaben: Aufgabe[]) {
  return [...aufgaben].sort((a, b) => a.abgabedatum.localeCompare(b.abgabedatum))
}

export function fristText(tage: number) {
  if (tage < -1) return `${-tage} Tage überfällig`
  if (tage === -1) return 'Seit gestern überfällig'
  if (tage === 0) return 'Heute fällig'
  if (tage === 1) return 'Morgen fällig'
  return `in ${tage} Tagen`
}

export function abgegebeneSpeichern(email: string, ids: number[]) {
  try {
    localStorage.setItem(SPEICHER_PREFIX + email, JSON.stringify(ids))
  } catch {
    /* ignorieren, die Abgabe gilt dann nur bis zum Neuladen */
  }
}
