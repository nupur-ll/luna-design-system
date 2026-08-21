import type { ReactNode } from 'react'
import { IconCaretLeft, IconUserCircle } from '../../icons/navIcons'

/**
 * PageHeader — Luna Design System "Header", node 30407:164518.
 *
 * Figma's Header variant bakes in a specific Secondary + Primary button
 * pair (plus a rarely-used tertiary button, credit-balance chip, and
 * refresh-timestamp chip that read as one-off instance overrides rather
 * than a generic header need). Rather than re-implement button variants
 * here, `actions` is a plain slot — pass this repo's own <Button> — which
 * also means Header stays in sync with Button for free. The credit-balance
 * chip, refresh-timestamp chip, and tertiary button aren't built here;
 * flagging that gap rather than guessing at a generic shape for them.
 */
export interface PageHeaderProps {
  title: string
  /** Defaults to a placeholder user-circle icon. */
  icon?: ReactNode
  subtext?: string
  backButton?: boolean
  onBack?: () => void
  /** e.g. <Button variant="secondary">...</Button><Button variant="primary">...</Button> */
  actions?: ReactNode
  className?: string
}

export function PageHeader({ title, icon, subtext, backButton, onBack, actions, className }: PageHeaderProps) {
  return (
    <header
      className={[
        'flex h-68 items-center justify-between gap-16 border-b-m border-border-light-grey bg-white px-24 py-12 shadow-container-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex min-w-0 flex-1 items-center gap-16">
        {backButton && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="flex size-28 shrink-0 items-center justify-center rounded-full hover:bg-surface-container-light-grey"
          >
            <IconCaretLeft className="size-24 text-text-primary" />
          </button>
        )}
        <div className="flex min-w-0 items-center gap-12">
          <span className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {icon ?? <IconUserCircle className="size-24 text-text-primary" />}
          </span>
          <div className="flex min-w-0 flex-col gap-4">
            <p className="truncate text-[20px] font-semibold leading-[24px] text-text-primary">{title}</p>
            {subtext && <p className="truncate text-[14px] font-medium leading-[20px] text-text-grey-dark">{subtext}</p>}
          </div>
        </div>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-12">{actions}</div>}
    </header>
  )
}
