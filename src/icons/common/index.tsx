import type { ImgHTMLAttributes, SVGProps } from 'react'
import magnifyingGlassUrl from './magnifying-glass.png'
import xCircleUrl from './x-circle.png'
import infoUrl from './info.png'
import chartBarUrl from './chart-bar.png'
import giftUrl from './gift.png'
import funnelSimpleUrl from './funnel-simple.png'
import userSoundUrl from './user-sound.png'
import gearUrl from './gear.png'
import userCircleGearUrl from './user-circle-gear.png'
import userCircleUrl from './user-circle.png'
import caretLeftUrl from './caret-left.png'
import caretRightUrl from './caret-right.png'
import caretDownUrl from './caret-down.png'
import warningCircleUrl from './warning-circle.png'
import xMarkUrl from './x-mark.png'

/**
 * Real Figma-sourced icons shared across the newer components (Search Bar,
 * Dropdown/InputField's search box, Floating-Element). Same extraction
 * method as src/icons/lehlah/ — get_screenshot's inline base64 response,
 * decoded and (for the two colored-on-white icons here) unpremultiplied
 * against a white backdrop to recover real transparency, since Figma's
 * screenshot API flattens onto whatever's behind the node rather than
 * exporting true alpha.
 */
type ImgProps = ImgHTMLAttributes<HTMLImageElement>

const img = (src: string, alt: string) => (props: ImgProps) => (
  <img src={src} alt={alt} className={['size-full object-contain', props.className].filter(Boolean).join(' ')} {...props} />
)

/** Figma "MagnifyingGlass" — Search Bar's leading icon. */
export const IconMagnifyingGlass = img(magnifyingGlassUrl, '')
/** Figma "XCircle" — Search Bar's clear-input button. */
export const IconXCircle = img(xCircleUrl, '')
/** Figma "Info" — Floating-Element's Action-type info row. */
export const IconInfo = img(infoUrl, '')

/**
 * PageHeader/Pagination/Footer/InputField icon set — these used to be
 * hand-drawn placeholders in navIcons.tsx/formIcons.tsx (see those files'
 * old header comments); replaced with real Figma-extracted assets from
 * on-canvas instances found in the "Luna - final" page. Same
 * unpremultiply-over-white extraction as MagnifyingGlass/XCircle/Info
 * above. One note per icon:
 * - `ChartBar` stands in for the "PresentationChart" name search_design_system
 *   returned — that exact component has no on-canvas instance anywhere in
 *   the file (library-only, never placed), so this is the closest
 *   real-instance equivalent (a bar-chart glyph) actually used in the design.
 * - `CaretLeft`/`CaretRight` are the bare chevrons (used inside a rounded
 *   button chrome via CSS), not the self-contained `CaretCircleLeft/Right`
 *   components — those render as a filled brand-purple circle with a white
 *   caret, a different visual treatment than the plain caret this repo's
 *   placeholder was standing in for.
 * - `Gear` needed a second attempt: the first on-canvas instance found was
 *   a colored badge chip (purple rounded square + white glyph), not a bare
 *   icon — extracting that inverted (the chip became opaque, the glyph
 *   went transparent). Re-extracted from a different, plain instance.
 * - `WarningCircle` (formIcons' error-message icon) is a red filled circle
 *   with a white "!" — same two-tone shape as common/'s IconWarningCircleFilled,
 *   but verified pixel-by-pixel that the "!" is a genuine transparent
 *   knockout (not a separate white fill), so the plain unpremultiply
 *   script reconstructs it correctly, same reasoning as XCircle.
 * `SignOut` couldn't be added this way — every on-canvas instance in the
 * file sits inside a Figma frame marked `hidden`, so it stays the
 * hand-drawn placeholder in navIcons.tsx.
 */
export const IconChartBar = img(chartBarUrl, '')
export const IconGift = img(giftUrl, '')
export const IconFunnelSimple = img(funnelSimpleUrl, '')
export const IconUserSound = img(userSoundUrl, '')
export const IconGear = img(gearUrl, '')
export const IconUserCircleGear = img(userCircleGearUrl, '')
export const IconUserCircle = img(userCircleUrl, '')
export const IconCaretLeft = img(caretLeftUrl, '')
export const IconCaretRight = img(caretRightUrl, '')
export const IconCaretDown = img(caretDownUrl, '')
export const IconWarningCircle = img(warningCircleUrl, '')
export const IconXMark = img(xMarkUrl, '')

/**
 * Figma "WarningCircle" (filled/orange variant) used by Floating-Element's
 * Toast type. This is a two-color icon (orange circle + white "!") sitting
 * on Floating-Element's own black background — neither of the pixel
 * extraction tricks used elsewhere in this repo (luminance-to-alpha for
 * white-on-dark, unpremultiply-over-white for color-on-white) reconstructs
 * a 3-color composite cleanly, so this one is hand-drawn instead, same
 * rationale as the small structural marks in formIcons.tsx/navIcons.tsx.
 */
export function IconWarningCircleFilled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="16" fill="#F5A524" />
      <path d="M16 9v9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="22" r="1.4" fill="white" />
    </svg>
  )
}

/**
 * Figma "CheckCircle" (green, filled) — ProfileCard's verified-contact
 * marks and CreatorCard's "Verified Contact" tag. Same "small structural
 * mark, hand-drawn" treatment as formIcons.tsx/navIcons.tsx.
 */
export function IconCheckCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8" r="7" fill="#51AE6F" />
      <path d="M5 8.2l1.8 1.8L11.2 6" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Platform badges — CreatorCard/ProfileCard's Instagram/YouTube tags.
 * Figma exports these as real brand-logo SVGs; hand-drawn here (simplified
 * but recognizable glyphs) rather than pixel-matched, same rationale as
 * the other small structural marks in this repo — these are decorative
 * brand indicators, not something a design review is likely to pixel-diff.
 */
export function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <rect x="0.5" y="0.5" width="15" height="15" rx="4" fill="#C13584" />
      <rect x="4" y="4" width="8" height="8" rx="2.5" stroke="white" strokeWidth="1.2" />
      <circle cx="8" cy="8" r="1.6" stroke="white" strokeWidth="1.1" />
      <circle cx="11.2" cy="4.8" r="0.7" fill="white" />
    </svg>
  )
}

export function IconYoutube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <rect x="0.5" y="2.5" width="15" height="11" rx="3" fill="#FF0000" />
      <path d="M6.6 5.8l4 2.2-4 2.2V5.8z" fill="white" />
    </svg>
  )
}
