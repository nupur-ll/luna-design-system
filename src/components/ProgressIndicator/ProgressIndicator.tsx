import type { ReactNode } from 'react'
import { IconGear } from '../../icons/navIcons'

/**
 * ProgressIndicator — Luna Design System "Progress Indicator", node
 * 31726:192058, built from its sub-component ".Progress Tab" (node
 * 27092:120568, states Default/Active/Completed).
 *
 * Figma's main component bakes in a fixed 5-tab row ("Active=Tab 1"
 * .. "Active=Tab 5", each a full 5-step instance with one step marked
 * active) — that's a fixed-length stepper, not a real variant API, so
 * this is a generic `steps` list + `activeKey` instead: a step's state
 * (Default/Active/Completed) is derived from its position relative to
 * the active step rather than being its own prop. Each step's icon
 * defaults to Figma's placeholder Gear glyph if the consumer doesn't pass
 * one — same "just a slot" treatment as Navbar's item icons.
 *
 * Figma sizes each tab at a fixed 160px. A real stepper needs to fit
 * however many steps the consumer passes, so tabs are `flex-1` here
 * instead of a fixed width.
 */
export interface ProgressStep {
  key: string
  label: string
  icon?: ReactNode
}

export interface ProgressIndicatorProps {
  steps: ProgressStep[]
  activeKey: string
  className?: string
}

export function ProgressIndicator({ steps, activeKey, className }: ProgressIndicatorProps) {
  const activeIndex = steps.findIndex((step) => step.key === activeKey)

  return (
    <div className={['flex w-full items-start gap-8', className].filter(Boolean).join(' ')}>
      {steps.map((step, index) => {
        const state = index < activeIndex ? 'completed' : index === activeIndex ? 'active' : 'default'
        return (
          <div key={step.key} className="flex flex-1 flex-col items-center gap-8">
            <div className="flex items-center justify-center">
              <div
                className={[
                  'flex flex-col items-center justify-center rounded-full',
                  state === 'active'
                    ? 'size-36 border-4 border-overlay-brand-16 bg-brand-primary'
                    : state === 'completed'
                      ? 'size-28 bg-brand-primary'
                      : 'size-28 bg-surface-container-grey',
                ].join(' ')}
              >
                <span className={state === 'active' ? 'size-20 text-white' : 'size-16 text-white'}>
                  {step.icon ?? <IconGear className="size-full" />}
                </span>
              </div>
            </div>
            <p
              className={[
                'text-center text-[14px] leading-[20px] tracking-[0]',
                state === 'active'
                  ? 'font-bold text-text-primary'
                  : state === 'completed'
                    ? 'font-semibold text-text-primary'
                    : 'font-semibold text-text-grey-light',
              ].join(' ')}
            >
              {step.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
