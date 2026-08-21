import { useEffect } from 'react'
import type { MouseEvent, ReactNode } from 'react'

/**
 * Modal — generic overlay shell. Figma's design system only defines the
 * *content card* for one specific case (see ConfirmationDialog.tsx below,
 * from "Confirmation Pop-Up", node 31120:165365) — there's no separate
 * "Modal" component with a backdrop/centering/close behavior anywhere in
 * the Luna Design file. Every real modal still needs that shell, so it's
 * built here as a thin, generic wrapper (dim backdrop, centers its
 * `children`, closes on backdrop click or Escape) that any content —
 * ConfirmationDialog or something else entirely — can be dropped into.
 * Flagging this as inferred rather than pulled from Figma, per this
 * repo's "flag gaps instead of improvising" rule.
 */
export interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  closeOnBackdropClick?: boolean
  className?: string
}

export function Modal({ open, onClose, children, closeOnBackdropClick = true, className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  function handleBackdropClick(e: MouseEvent<HTMLDivElement>) {
    if (closeOnBackdropClick && e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay-black-50 p-24"
      onClick={handleBackdropClick}
    >
      <div className={className}>{children}</div>
    </div>
  )
}
