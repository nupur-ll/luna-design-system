import type { ReactNode } from 'react'

/**
 * StatusChip — Luna Design System "Status", node 31490:184434.
 * Figma's "Postive" is a source-doc typo for "Positive" — corrected here.
 */
export type StatusChipVariant = 'default' | 'positive' | 'negative' | 'processing' | 'incomplete'

export interface StatusChipProps {
  variant?: StatusChipVariant
  className?: string
  children: ReactNode
}

const variantClasses: Record<StatusChipVariant, string> = {
  default: 'bg-surface-container-light-grey text-text-grey',
  positive: 'bg-success-light text-success-primary',
  negative: 'bg-overlay-red-8 text-error-primary',
  processing: 'bg-warning-light text-warning-primary',
  incomplete: 'border border-dashed border-border-grey bg-white text-text-grey',
}

export function StatusChip({ variant = 'default', className, children }: StatusChipProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center rounded-full px-12 py-4 text-[12px] font-semibold leading-[16px] tracking-[-0.3px]',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
