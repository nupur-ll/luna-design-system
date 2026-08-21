import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Chip — Luna Design System "Chips", node 30681:90399.
 * Figma's 5 variants render as 5 real, distinct looks (re-verified against
 * live Figma — Default and Unselected differ by a border, Inactive and
 * Disabled differ by border style/shadow, not just text color), so each
 * one is its own `state` rather than collapsed booleans.
 */
export type ChipState = 'default' | 'unselected' | 'selected' | 'inactive' | 'disabled'

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled'> {
  icon?: ReactNode
  state?: ChipState
  className?: string
  children: ReactNode
}

const stateClasses: Record<ChipState, string> = {
  default: 'border-border-grey bg-white text-text-secondary hover:bg-overlay-grey-8',
  unselected: 'border-transparent bg-white text-text-secondary hover:bg-overlay-grey-8',
  selected: 'border-overlay-brand-50 bg-overlay-brand-8 text-brand-primary',
  inactive: 'border-border-grey bg-overlay-grey-8 text-text-grey',
  disabled: 'border-dashed border-border-grey bg-white text-text-grey-light shadow-container-4',
}

export function Chip({ icon, state = 'default', className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      disabled={state === 'disabled'}
      className={['inline-flex items-center gap-8 rounded-8 border px-12 py-8 text-[14px] font-semibold leading-[20px]', stateClasses[state], className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && <span className="size-20 shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
