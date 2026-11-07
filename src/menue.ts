export const MENUEPUNKTE = [
  'Startseite',
  'Meine Daten',
  'Prüfungstermine',
  'Prüfungsanmeldung',
  'Offene Aufgaben',
  'Lernmaterial',
  'Unterrichtsplan',
  'Noten',
  'Einstellungen',
] as const

export type Menuepunkt = (typeof MENUEPUNKTE)[number]
