import type { SVGProps } from 'react'
import {
  IconMagnifyingGlass,
  IconChartBar,
  IconFunnelSimple,
  IconUserSound,
  IconGear,
  IconUserCircleGear,
  IconUserCircle,
} from './common'

/**
 * Nav/chrome icons for PageHeader, PageFooter, Pagination and Navbar's
 * logout row — these are `ReactNode` props (same pattern as Button's
 * leftIcon/rightIcon), so any consumer can already pass a real Phosphor
 * component today regardless of what's exported here.
 *
 * Every one of these except `IconSignOut` used to be a hand-drawn
 * stand-in; they're now real Figma-extracted assets re-exported from
 * `src/icons/common/` (see that file's header comment for the extraction
 * method and the per-icon notes — `IconChartBar` substitutes for a
 * library-only "PresentationChart" component with no on-canvas instance,
 * `IconCaretLeft`/`IconCaretRight` are the bare-chevron variants rather
 * than the filled-circle ones, etc.).
 *
 * `IconSignOut` is one of two exceptions still hand-drawn here: every
 * on-canvas instance of Figma's "SignOut" component in the file sits
 * inside a frame marked `hidden`, so screenshotting any of them renders
 * blank — this was tried on multiple separate instances (see CLAUDE.md's
 * "Icon assets" section) and isn't a matter of picking a better instance.
 *
 * `IconGift` and `IconCaretLeft`/`IconCaretRight` are exceptions for the
 * same underlying reason — a real, verified-by-screenshot one, not a
 * guess: a PNG asset can't respond to `currentColor`, and these three
 * are used somewhere that genuinely needs dynamic color, not just a
 * leftover placeholder default.
 * - `IconGift`: CreatorCard renders it with `text-brand-primary` to tint
 *   it the same purple as the adjacent "L." lehlahUser badge.
 * - `IconCaretLeft`/`IconCaretRight`: Pagination's prev/next buttons use
 *   `hover:text-brand-primary` on the (unfilled) prev button, and the
 *   next button sits on a filled `bg-brand-primary` circle with
 *   `text-white` — swapping in the fixed-grey extracted PNG made the next
 *   chevron render grey-on-purple with barely any contrast (caught by
 *   screenshotting Pagination after the swap, not assumed). Both stay
 *   hand-drawn `currentColor` SVGs.
 * The real extracted assets for all three are still available from
 * `src/icons/common` for contexts that don't need dynamic color.
 */
export const IconSearch = IconMagnifyingGlass
export const IconChart = IconChartBar
export const IconFunnel = IconFunnelSimple
export const IconChat = IconUserSound
export { IconGear }
export const IconUserGear = IconUserCircleGear
export { IconUserCircle }

type IconProps = SVGProps<SVGSVGElement>

export function IconGift(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2.5" y="8" width="15" height="9" rx="1" />
      <path d="M2.5 8h15v3h-15z" />
      <path d="M10 8v9" />
      <path d="M10 8c-1.2-3-5-3-5 0M10 8c1.2-3 5-3 5 0" />
    </svg>
  )
}

export function IconCaretLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.5 4.5L7 10l5.5 5.5" />
    </svg>
  )
}

export function IconCaretRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.5 4.5L13 10l-5.5 5.5" />
    </svg>
  )
}

export function IconSignOut(props: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 17H4.5A1.5 1.5 0 013 15.5v-11A1.5 1.5 0 014.5 3H8" />
      <path d="M12.5 13.5L16 10l-3.5-3.5" />
      <path d="M16 10H7.5" />
    </svg>
  )
}
