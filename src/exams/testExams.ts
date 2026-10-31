import { toIsoDate, type Exam } from './exams'

// Relativ zu heute, damit die Testdaten nicht veralten
function daysFromToday(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

export const testExams: Exam[] = [
  { id: 1, subject: 'Webentwicklung', date: daysFromToday(21) },
  { id: 2, subject: 'Betriebssysteme', date: daysFromToday(-14) },
  { id: 3, subject: 'Mathematik', date: daysFromToday(3) },
  { id: 4, subject: 'Projektmanagement', date: daysFromToday(35) },
  { id: 5, subject: 'Englisch', date: daysFromToday(1) },
  { id: 6, subject: 'Wirtschaft', date: daysFromToday(-2) },
  { id: 7, subject: 'Datenbanken', date: daysFromToday(9) },
  { id: 8, subject: 'Netzwerktechnik', date: daysFromToday(14) },
]
