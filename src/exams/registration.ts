import { alsIsoDatum, tageAddieren } from '../utils/datum.ts'
import type { Exam } from './exams'

/** Die Anmeldefrist endet eine Woche vor der Prüfung, bis dann ist auch die Abmeldung möglich. */
const DEADLINE_DAYS_BEFORE = 7

export function registrationDeadline(exam: Exam) {
  return alsIsoDatum(tageAddieren(new Date(`${exam.date}T00:00:00`), -DEADLINE_DAYS_BEFORE))
}

export function isRegistrationOpen(exam: Exam, today: string) {
  return today <= registrationDeadline(exam)
}

// Wie die Konten in auth.js liegen die Anmeldungen im localStorage, getrennt pro Person
const STORAGE_PREFIX = 'studyhub.pruefungsanmeldungen.'

// Testdaten: Mathematik (Frist vorbei) und SQL (Frist läuft) sind schon angemeldet
const TEST_REGISTRATIONS = [3, 7]

export function loadRegistrations(email: string): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + email)
    return raw ? JSON.parse(raw) : TEST_REGISTRATIONS
  } catch {
    return TEST_REGISTRATIONS
  }
}

export function saveRegistrations(email: string, examIds: number[]) {
  try {
    localStorage.setItem(STORAGE_PREFIX + email, JSON.stringify(examIds))
  } catch {
    /* ignorieren, die Anmeldung gilt dann nur bis zum Neuladen */
  }
}
