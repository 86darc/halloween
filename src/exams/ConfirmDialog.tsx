import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  title: string
  text: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** Modaler Dialog des Browsers: hält den Fokus fest und schliesst mit Esc. */
function ConfirmDialog({ title, text, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog ref={ref} className="confirm" aria-labelledby="confirm-title" onCancel={onCancel}>
      <h2 id="confirm-title">{title}</h2>
      <p>{text}</p>
      <div className="confirm-actions">
        <button type="button" className="offer-button offer-button--secondary" onClick={onCancel}>
          Abbrechen
        </button>
        <button type="button" className="offer-button" onClick={onConfirm} autoFocus>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}

export default ConfirmDialog
