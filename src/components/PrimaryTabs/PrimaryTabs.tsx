import type { ReactNode } from 'react'

/**
 * PrimaryTabs — Luna Design System "Primary Tab", node 29210:76495, built
 * from the underlying ".Primary-tab-chip" Active/Default states (node
 * 29288:110087). Figma's instance hardcodes six named tabs; this is a
 * generic `items` list driven by `activeKey`/`onChange` instead.
 */
export interface PrimaryTabItem {
  key: string
  label: string
  icon?: ReactNode
}

export interface PrimaryTabsProps {
  items: PrimaryTabItem[]
  activeKey: string
  onChange: (key: string) => void
  className?: string
}

export function PrimaryTabs({ items, activeKey, onChange, className }: PrimaryTabsProps) {
  return (
    <div className={['flex items-center', className].filter(Boolean).join(' ')} role="tablist">
      {items.map((item, index) => {
        const active = item.key === activeKey
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.key)}
            className={[
              'flex items-center gap-8 whitespace-nowrap px-16 py-8 text-[14px] leading-[20px]',
              active
                ? 'rounded-4 border-m border-brand-primary bg-white font-medium text-brand-primary'
                : [
                    'font-medium text-text-grey',
                    index < items.length - 1 ? 'border-r border-border-light-grey' : '',
                  ]
                    .filter(Boolean)
                    .join(' '),
            ].join(' ')}
          >
            {item.icon && <span className="size-20 shrink-0">{item.icon}</span>}
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
