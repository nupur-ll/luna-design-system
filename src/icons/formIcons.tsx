import type { SVGProps } from 'react'
import { IconCaretDown as IconCaretDownAsset, IconWarningCircle as IconWarningCircleAsset } from './common'

/**
 * Form-chrome icons for InputField/OtpInput/Dropdown/InputChip.
 *
 * `IconWarningCircle` and `IconCaretDown` are now real Figma-extracted
 * assets (re-exported from `src/icons/common`, see that file's header
 * comment for the extraction method) — their usages here don't need
 * dynamic `currentColor` tinting: the error icon's red is already baked
 * into the extracted asset (it matches `text-error-primary`), and the
 * caret's grey matches `text-text-grey` everywhere it's used.
 *
 * `IconX` stays hand-drawn: `InputChip`'s remove button uses it with a
 * `text-text-secondary/70 hover:text-text-secondary` opacity-shift on
 * hover — a real interactive affordance a fixed-color PNG can't
 * reproduce, since `currentColor` (and its opacity) has to keep working.
 */
export const IconWarningCircle = IconWarningCircleAsset
export const IconCaretDown = IconCaretDownAsset

type IconProps = SVGProps<SVGSVGElement>

/** Figma's "X" — the remove control on InputField tag chips, kept as a `currentColor` SVG for its hover state. */
export function IconX(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
}
