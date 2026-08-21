import type { ReactNode } from 'react'

/**
 * SecondaryTabs — Luna Design System "Secondary Tab/First", node
 * 29288:112150, built from the underlying ".Secondary-Tab-chip"
 * Active/Inactive states (node 29500:198895). A pill-style tab group
 * inside a rounded grey track, each tab optionally showing a count.
 */
export interface SecondaryTabItem {
  key: string
  label: string
  count?: number
  icon?: ReactNode
}

export interface SecondaryTabsProps {
  items: SecondaryTabItem[]
  activeKey: string
  onChange: (key: string) => void
  className?: string
}

export function SecondaryTabs({ items, activeKey, onChange, className }: SecondaryTabsProps) {
  return (
    <div
      className={[
        'inline-flex items-center gap-4 rounded-full bg-grey-100 p-4 shadow-[inset_0_0_6px_0_rgba(0,0,0,0.04)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="tablist"
    >
      {items.map((item) => {
        const active = item.key === activeKey
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={[
              'flex h-36 items-center gap-4 whitespace-nowrap rounded-full px-20 py-8 text-[14px] leading-[20px]',
              active ? 'bg-white font-semibold text-text-secondary shadow-container-2' : 'font-medium text-text-grey-dark',
            ].join(' ')}
          >
            {item.icon && <span className="size-20 shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.count != null && <span>({item.count})</span>}
          </button>
        )
      })}
    </div>
  )
}
