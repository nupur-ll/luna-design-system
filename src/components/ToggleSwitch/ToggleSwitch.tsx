import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'

/**
 * ToggleSwitch — Luna Design System "Toggle Switch", node 29104:136792.
 * Figma has two sizes confirmed live: Small (44x24, 16px thumb) and
 * Large (64x32, 24px thumb) — components.md's "44x24" note only covered
 * the small size.
 */
export type ToggleSwitchSize = 'sm' | 'lg'

export interface ToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'size'> {
  size?: ToggleSwitchSize
  className?: string
}

const trackSizeClasses: Record<ToggleSwitchSize, string> = {
  sm: 'h-24 w-44',
  lg: 'h-32 w-64',
}

const thumbSizeClasses: Record<ToggleSwitchSize, string> = {
  sm: 'size-16',
  lg: 'size-24',
}

const thumbTranslateClasses: Record<ToggleSwitchSize, string> = {
  sm: 'group-has-[:checked]:translate-x-20',
  lg: 'group-has-[:checked]:translate-x-32',
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(function ToggleSwitch(
  { size = 'sm', className, id, ...rest },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label htmlFor={inputId} className={['group inline-flex cursor-pointer items-center', className].filter(Boolean).join(' ')}>
      <input ref={ref} id={inputId} type="checkbox" className="sr-only" {...rest} />
      <span
        className={[
          'relative flex shrink-0 items-center rounded-full bg-grey-80 p-4 transition-colors group-has-[:checked]:bg-brand-primary',
          trackSizeClasses[size],
        ].join(' ')}
      >
        <span
          className={['rounded-full bg-white transition-transform', thumbSizeClasses[size], thumbTranslateClasses[size]].join(' ')}
        />
      </span>
    </label>
  )
})
