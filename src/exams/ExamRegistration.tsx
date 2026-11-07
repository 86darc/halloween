import { useState } from 'react'
import { alsIsoDatum } from '../utils/datum.ts'
import ConfirmDialog from './ConfirmDialog.tsx'
import { getUpcomingExams, type Exam } from './exams'
import { isRegistrationOpen, loadRegistrations, registrationDeadline, saveRegistrations } from './registration.ts'
import { testExams } from './testExams'
import type { Benutzer } from '../types.ts'
import './ExamRegistration.css'

const LOCALE = 'de-CH'

function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(LOCALE, options)
}

function statusText(registered: boolean, open: boolean) {
  if (registered) return 'Angemeldet'
  return open ? 'Nicht angemeldet' : 'Anmeldefrist abgelaufen'
}

interface ExamRegistrationProps {
  benutzer: Benutzer
}

function ExamRegistration({ benutzer }: ExamRegistrationProps) {
  const [today] = useState(() => alsIsoDatum(new Date()))
  const [registrations, setRegistrations] = useState(() => loadRegistrations(benutzer.email))
  // Prüfung, für die gerade der Bestätigungsdialog offen ist
  const [pending, setPending] = useState<Exam | null>(null)
  const [message, setMessage] = useState('')
  const exams = getUpcomingExams(testExams, today)
  const pendingRegistered = pending !== null && registrations.includes(pending.id)

  function askToToggle(exam: Exam) {
    setMessage('')
    setPending(exam)
  }

  function toggleRegistration(exam: Exam) {
    setPending(null)
    // Nach Ablauf der Frist ist weder An- noch Abmeldung möglich
    if (!isRegistrationOpen(exam, today)) return

    const wasRegistered = registrations.includes(exam.id)
    const next = wasRegistered ? registrations.filter((id) => id !== exam.id) : [...registrations, exam.id]
    saveRegistrations(benutzer.email, next)
    setRegistrations(next)
    setMessage(
      wasRegistered
        ? `Du bist von der Prüfung ${exam.subject} abgemeldet.`
        : `Du bist für die Prüfung ${exam.subject} am ${formatDate(exam.date, { dateStyle: 'long' })} angemeldet.`,
    )
  }

  return (
    <section className="registration">
      <header className="registration-header">
        <h1>Prüfungsanmeldung</h1>
        <p>Melde dich bis eine Woche vor der Prüfung an oder ab.</p>
      </header>

      <p className="registration-message" role="status">
        {message}
      </p>

      {pending && (
        <ConfirmDialog
          title={pendingRegistered ? 'Abmeldung bestätigen' : 'Anmeldung bestätigen'}
          text={
            pendingRegistered
              ? `Möchtest du dich wirklich von der Prüfung ${pending.subject} abmelden?`
              : `Möchtest du dich für die Prüfung ${pending.subject} am ${formatDate(pending.date, { dateStyle: 'full' })} anmelden?`
          }
          confirmLabel={pendingRegistered ? 'Abmelden' : 'Anmelden'}
          onConfirm={() => toggleRegistration(pending)}
          onCancel={() => setPending(null)}
        />
      )}

      {exams.length === 0 ? (
        <p className="registration-empty">Zurzeit sind keine Prüfungen ausgeschrieben.</p>
      ) : (
        <>
          <h2 className="registration-title">Verfügbare Prüfungen</h2>
          <ul className="registration-list">
            {exams.map((exam) => {
              const registered = registrations.includes(exam.id)
              const open = isRegistrationOpen(exam, today)
              const deadline = registrationDeadline(exam)

              return (
                <li key={exam.id} className={registered ? 'offer offer--registered' : 'offer'}>
                  <div className="offer-info">
                    <h3>{exam.subject}</h3>
                    <time dateTime={exam.date}>
                      {formatDate(exam.date, { dateStyle: 'full' })}
                    </time>
                    <span className="offer-deadline">
                      {open ? 'Anmeldung bis ' : 'Anmeldefrist war am '}
                      <time dateTime={deadline}>
                        {formatDate(deadline, { weekday: 'short', day: 'numeric', month: 'long' })}
                      </time>
                    </span>
                  </div>
                  <div className="offer-actions">
                    <span className={open || registered ? 'offer-status' : 'offer-status offer-status--closed'}>
                      {statusText(registered, open)}
                    </span>
                    {open ? (
                      <button
                        type="button"
                        className={registered ? 'offer-button offer-button--secondary' : 'offer-button'}
                        onClick={() => askToToggle(exam)}
                        aria-label={registered ? `Von ${exam.subject} abmelden` : `Für ${exam.subject} anmelden`}
                      >
                        {registered ? 'Abmelden' : 'Anmelden'}
                      </button>
                    ) : (
                      registered && <span className="offer-hint">Abmeldung nicht mehr möglich</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}

export default ExamRegistration
