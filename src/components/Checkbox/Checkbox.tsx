import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'

/**
 * Checkbox — Luna Design System "Check Box", node 12863:8291.
 * The checkmark is a small hand-drawn SVG rather than Figma's exported
 * asset — Figma's asset URLs expire after 7 days, and a plain checkmark
 * is simple enough to author directly rather than depend on that.
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label?: string
  className?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, id, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      className={['group inline-flex cursor-pointer items-center gap-8', className].filter(Boolean).join(' ')}
    >
      <input ref={ref} id={inputId} type="checkbox" className="sr-only" {...rest} />
      <span className="flex size-18 shrink-0 items-center justify-center rounded-2 border-2 border-border-grey transition-colors group-has-[:checked]:border-brand-primary group-has-[:checked]:bg-brand-primary">
        <svg viewBox="0 0 12 9" className="size-12 opacity-0 transition-opacity group-has-[:checked]:opacity-100">
          <path d="M1 4.5L4.2 7.5L11 1" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label && <span className="text-[14px] leading-[20px] text-text-primary">{label}</span>}
    </label>
  )
})
