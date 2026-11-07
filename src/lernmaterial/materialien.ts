export interface Material {
  id: number
  modul: string
  titel: string
  art: 'Skript' | 'Folien' | 'Übung' | 'Vorlage'
  /** Format JJJJ-MM-TT */
  hochgeladen: string
}

export const materialien: Material[] = [
  { id: 1, modul: 'SQL', titel: 'Relationale Datenbanken', art: 'Skript', hochgeladen: '2026-08-24' },
  { id: 2, modul: 'SQL', titel: 'JOINs', art: 'Folien', hochgeladen: '2026-10-19' },
  { id: 3, modul: 'SQL', titel: 'SELECT-Abfragen', art: 'Übung', hochgeladen: '2026-10-26' },
  { id: 4, modul: 'Mathematik', titel: 'Formelsammlung', art: 'Skript', hochgeladen: '2026-08-24' },
  { id: 5, modul: 'Mathematik', titel: 'Übungsserie 6: Lineare Funktionen', art: 'Übung', hochgeladen: '2026-11-02' },
  { id: 6, modul: 'Java', titel: 'Klassen und Objekte', art: 'Folien', hochgeladen: '2026-10-20' },
  { id: 7, modul: 'Java', titel: 'Vererbung', art: 'Skript', hochgeladen: '2026-10-27' },
  { id: 8, modul: 'Java', titel: 'Tierpark', art: 'Übung', hochgeladen: '2026-11-03' },
  { id: 9, modul: 'Englisch', titel: 'Vocabulary Unit 4', art: 'Skript', hochgeladen: '2026-10-21' },
  { id: 10, modul: 'Englisch', titel: 'Writing an Essay', art: 'Folien', hochgeladen: '2026-11-04' },
  { id: 11, modul: 'Netzwerktechnik', titel: 'Das OSI-Modell', art: 'Skript', hochgeladen: '2026-09-07' },
  { id: 12, modul: 'Netzwerktechnik', titel: 'Subnetting', art: 'Übung', hochgeladen: '2026-10-29' },
  { id: 13, modul: 'Projektmanagement', titel: 'Scrum auf einen Blick', art: 'Skript', hochgeladen: '2026-09-01' },
  { id: 14, modul: 'Projektmanagement', titel: 'Retrospektive', art: 'Vorlage', hochgeladen: '2026-11-05' },
  { id: 15, modul: 'Webentwicklung', titel: 'Flexbox', art: 'Folien', hochgeladen: '2026-10-22' },
  { id: 16, modul: 'Webentwicklung', titel: 'HTML und CSS', art: 'Skript', hochgeladen: '2026-09-02' },
]

/** Neueste Unterlagen zuerst */
export function materialienFuer(modul: string) {
  return materialien
    .filter((material) => material.modul === modul)
    .sort((a, b) => b.hochgeladen.localeCompare(a.hochgeladen))
}
