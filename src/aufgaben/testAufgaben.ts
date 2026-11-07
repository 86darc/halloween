import { alsIsoDatum, tageAddieren } from '../utils/datum.ts'
import type { Aufgabe } from './aufgaben.ts'

// Relativ zu heute, damit die Testdaten nicht veralten
function inTagen(tage: number) {
  return alsIsoDatum(tageAddieren(new Date(), tage))
}

export const testAufgaben: Aufgabe[] = [
  {
    id: 1,
    titel: 'ER-Modell für die Schulbibliothek',
    modul: 'SQL',
    abgabedatum: inTagen(4),
    beschreibung:
      'Erstelle ein ER-Modell mit den Entitäten Buch, Autor, Ausleihe und Person. Gib Kardinalitäten und Primärschlüssel an und lade das Diagramm als PDF hoch.',
  },
  {
    id: 2,
    titel: 'Portfolio-Seite mit Flexbox',
    modul: 'Webentwicklung',
    abgabedatum: inTagen(10),
    beschreibung:
      'Baue eine einseitige Portfolio-Seite mit Kopfzeile, drei Projektkarten und Fusszeile. Das Layout soll mit Flexbox umgesetzt sein und auch auf dem Handy funktionieren.',
  },
  {
    id: 3,
    titel: 'Übungsserie 6: Lineare Funktionen',
    modul: 'Mathematik',
    abgabedatum: inTagen(1),
    beschreibung: 'Löse die Aufgaben 1 bis 12 der Übungsserie 6. Der Lösungsweg muss nachvollziehbar sein.',
  },
  {
    id: 4,
    titel: 'Klassen und Vererbung: Tierpark',
    modul: 'Java',
    abgabedatum: inTagen(7),
    beschreibung:
      'Modelliere einen Tierpark mit einer abstrakten Klasse Tier und mindestens drei Unterklassen. Schreibe eine Main-Klasse, die alle Tiere füttert.',
  },
  {
    id: 5,
    titel: 'Essay «My dream job»',
    modul: 'Englisch',
    abgabedatum: inTagen(-1),
    beschreibung: 'Write an essay of about 300 words about your dream job and why it suits you.',
  },
  {
    id: 6,
    titel: 'Subnetting-Übungen',
    modul: 'Netzwerktechnik',
    abgabedatum: inTagen(14),
    beschreibung: 'Teile das Netz 192.168.10.0/24 in sechs gleich grosse Subnetze auf und dokumentiere Netz-, Broadcast- und Hostadressen.',
  },
  {
    id: 7,
    titel: 'Sprint-Retrospektive dokumentieren',
    modul: 'Projektmanagement',
    abgabedatum: inTagen(0),
    beschreibung: 'Halte die Ergebnisse eurer Retrospektive fest: Was lief gut, was nicht, welche Massnahmen nehmt ihr in den nächsten Sprint mit?',
  },
]
