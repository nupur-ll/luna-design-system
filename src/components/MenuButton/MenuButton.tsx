import { useState } from 'react'
import type { ReactNode } from 'react'

/**
 * MenuButton — Luna Design System "Menu-button", node 29174:2274.
 * A button that opens a simple option list. Figma's "Focused" (open) and
 * "Selected" (has a value) states are handled here with real state
 * (`open`, and whether a value is set) instead of separate style props.
 *
 * Polish pass: Figma's "Dropdown-variations" panel models a `showScroll`
 * state — a fixed-height panel (≈5 options tall) with a thin custom
 * scrollbar track/thumb — for option lists too long to show in full. The
 * first pass here let the panel grow unbounded instead; it now caps at
 * ~5 rows (184px) and scrolls, matching that variant. True scrollbar
 * *color* styling (Figma's grey-40 thumb on a light-grey track) isn't
 * something Tailwind's utility classes reach without a plugin, so this
 * uses the browser's native scrollbar rather than pixel-matching that —
 * flagged here rather than silently approximated.
 */
export interface MenuButtonOption {
  label: string
  value: string
  /** Leading glyph shown before the label in the open panel — same slot convention as Button's leftIcon. */
  icon?: ReactNode
  /** Small 24px rounded brand/org logo shown before the label (after `icon`, if both are set) — e.g. for a brand switcher. */
  avatar?: ReactNode
}

export interface MenuButtonProps {
  label: string
  options: MenuButtonOption[]
  value?: string
  onChange?: (value: string) => void
  leftIcon?: ReactNode
  className?: string
}

export function MenuButton({ label, options, value, onChange, leftIcon, className }: MenuButtonProps) {
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.value === value)

  return (
    <div className={['relative inline-block', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={[
          'inline-flex items-center gap-12 rounded-8 border bg-white px-12 py-8 text-[14px] font-semibold leading-[20px] text-text-primary',
          selected || open ? 'border-brand-secondary' : 'border-border-grey',
          selected ? 'bg-overlay-brand-4' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="flex items-center gap-8">
          {leftIcon && <span className="size-16 shrink-0">{leftIcon}</span>}
          <span>{selected?.label ?? label}</span>
        </span>
        <svg viewBox="0 0 16 16" className={`size-16 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-10 mt-4 min-w-[160px] w-full max-h-[184px] overflow-y-auto rounded-8 border-[0.5px] border-border-grey bg-white p-8 shadow-container-4">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange?.(option.value)
                setOpen(false)
              }}
              className="flex h-36 w-full items-center gap-8 rounded-4 px-4 text-left text-[14px] font-semibold leading-[20px] text-text-primary hover:bg-surface-container-light-grey"
            >
              {option.icon && <span className="size-20 shrink-0">{option.icon}</span>}
              {option.avatar && (
                <span className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-4 border-xs border-border-light-grey [&>*]:size-full [&>*]:object-cover">
                  {option.avatar}
                </span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
