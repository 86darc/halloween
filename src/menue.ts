export const MENUEPUNKTE = [
  'Startseite',
  'Meine Daten',
  'Prüfungstermine',
  'Prüfungsanmeldung',
  'Offene Aufgaben',
  'Lernmaterial',
  'Unterrichtsplan',
  'Anwesenheit',
  'Noten',
  'Einstellungen',
] as const

export type Menuepunkt = (typeof MENUEPUNKTE)[number]
