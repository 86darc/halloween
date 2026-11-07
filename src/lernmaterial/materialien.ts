export interface Material {
  id: number
  modul: string
  titel: string
  art: 'Skript' | 'Folien' | 'Übung' | 'Vorlage'
  /** Dateiname im Ordner public/lernmaterial */
  datei: string
  /** Format JJJJ-MM-TT */
  hochgeladen: string
}

export const materialien: Material[] = [
  {
    id: 1,
    modul: 'SQL',
    titel: 'Relationale Datenbanken',
    art: 'Skript',
    datei: 'sql-skript-relationale-datenbanken.pdf',
    hochgeladen: '2026-08-24',
  },
  {
    id: 2,
    modul: 'SQL',
    titel: 'JOINs',
    art: 'Folien',
    datei: 'sql-folien-joins.pdf',
    hochgeladen: '2026-10-19',
  },
  {
    id: 3,
    modul: 'SQL',
    titel: 'SELECT-Abfragen',
    art: 'Übung',
    datei: 'sql-uebung-select.pdf',
    hochgeladen: '2026-10-26',
  },
  {
    id: 4,
    modul: 'Mathematik',
    titel: 'Formelsammlung',
    art: 'Skript',
    datei: 'mathe-formelsammlung.pdf',
    hochgeladen: '2026-08-24',
  },
  {
    id: 5,
    modul: 'Mathematik',
    titel: 'Übungsserie 6: Lineare Funktionen',
    art: 'Übung',
    datei: 'mathe-uebungsserie-6.pdf',
    hochgeladen: '2026-11-02',
  },
  {
    id: 6,
    modul: 'Java',
    titel: 'Klassen und Objekte',
    art: 'Folien',
    datei: 'java-folien-klassen.pdf',
    hochgeladen: '2026-10-20',
  },
  {
    id: 7,
    modul: 'Java',
    titel: 'Vererbung',
    art: 'Skript',
    datei: 'java-skript-vererbung.pdf',
    hochgeladen: '2026-10-27',
  },
  {
    id: 8,
    modul: 'Java',
    titel: 'Tierpark',
    art: 'Übung',
    datei: 'java-uebung-tierpark.pdf',
    hochgeladen: '2026-11-03',
  },
  {
    id: 9,
    modul: 'Englisch',
    titel: 'Vocabulary Unit 4',
    art: 'Skript',
    datei: 'englisch-vocabulary-unit-4.pdf',
    hochgeladen: '2026-10-21',
  },
  {
    id: 10,
    modul: 'Englisch',
    titel: 'Writing an Essay',
    art: 'Folien',
    datei: 'englisch-writing-an-essay.pdf',
    hochgeladen: '2026-11-04',
  },
  {
    id: 11,
    modul: 'Netzwerktechnik',
    titel: 'Das OSI-Modell',
    art: 'Skript',
    datei: 'netzwerk-skript-osi-modell.pdf',
    hochgeladen: '2026-09-07',
  },
  {
    id: 12,
    modul: 'Netzwerktechnik',
    titel: 'Subnetting',
    art: 'Übung',
    datei: 'netzwerk-uebung-subnetting.pdf',
    hochgeladen: '2026-10-29',
  },
  {
    id: 13,
    modul: 'Projektmanagement',
    titel: 'Scrum auf einen Blick',
    art: 'Skript',
    datei: 'pm-scrum-auf-einen-blick.pdf',
    hochgeladen: '2026-09-01',
  },
  {
    id: 14,
    modul: 'Projektmanagement',
    titel: 'Retrospektive',
    art: 'Vorlage',
    datei: 'pm-vorlage-retrospektive.pdf',
    hochgeladen: '2026-11-05',
  },
  {
    id: 15,
    modul: 'Webentwicklung',
    titel: 'Flexbox',
    art: 'Folien',
    datei: 'web-folien-flexbox.pdf',
    hochgeladen: '2026-10-22',
  },
  {
    id: 16,
    modul: 'Webentwicklung',
    titel: 'HTML und CSS',
    art: 'Skript',
    datei: 'web-skript-html-css.pdf',
    hochgeladen: '2026-09-02',
  },
]

/** Vite liefert alles aus dem Ordner public unverändert aus */
export function dateiUrl(material: Material) {
  return `${import.meta.env.BASE_URL}lernmaterial/${material.datei}`
}

/** Neueste Unterlagen zuerst */
export function materialienFuer(modul: string) {
  return materialien
    .filter((material) => material.modul === modul)
    .sort((a, b) => b.hochgeladen.localeCompare(a.hochgeladen))
}
