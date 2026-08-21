import type { ReactNode } from 'react'
import { IconCheckCircle } from '../../icons/common'
import { IconGift, IconPlus } from '../../icons/navIcons'

/**
 * CreatorCard — Luna Design System "Creator Card", node 29276:4298
 * (documented in the file under both "Creator Card" and "Discovery Card"
 * — same component, two doc-page names).
 *
 * Platform distinction (badge pair + handle row) was intentionally
 * dropped — confirmed directly rather than inferred — so this card no
 * longer takes a `platform` prop; the top-right control is real `selected`
 * state instead (Default: a "+" add button; Selected: a green CheckCircle
 * badge with no button chrome).
 *
 * Figma's stat row is always exactly 3 cells (e.g. Followers / Eng. Rate /
 * Median Views) with dividers between — kept as a fixed 3-tuple prop
 * (`stats`) rather than a free-length array, since the dividers assume
 * exactly 2 gaps and a generic N-length list would need different layout.
 */
export interface CreatorCardStat {
  value: string
  label: string
}

export interface CreatorCardProps {
  /** The cover photo — consumer-supplied <img>, same slot convention as ProfileCard's `photo`. */
  photo: ReactNode
  creatorName: string
  verifiedContact?: boolean
  gifted?: boolean
  lehlahUser?: boolean
  selected?: boolean
  onToggleSelect?: () => void
  niches?: string[]
  stats: [CreatorCardStat, CreatorCardStat, CreatorCardStat]
  className?: string
}

export function CreatorCard({
  photo,
  creatorName,
  verifiedContact,
  gifted,
  lehlahUser,
  selected,
  onToggleSelect,
  niches = [],
  stats,
  className,
}: CreatorCardProps) {
  const visibleNiches = niches.slice(0, 2)
  const overflowCount = niches.length - visibleNiches.length

  return (
    <div
      className={['flex w-264 max-w-[342px] flex-col items-center overflow-hidden rounded-12 bg-white shadow-container-4', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative flex aspect-square w-full flex-col items-start justify-end overflow-hidden p-12">
        <div className="absolute inset-0 [&>*]:size-full [&>*]:object-cover">{photo}</div>
        <div className="relative flex w-full items-start justify-end">
          {selected ? (
            <IconCheckCircle className="size-36 shrink-0" />
          ) : (
            <button
              type="button"
              onClick={onToggleSelect}
              aria-pressed={selected}
              className="flex size-28 shrink-0 items-center justify-center rounded-4 border border-border-grey bg-white"
            >
              <IconPlus className="size-16 text-text-primary" />
            </button>
          )}
        </div>
        {verifiedContact && (
          <div className="relative mt-8 flex items-center gap-4 rounded-12 border-xs border-success-primary bg-success-light px-8 py-4">
            <IconCheckCircle className="size-14" />
            <span className="text-[11px] font-medium text-success-primary">Verified Contact</span>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-8 p-12">
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center gap-8">
            <p className="truncate text-[14px] font-bold leading-[20px] tracking-[0] text-text-primary">{creatorName}</p>
            {(lehlahUser || gifted) && (
              <span className="flex shrink-0 items-center gap-2 rounded-4 bg-surface-container-light-grey px-4 py-2">
                {lehlahUser && <span className="text-[10px] font-bold text-brand-primary">L.</span>}
                {gifted && <IconGift className="size-12 text-brand-primary" />}
              </span>
            )}
          </div>
          {visibleNiches.length > 0 && (
            <div className="flex items-center gap-4 overflow-hidden rounded-8">
              <div className="flex items-center gap-[6px] overflow-hidden">
                {visibleNiches.map((niche, index) => (
                  <span key={niche} className="flex items-center gap-[6px]">
                    {index > 0 && <span className="size-[3px] shrink-0 rounded-full bg-text-grey" />}
                    <span className="truncate text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-text-grey-dark">{niche}</span>
                  </span>
                ))}
              </div>
              {overflowCount > 0 && <span className="shrink-0 text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-brand-primary">+{overflowCount}</span>}
            </div>
          )}
        </div>

        <div className="flex w-full items-start rounded-8 bg-overlay-grey-16 px-2 py-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-1 items-center">
              {index > 0 && <div className="h-16 w-0.5 shrink-0 bg-border-light-grey" />}
              <div className="flex flex-1 flex-col items-center gap-2 p-4 text-center">
                <p className="text-[12px] font-bold leading-[16px] tracking-[-0.3px] text-text-secondary">{stat.value}</p>
                <p className="text-[10px] leading-[16px] text-text-grey">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
