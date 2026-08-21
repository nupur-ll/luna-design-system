import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Chip — Luna Design System "Chips", node 30681:90399.
 * Figma models this with 5 variant names (Default/Unselected/Selected/
 * Disabled/Inactive), but Default and Unselected render identically, and
 * Inactive is a muted-text variant of the same idea as Disabled — so this
 * collapses to the two states that actually need separate handling in
 * real code: `selected` and `disabled`.
 */
export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  icon?: ReactNode
  selected?: boolean
  className?: string
  children: ReactNode
}

export function Chip({ icon, selected, disabled, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center gap-8 rounded-8 border px-12 py-8 text-[14px] font-semibold leading-[20px]',
        disabled
          ? 'border-dashed border-border-grey bg-white text-text-grey-light'
          : selected
            ? 'border-overlay-brand-50 bg-overlay-brand-8 text-brand-primary'
            : 'border-border-grey bg-white text-text-secondary hover:bg-overlay-grey-8',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && <span className="size-20 shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
