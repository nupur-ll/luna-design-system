import { useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { IconMagnifyingGlass, IconXCircle } from '../../icons/common'
import { IconX } from '../../icons/formIcons'

/**
 * SearchBar — Luna Design System "Search Bar", node 29483:86294.
 *
 * Figma models two `type`s (Discovery/Generic) crossed with three `state`s
 * (Default/Filled/Clicked). "Filled" is just "Default, but has a value" —
 * same as InputField's Default type — so it's not a separate prop here,
 * it falls out of `value` being non-empty. "Clicked" is really "focused/
 * open", which for the plain Generic bar is CSS `:focus-within` territory,
 * but for the Discovery bar it also reveals a results dropdown, which
 * needs real state — so `open` is a controlled-ish prop (internal
 * useState, seeded by focus) only for `type="discovery"`.
 *
 * Figma's Discovery-Clicked screenshot bakes in one fixed set of "recent
 * searches" chips and one fixed set of result cards (all "Tarini Shetty").
 * Those are obviously per-search data, not part of the component, so both
 * are generic arrays the consumer supplies (`recentSearches`, `results`),
 * same treatment as Navbar's `items` or Dropdown's `options`.
 */
export interface SearchResultItem {
  id: string
  name: string
  handle: string
  avatar?: ReactNode
}

export interface SearchBarProps {
  type?: 'discovery' | 'generic'
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
  /** Discovery-only: recent search chips shown above the results. */
  recentSearches?: string[]
  onRemoveRecentSearch?: (index: number) => void
  onSelectRecentSearch?: (value: string) => void
  /** Discovery-only: the result cards for the current query. */
  results?: SearchResultItem[]
  onSelectResult?: (result: SearchResultItem) => void
  noResultsMessage?: string
}

export function SearchBar({
  type = 'generic',
  value,
  onChange,
  onSubmit,
  placeholder = type === 'discovery' ? 'Search creators here by name, username' : 'Search',
  className,
  recentSearches = [],
  onRemoveRecentSearch,
  onSelectRecentSearch,
  results = [],
  onSelectResult,
  noResultsMessage = 'No results found',
}: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const resultsId = useId()
  const isDiscovery = type === 'discovery'
  const showDropdown = isDiscovery && open && (recentSearches.length > 0 || results.length > 0 || value.length > 0)

  return (
    <div
      ref={containerRef}
      className={['relative', isDiscovery ? 'w-600' : 'w-398', className].filter(Boolean).join(' ')}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <div
        className={[
          'flex items-center gap-12 rounded-8 border bg-white px-16 py-12',
          isDiscovery ? 'shadow-container-4' : '',
          open ? 'border-brand-primary' : 'border-border-grey',
        ].join(' ')}
      >
        <IconMagnifyingGlass className="size-20 shrink-0 text-text-grey" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit?.(value)
          }}
          placeholder={placeholder}
          aria-expanded={isDiscovery ? open : undefined}
          aria-controls={isDiscovery ? resultsId : undefined}
          className={[
            'min-w-0 flex-1 bg-transparent text-[14px] leading-[20px] tracking-[0] placeholder:font-medium placeholder:text-text-grey',
            value ? 'font-semibold text-text-primary' : 'font-medium',
          ].join(' ')}
        />
        {value && (
          <button type="button" onClick={() => onChange('')} aria-label="Clear search" className="shrink-0">
            <IconXCircle className="size-20 text-text-grey" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          id={resultsId}
          className="absolute top-full z-10 mt-4 flex w-full flex-col gap-16 overflow-hidden rounded-8 bg-white p-12 shadow-container-2"
        >
          {recentSearches.length > 0 && (
            <>
              <div className="flex flex-col gap-12">
                <p className="text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-text-grey">Recent searches</p>
                <div className="flex flex-wrap gap-8">
                  {recentSearches.map((search, index) => (
                    <button
                      key={`${search}-${index}`}
                      type="button"
                      onClick={() => onSelectRecentSearch?.(search)}
                      className="flex items-center gap-8 rounded-8 border-xs border-overlay-brand-8 bg-overlay-brand-4 px-8 py-4"
                    >
                      <span className="text-[14px] font-medium leading-[20px] text-text-secondary">{search}</span>
                      {onRemoveRecentSearch && (
                        <IconX
                          className="size-14 shrink-0 text-text-grey"
                          onClick={(e) => {
                            e.stopPropagation()
                            onRemoveRecentSearch(index)
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-0.5 w-full bg-border-light-grey" />
            </>
          )}

          {value &&
            (results.length === 0 ? (
              <p className="text-[12px] font-medium leading-[16px] text-text-grey">{noResultsMessage}</p>
            ) : (
              <div className="flex flex-col gap-12">
                <p className="text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-text-grey">
                  Search results for &lsquo;{value}&rsquo;
                </p>
                <div className="flex flex-wrap gap-8">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => onSelectResult?.(result)}
                      className="flex w-[186.667px] items-center gap-8 rounded-12 border-xs border-overlay-brand-8 p-8 text-left"
                    >
                      <span className="size-44 shrink-0 overflow-hidden rounded-8 border-xs border-border-light-grey bg-surface-container-light-grey">
                        {result.avatar}
                      </span>
                      <span className="flex min-w-0 flex-col text-[12px] leading-[16px] tracking-[-0.3px]">
                        <span className="truncate font-semibold text-brand-primary">{result.name}</span>
                        <span className="truncate text-text-grey">@{result.handle}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
