import { useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { ToggleSwitch } from '../ToggleSwitch'
import { InputField } from '../InputField'
import { IconCaretDown } from '../../icons/formIcons'

/**
 * DiscoveryFilterPanel — Luna Design System "updated filter" component set,
 * node 31352:174158 (variants Type=Brand/Admin). This is the single
 * biggest gap between what Figma shows and what a real prop API can be:
 * the file bakes in ~18 fixed sections (App Users/Gifted/Blue Tick
 * toggles, a Platform checkbox pair, Instagram Followers & Youtube
 * Subscribers range inputs, Brands/Gender/Age Group/Creator
 * City/Price Range/Campaign Report/Agency Name/Content Niche/Product
 * Category/Creator Type/Creator Aesthetic/Content Language checkbox
 * lists, Monthly Max Sales, Sale Range) with real option data
 * (brand names, city names, price bands) that's obviously per-tenant
 * content, not part of the component.
 *
 * Every one of those sections is actually one of a handful of repeating
 * shapes — a row of icon+label+ToggleSwitch, a titled checkbox list with
 * an optional "Show More" expand, a titled pair of min/max numeric
 * inputs, a titled pair of select-style dropdown inputs, or (added when
 * the "compact"/"compact-selected" variants surfaced it) a single
 * closed-field dropdown trigger — Figma just repeats the same shapes with
 * different content. So rather than modeling "Brands" and "Content
 * Niche" and "Creator City" as separate anything, this is a
 * `sections: FilterSection[]` list where each entry is a
 * `{ kind: 'toggles' | 'checkboxes' | 'range' | 'select-range' | 'select', ... }`
 * describing one of those shapes — the consumer supplies which sections
 * exist and what's in them, same treatment Navbar/Table/Dropdown give
 * Figma's other fixed instance lists.
 *
 * The `select` kind's closed field (`Select X` placeholder / purple-tinted
 * "Selected (N)" when filled) is confirmed from Figma's "compact" variant
 * screenshots; its open option-list panel wasn't shown in those pulls, so
 * it's built here as a checkbox list (same convention as the `checkboxes`
 * kind) rather than asserted against a specific Figma panel — flagging
 * that inference rather than presenting it as directly observed.
 */
export interface ToggleFilterItem {
  key: string
  icon?: ReactNode
  label: string
}

export interface CheckboxFilterOption {
  key: string
  label: string
}

export type FilterSection =
  | { kind: 'toggles'; items: ToggleFilterItem[] }
  | { kind: 'checkboxes'; key: string; title: string; options: CheckboxFilterOption[]; initialVisibleCount?: number }
  | { kind: 'range'; key: string; title: string; minLabel: string; maxLabel: string; minPlaceholder?: string; maxPlaceholder?: string }
  | { kind: 'select-range'; key: string; title: string; fields: { label: string; placeholder: string }[] }
  | { kind: 'select'; key: string; title: string; placeholder: string; options: CheckboxFilterOption[] }

export interface DiscoveryFilterPanelProps {
  title?: string
  sections: FilterSection[]
  values: Record<string, unknown>
  onChange: (sectionKey: string, value: unknown) => void
  onClear?: () => void
  className?: string
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-8">
      <p className="shrink-0 text-[14px] font-semibold leading-[20px] tracking-[0] text-text-primary">{title}</p>
      <div className="h-0.5 flex-1 bg-border-light-grey" />
    </div>
  )
}

