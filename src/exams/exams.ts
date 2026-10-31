export type Exam = {
  id: number
  subject: string
  /** Kalendertag im Format YYYY-MM-DD */
  date: string
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

export function toIsoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Blendet vergangene Prüfungen aus und sortiert die nächste nach oben. */
export function getUpcomingExams(exams: Exam[], today: string) {
  return exams
    .filter((exam) => exam.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function daysUntil(date: string, today: string) {
  return (Date.parse(date) - Date.parse(today)) / MS_PER_DAY
}
