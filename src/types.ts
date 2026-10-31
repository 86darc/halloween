export interface Benutzer {
  name: string
  email: string
}

export interface Lektion {
  id: number
  /** Format JJJJ-MM-TT */
  datum: string
  /** Format HH:MM */
  start: string
  ende: string
  fach: string
  zimmer: string
  dozent: string
}
