import type { ReactNode } from 'react'
import { IconX } from '../../icons/formIcons'

/**
 * CreatorListCard — Luna Design System "Creator-List-Card", node
 * 29763:143783. A saved-list summary card: a 2x3 thumbnail grid plus name/
 * count/owner. Figma's two variants swap the order of the thumbnail grid
 * vs. the text block and swap the trailing action (Single-Select: a
 * full-width "Add to List" button, or an icon-only delete button next to
 * the title; Multi-select: a checkbox in the title row, no button) — kept
 * as one component with a `variant` prop plus the handlers that apply to
 * each, rather than two components, since the thumbnail grid and text
 * rows are otherwise identical.
 */
export interface CreatorListCardProps {
  variant?: 'single-select' | 'multi-select'
  listName: string
  creatorsLabel: string
  createdBy: string
  /** Up to 6 thumbnails — consumer-supplied <img>s, same slot convention as the other cards' `photo`. */
  thumbnails: ReactNode[]
  /** single-select only */
  onAddToList?: () => void
  addToListLabel?: string
  onDelete?: () => void
  /** multi-select only */
  selected?: boolean
  onToggleSelect?: () => void
  className?: string
}

export function CreatorListCard({
  variant = 'single-select',
  listName,
  creatorsLabel,
  createdBy,
  thumbnails,
  onAddToList,
  addToListLabel = 'Add to List',
  onDelete,
  selected,
  onToggleSelect,
  className,
}: CreatorListCardProps) {
  const grid = (
    <div className="grid w-full grid-cols-3 gap-8">
      {thumbnails.slice(0, 6).map((thumbnail, index) => (
        <div key={index} className="aspect-square overflow-hidden rounded-8 border-xs border-border-light-grey [&>*]:size-full [&>*]:object-cover">
          {thumbnail}
        </div>
      ))}
    </div>
  )

  const textBlock = (
    <div className="flex w-full flex-col gap-2">
      <p className="truncate text-[16px] font-bold leading-[20px] tracking-[-0.3px] text-text-primary">{listName}</p>
      <p className="text-[14px] font-medium leading-[20px] tracking-[0] text-text-grey-dark">{creatorsLabel}</p>
    </div>
  )

  const createdByRow = (
    <p className="w-full truncate text-[12px] leading-[16px] tracking-[-0.3px] text-text-grey">
      Created by <span className="font-medium">{createdBy}</span>
    </p>
  )

  return (
    <div
      className={['flex w-[240px] flex-col gap-8 rounded-12 border-xs border-border-grey bg-white p-12 shadow-container-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      {variant === 'single-select' ? (
        <>
          {grid}
          <div className="flex w-full flex-col gap-8">
            {textBlock}
            {createdByRow}
          </div>
          {onAddToList && (
            <button
              type="button"
              onClick={onAddToList}
              className="w-full rounded-4 border border-border-grey bg-white px-12 py-8 text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-text-primary"
            >
              {addToListLabel}
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              aria-label="Delete list"
              className="flex items-center justify-center rounded-4 border border-border-grey bg-white p-12"
            >
              <IconX className="size-16 text-text-primary" />
            </button>
          )}
        </>
      ) : (
        <>
          <div className="flex w-full items-start gap-12">
            {textBlock}
            <button
              type="button"
              onClick={onToggleSelect}
              aria-pressed={selected}
              className={[
                'flex size-[22px] shrink-0 items-center justify-center rounded-2 border-[2.462px] bg-white',
                selected ? 'border-brand-primary bg-brand-primary' : 'border-border-grey',
              ].join(' ')}
            >
              {selected && (
                <svg viewBox="0 0 16 16" className="size-14 text-white">
                  <path d="M3 8.5l3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex w-full flex-col gap-8">
            {grid}
            {createdByRow}
          </div>
        </>
      )}
    </div>
  )
}
