import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'

/**
 * RadioButton — Luna Design System "Radio Buttons", node 10635:1357.
 *
 * components.md (the design-system skill's summary doc) describes the
 * selected state as "filled circle, --color-bg-brand fill", which reads
 * like a solid disc — but the live Figma screenshot for this exact node
 * shows a ring-with-center-dot (purple ring, white gap, small purple dot),
 * the standard radio look. The screenshot is the ground truth here; the
 * summary doc was imprecise. Built from the screenshot, not the doc.
 */
export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label?: string
  className?: string
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
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
      <input ref={ref} id={inputId} type="radio" className="sr-only" {...rest} />
      <span className="relative flex size-24 shrink-0 items-center justify-center rounded-full border-2 border-border-grey transition-colors group-has-[:checked]:border-brand-primary">
        {/* 10px is a one-off decorative dot size, not a layout spacing
            value, so this intentionally uses an arbitrary value instead
            of adding an off-scale (non-multiple-of-4) key to the shared
            spacing scale. */}
        <span className="size-[10px] rounded-full bg-transparent transition-colors group-has-[:checked]:bg-brand-primary" />
      </span>
      {label && <span className="text-[14px] leading-[20px] text-text-primary">{label}</span>}
    </label>
  )
})
