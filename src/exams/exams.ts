export type Exam = {
  id: number
  subject: string
  /** Kalendertag im Format YYYY-MM-DD */
  date: string
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

/** Blendet vergangene Prüfungen aus und sortiert die nächste nach oben. */
export function getUpcomingExams(exams: Exam[], today: string) {
  return exams
    .filter((exam) => exam.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function daysUntil(date: string, today: string) {
  return (Date.parse(date) - Date.parse(today)) / MS_PER_DAY
}