function CheckboxSection({
  section,
  value,
  onChange,
}: {
  section: Extract<FilterSection, { kind: 'checkboxes' }>
  value: string[]
  onChange: (value: string[]) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const visibleCount = section.initialVisibleCount ?? 5
  const visible = expanded ? section.options : section.options.slice(0, visibleCount)

  function toggle(optionKey: string) {
    onChange(value.includes(optionKey) ? value.filter((k) => k !== optionKey) : [...value, optionKey])
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <SectionHeading title={section.title} />
      <div className="flex flex-col gap-2">
        {visible.map((option) => (
          <Checkbox
            key={option.key}
            label={option.label}
            checked={value.includes(option.key)}
            onChange={() => toggle(option.key)}
            className="h-24 w-full"
          />
        ))}
        {section.options.length > visibleCount && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="flex h-24 items-center gap-4 text-[14px] font-medium leading-[20px] tracking-[0] text-text-grey-dark"
          >
            {expanded ? 'Show Less' : 'Show More'}
            <IconCaretDown className={`size-16 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </div>
  )
}

function SelectSection({
  section,
  value,
  onChange,
}: {
  section: Extract<FilterSection, { kind: 'select' }>
  value: string[]
  onChange: (value: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  function toggle(optionKey: string) {
    onChange(value.includes(optionKey) ? value.filter((k) => k !== optionKey) : [...value, optionKey])
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <SectionHeading title={section.title} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={[
            'flex h-44 w-full items-center justify-between gap-8 rounded-8 border px-16 py-12 text-left text-[14px] font-medium leading-[20px]',
            value.length > 0 ? 'border-transparent bg-overlay-brand-8 font-semibold text-brand-primary' : 'border-border-grey bg-white text-text-grey',
          ].join(' ')}
        >
          {value.length > 0 ? `Selected (${value.length})` : section.placeholder}
          <IconCaretDown className={`size-20 shrink-0 text-text-grey transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full z-10 mt-4 flex max-h-[184px] w-full flex-col gap-2 overflow-y-auto rounded-8 border-xs border-border-grey bg-white p-8 shadow-container-4">
            {section.options.map((option) => (
              <Checkbox
                key={option.key}
                label={option.label}
                checked={value.includes(option.key)}
                onChange={() => toggle(option.key)}
                className="h-36 w-full shrink-0 justify-start rounded-4 px-8 hover:bg-surface-container-light-grey"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function DiscoveryFilterPanel({ title = 'Filter by', sections, values, onChange, onClear, className }: DiscoveryFilterPanelProps) {
  return (
    <div className={['flex w-300 flex-col gap-16 rounded-12 bg-white p-16', className].filter(Boolean).join(' ')}>
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-semibold leading-[20px] tracking-[0] text-text-primary">{title}</p>
        {onClear && (
          <Button variant="ghost" ghostTone="primary" onClick={onClear} className="text-[12px]">
            Clear
          </Button>
        )}
      </div>

      {sections.map((section, index) => {
        if (section.kind === 'toggles') {
          return (
            <div key={index} className="flex flex-col gap-8">
              {section.items.map((item) => (
                <div key={item.key} className="flex h-24 items-center justify-between gap-8">
                  <div className="flex items-center gap-[6px]">
                    {item.icon && <span className="flex size-20 shrink-0 items-center justify-center text-text-primary">{item.icon}</span>}
                    <span className="text-[14px] font-medium leading-[20px] tracking-[0] text-text-primary">{item.label}</span>
                  </div>
                  <ToggleSwitch
                    checked={Boolean(values[item.key])}
                    onChange={(e) => onChange(item.key, e.target.checked)}
                  />
                </div>
              ))}
            </div>
          )
        }

        if (section.kind === 'checkboxes') {
          return (
            <CheckboxSection
              key={index}
              section={section}
              value={(values[section.key] as string[]) ?? []}
              onChange={(value) => onChange(section.key, value)}
            />
          )
        }

        if (section.kind === 'range') {
          const range = (values[section.key] as { min?: string; max?: string }) ?? {}
          return (
            <div key={index} className="flex w-full flex-col gap-8">
              <SectionHeading title={section.title} />
              <div className="flex items-end gap-8">
                <InputField
                  label={section.minLabel}
                  placeholder={section.minPlaceholder ?? 'Enter min. value'}
                  value={range.min ?? ''}
                  onChange={(e) => onChange(section.key, { ...range, min: e.target.value })}
                  className="flex-1"
                />
                <div className="h-0.5 w-8 shrink-0 bg-border-grey" />
                <InputField
                  label={section.maxLabel}
                  placeholder={section.maxPlaceholder ?? 'Enter max. value'}
                  value={range.max ?? ''}
                  onChange={(e) => onChange(section.key, { ...range, max: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
          )
        }

        if (section.kind === 'select') {
          return (
            <SelectSection
              key={index}
              section={section}
              value={(values[section.key] as string[]) ?? []}
              onChange={(value) => onChange(section.key, value)}
            />
          )
        }

        // select-range
        const fieldValues = (values[section.key] as string[]) ?? []
        return (
          <div key={index} className="flex w-full flex-col gap-8">
            <SectionHeading title={section.title} />
            <div className="flex flex-col gap-8">
              {section.fields.map((field, fieldIndex) => (
                <InputField
                  key={fieldIndex}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={fieldValues[fieldIndex] ?? ''}
                  onChange={(e) => {
                    const next = [...fieldValues]
                    next[fieldIndex] = e.target.value
                    onChange(section.key, next)
                  }}
                  suffix={<IconCaretDown className="size-16 text-text-grey" />}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
