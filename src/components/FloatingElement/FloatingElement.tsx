import type { ReactNode } from 'react'
import { IconInfo, IconWarningCircleFilled } from '../../icons/common'

/**
 * FloatingElement — Luna Design System "Floating-Element", node
 * 29317:125782. A dark, floating bar meant to sit fixed at the bottom (or
 * wherever) of a screen. Two Figma variants:
 *  - "Action": a bulk-action bar (selection count + up to two buttons),
 *    plus an optional info row underneath.
 *  - "Toast": a compact one-line status message with a leading icon.
 *
 * Figma's Action buttons are plain filled/outlined rectangles, not
 * instances of this repo's own `<Button>` — its 44/36/32-height scale and
 * border-radius-4 primary/secondary styling don't match what's on the
 * Floating-Element canvas (white-fill vs. dark-bordered, no shared
 * token), so these are built to the actual pixels here rather than forced
 * through the existing Button component.
 */
export interface FloatingElementProps {
  type?: 'action' | 'toast'
  className?: string
  /** Action type */
  text?: ReactNode
  primaryButtonText?: string
  onPrimaryButtonClick?: () => void
  secondaryButtonText?: string
  onSecondaryButtonClick?: () => void
  infoText?: string
  /** Toast type */
  icon?: ReactNode
  toastText?: ReactNode
}

export function FloatingElement({
  type = 'action',
  className,
  text = '43 Creators Selected:',
  primaryButtonText = 'Remove',
  onPrimaryButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
  infoText,
  icon,
  toastText = '43 Creators Selected:',
}: FloatingElementProps) {
  if (type === 'toast') {
    return (
      <div
        className={[
          'flex items-center gap-12 rounded-8 bg-black px-12 py-8 drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="size-32 shrink-0">{icon ?? <IconWarningCircleFilled className="size-full" />}</span>
        <p className="text-[14px] font-semibold leading-[20px] tracking-[0] text-white">{toastText}</p>
      </div>
    )
  }

  return (
    <div
      className={['flex flex-col items-start gap-12 rounded-8 bg-black px-12 py-8 drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex w-full items-center gap-12">
        <p className="shrink-0 text-[14px] font-semibold leading-[20px] tracking-[0] text-white">{text}</p>
        <div className="flex flex-1 items-center gap-8">
          <button
            type="button"
            onClick={onPrimaryButtonClick}
            className="flex flex-1 items-center justify-center rounded-4 bg-white px-16 py-8 text-[14px] font-semibold leading-[20px] tracking-[0] text-text-primary"
          >
            {primaryButtonText}
          </button>
          {secondaryButtonText && (
            <button
              type="button"
              onClick={onSecondaryButtonClick}
              className="flex flex-1 items-center justify-center rounded-4 border border-white bg-black px-16 py-8 text-[14px] font-semibold leading-[20px] tracking-[0] text-white"
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
      {infoText && (
        <div className="flex items-center justify-center gap-8">
          <IconInfo className="size-16 shrink-0" />
          <p className="text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-white">{infoText}</p>
        </div>
      )}
    </div>
  )
}
