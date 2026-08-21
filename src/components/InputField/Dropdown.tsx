import { useId, useState } from 'react'
import { IconSearch } from '../../icons/navIcons'
import { IconCaretDown } from '../../icons/formIcons'
import { InputChip } from './InputChip'
import { Checkbox } from '../Checkbox'

/**
 * Dropdown — Luna Design System, "Input-field" Type=Dropdown (node
 * 29104:135019). A closed field (placeholder or selected-value chip(s) +
 * caret) that opens a panel with a search bar and a checkbox option list.
 *
 * Figma's Filled-state screenshot only ever shows one selected chip inline
 * ("#springwishcare ×"), but the option list uses checkboxes, which is a
 * multi-select affordance — the file doesn't show what 2+ selections look
 * like in the closed field. This renders each selection as its own chip
 * (reusing Action-field's chip look) and collapses beyond
 * `maxVisibleTags`, same convention as InputField's tag list, since that's
 * the closest documented pattern in this file — flagging that inference
 * rather than presenting it as directly observed.
 *
 * Figma's ".Dropdown-variations" sub-component also has a "Single-select"
 * type (node 29087:48626) — same panel, but no checkboxes, and picking an
 * option replaces the value and closes the panel instead of accumulating.
 * `type` switches between the two; `value`/`onChange` stay array-shaped
 * either way (single-select just yields a 0-or-1-length array) so this
 * doesn't need a second, differently-typed prop pair.
 */
export interface DropdownOption {
  label: string
  value: string
}

export interface DropdownProps {
  label: string
  options: DropdownOption[]
  value: string[]
  onChange: (value: string[]) => void
  type?: 'multi-select' | 'single-select'
  required?: boolean
  placeholder?: string
  searchPlaceholder?: string
  error?: string
  disabled?: boolean
  maxVisibleTags?: number
  className?: string
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  type = 'multi-select',
  required,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search here',
  error,
  disabled,
  maxVisibleTags = 3,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const listId = useId()
  const isMultiSelect = type === 'multi-select'

  const filtered = options.filter((option) => option.label.toLowerCase().includes(query.trim().toLowerCase()))
  const selected = options.filter((option) => value.includes(option.value))
  const visible = selected.slice(0, maxVisibleTags)
  const overflowCount = selected.length - visible.length

  function toggle(optionValue: string) {
    if (!isMultiSelect) {
      onChange([optionValue])
      setOpen(false)
      return
    }
    if (value.includes(optionValue)) onChange(value.filter((v) => v !== optionValue))
    else onChange([...value, optionValue])
  }

  return (
    <div className={['relative flex w-full flex-col gap-4', className].filter(Boolean).join(' ')}>
      <label className="flex items-center gap-4 text-[14px] font-semibold leading-[20px] text-text-grey-dark">
        {label}
        {required && <span className="text-[16px] leading-[20px] tracking-[-0.3px]">*</span>}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={listId}
        className={[
          'flex min-h-44 w-full items-center gap-12 rounded-8 border bg-white px-16 py-12 text-left',
          error ? 'border-error-primary' : disabled ? 'border-border-grey bg-surface-container-light-grey' : open ? 'border-brand-primary' : 'border-border-grey',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="flex flex-1 flex-wrap items-center gap-4">
          {selected.length === 0 ? (
            <span className="text-[14px] font-medium leading-[20px] text-text-grey">{placeholder}</span>
          ) : (
            <>
              {/*
               * Display-only here (no per-chip remove button): the chip
               * itself sits inside the field's own toggle <button>, and a
               * nested <button> for removal would be invalid HTML (browsers
               * auto-close the outer button when they hit an inner one).
               * Unchecking an option in the open panel below is how a
               * selection gets removed.
               */}
              {visible.map((option) => (
                <InputChip key={option.value} text={option.label} />
              ))}
              {overflowCount > 0 && <InputChip text={`+${overflowCount} more`} />}
            </>
          )}
        </span>
        <IconCaretDown className={`size-20 shrink-0 text-text-grey transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && !disabled && (
        <div
          id={listId}
          className="absolute top-full z-10 mt-4 flex max-h-[224px] w-full flex-col gap-4 overflow-y-auto rounded-8 border-xs border-border-grey bg-white p-8 shadow-container-4"
        >
          <div className="flex shrink-0 items-center gap-8 rounded-8 border border-border-grey px-12 py-8">
            <IconSearch className="size-20 shrink-0 text-text-grey" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-[12px] leading-[16px] tracking-[-0.3px] text-text-primary placeholder:text-text-grey"
            />
          </div>
          <div className="flex flex-col">
            {filtered.length === 0 ? (
              <p className="px-8 py-12 text-[12px] leading-[16px] text-text-grey">No matches</p>
            ) : (
              filtered.map((option) =>
                isMultiSelect ? (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    checked={value.includes(option.value)}
                    onChange={() => toggle(option.value)}
                    className="h-44 w-full shrink-0 justify-start rounded-4 px-8 hover:bg-surface-container-light-grey [&_span:last-child]:font-semibold"
                  />
                ) : (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggle(option.value)}
                    className="flex h-44 w-full shrink-0 items-center rounded-4 px-8 text-left text-[14px] font-semibold leading-[20px] text-text-primary hover:bg-surface-container-light-grey"
                  >
                    {option.label}
                  </button>
                ),
              )
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="flex items-center gap-4 text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-error-primary">
          {error}
        </p>
      )}
    </div>
  )
}
