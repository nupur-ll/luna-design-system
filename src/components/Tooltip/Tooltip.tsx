import type { ReactNode } from 'react'

/**
 * Tooltip — Luna Design System ".Tooltip", node 29221:77853. A black pill
 * (bg-black, 12px semibold white text) that appears on hover — surfaced by
 * ProfileCard's edge cases (2+ languages, a long city name, a long agency
 * name all show one of these on hover over the truncated value).
 *
 * Figma's pulls only ever showed the pill in isolation, not positioned
 * against a trigger, so the above-center placement here is this repo's
 * own choice, not something pixel-matched from a screen.
 */
export interface TooltipProps {
  text: ReactNode
  children: ReactNode
  className?: string
}

export function Tooltip({ text, children, className }: TooltipProps) {
  return (
    <span className={['group relative inline-flex min-w-0', className].filter(Boolean).join(' ')}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-4 -translate-x-1/2 whitespace-nowrap rounded-4 bg-black px-8 py-4 text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}
