import { useState } from 'react'
import Pumpkin from '../components/Pumpkin'
import { daysUntil, getUpcomingExams, toIsoDate } from './exams'
import { testExams } from './testExams'
import './ExamList.css'

const LOCALE = 'de-CH'

function parseDate(date: string) {
  return new Date(`${date}T00:00:00`)
}

function formatCountdown(days: number) {
  if (days === 0) return 'Heute'
  if (days === 1) return 'Morgen'
  return `in ${days} Tagen`
}

function ExamList() {
  const [today] = useState(() => toIsoDate(new Date()))
  const exams = getUpcomingExams(testExams, today)

  return (
    <section className="exams">
      <header className="exams-header">
        <Pumpkin className="exams-pumpkin" />
        <h1>Kommende Prüfungen</h1>
        {exams.length > 0 && (
          <p>
            {exams.length === 1
              ? 'Eine Prüfung steht an.'
              : `${exams.length} Prüfungen stehen an.`}
          </p>
        )}
      </header>

      {exams.length === 0 ? (
        <p className="exams-empty">
          Keine Prüfungen in Sicht. Du kannst aufatmen!
        </p>
      ) : (
        <ol className="exams-list">
          {exams.map((exam) => {
            const date = parseDate(exam.date)
            const days = daysUntil(exam.date, today)

            return (
              <li className="exam" key={exam.id}>
                <div className="exam-tile" aria-hidden="true">
                  <span className="exam-tile-day">{date.getDate()}</span>
                  <span className="exam-tile-month">
                    {date.toLocaleDateString(LOCALE, { month: 'short' })}
                  </span>
                </div>
                <div className="exam-info">
                  <h2>{exam.subject}</h2>
                  <time dateTime={exam.date}>
                    {date.toLocaleDateString(LOCALE, { dateStyle: 'full' })}
                  </time>
                </div>
                <span className="exam-countdown">{formatCountdown(days)}</span>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}

export default ExamList
