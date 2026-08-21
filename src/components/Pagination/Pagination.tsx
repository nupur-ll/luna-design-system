import { IconCaretLeft, IconCaretRight } from '../../icons/navIcons'

/**
 * Pagination — Luna Design System "Pagination", node 29542:131354.
 * "1–15 of 300" plus a prev/next control. Figma's copy is a fixed string;
 * this takes the three numbers as props and formats it the same way.
 */
export interface PaginationProps {
  from: number
  to: number
  total: number
  onPrevious?: () => void
  onNext?: () => void
  previousDisabled?: boolean
  nextDisabled?: boolean
  className?: string
}

export function Pagination({
  from,
  to,
  total,
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  className,
}: PaginationProps) {
  return (
    <div className={['flex items-center justify-center gap-12 py-12', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={previousDisabled}
        aria-label="Previous page"
        className="flex size-24 shrink-0 items-center justify-center rounded-full border border-border-grey text-text-grey-dark transition-colors disabled:opacity-40 enabled:hover:border-brand-primary enabled:hover:text-brand-primary"
      >
        <IconCaretLeft className="size-16" />
      </button>
      <p className="flex items-center gap-4 text-[14px] font-semibold leading-[20px] whitespace-nowrap">
        <span className="text-text-primary">
          {from}–{to}
        </span>
        <span className="text-text-grey">of</span>
        <span className="text-text-grey">{total}</span>
      </p>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next page"
        className="flex size-24 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white transition-colors disabled:opacity-40 enabled:hover:bg-brand-dark"
      >
        <IconCaretRight className="size-16" />
      </button>
    </div>
  )
}
