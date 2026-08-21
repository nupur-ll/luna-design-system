import type { Config } from 'tailwindcss'
import { primitives } from './src/tokens/primitives'
import { semantics } from './src/tokens/semantics'

/**
 * Tailwind theme generated from the Luna Design System (Figma file
 * "Luna Design", Et2Xt3lqFSU6SmLo4YDCmk), sourced from the layered token
 * files in src/tokens/ (primitives -> semantics -> components) rather than
 * hand-copied literals. See CLAUDE.md "Token source of truth" and each
 * file in src/tokens/ for how these were pulled and cross-checked.
 *
 * Every Tailwind key/class name below is unchanged from before this pass
 * (bg-brand-primary, text-primary, etc. all still work) — only the value
 * each key resolves to now traces to a token file instead of a raw hex/px
 * literal. src/tokens/components.ts (Button/Input Field/Floating
 * Element/Search Bar-specific tokens) isn't wired in here: nothing below
 * needed a new theme key to expose it, so it stays a reference file for
 * now — see its header comment.
 *
 * Two real bugs were caught by re-pulling from Figma and are fixed here:
 * - `surface.bg-grey` was #121212, Figma's surface/background/grey is
 *   #F5F5F5 (grey-100) — looks like it got swapped with black at some point.
 * - `success.primary` was #51AE6F (primitive green-50); Figma's
 *   color/system/success/primary is #418B59 (green-40).
 *
 * IMPORTANT — intentional design decision:
 * `theme.spacing` below REPLACES Tailwind's default spacing scale rather
 * than extending it. The Luna system's hard rule is "padding/gap values
 * must be multiples of 4, taken from the approved scale" — replacing the
 * scale means an off-scale class like `p-[13px]` still works (Tailwind
 * arbitrary values can't be blocked entirely) but the *named* utilities
 * (`p-14`, `gap-20`, etc.) only exist for approved values, and the key
 * name always equals the pixel value (`p-16` = 16px), which also makes
 * the scale easier to read for anyone new to Tailwind.
 */

const px = (n: number) => `${n}px` as const

const { color, number } = primitives
const { corner } = { corner: semantics.surface.container['corner-radius'] }

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    spacing: {
      '0': px(number.none),
      '0.5': px(number.half),
      '1': px(number['1']),
      '2': px(number['2']),
      '4': px(number['4']),
      '8': px(number['8']),
      '11': px(number['11']),
      '12': px(number['12']),
      '14': px(number['14']),
      '16': px(number['16']),
      // Not a Figma primitive/semantic value — the radio button's inner
      // dot, a one-off decorative dimension (see CLAUDE.md).
      '18': '18px',
      '20': px(number['20']),
      '22': px(number['22']),
      '24': px(number['24']),
      '28': px(number['28']),
      '32': px(number['32']),
      '36': px(number['36']),
      '40': px(number['40']),
      '44': px(number['44']),
      '48': px(number['48']),
      // Everything below is a one-off component dimension with no backing
      // Figma primitive/semantic variable (confirmed absent from all three
      // collections pulled) — kept as named scale keys because they
      // already recur across components, not re-litigated in this pass.
      '60': '60px',
      '64': '64px',
      '68': '68px',
      '96': '96px',
      '104': '104px',
      '120': '120px',
      '140': '140px',
      '158': '158px',
      '212': '212px',
      '264': '264px',
      '300': '300px',
      '350': '350px',
      '398': '398px',
      '575': '575px',
      '600': '600px',
      '1000': px(number['1000']),
      '1212': '1212px',
      '1280': '1280px',
    },
    borderRadius: {
      none: px(number.none),
      '2': px(number['2']),
      '4': px(corner['4']),
      '8': px(corner['8']),
      '12': px(corner['12']),
      '16': px(corner['16']),
      '20': px(corner['20']),
      '24': px(corner['24']),
      full: px(corner['1000']),
    },
    borderWidth: {
      DEFAULT: px(semantics.border.width.s),
      xs: px(semantics.border.width.xs),
      s: px(semantics.border.width.s),
      m: px(semantics.border.width.m),
      l: px(semantics.border.width.l),
      // Numeric keys kept too (Tailwind's usual border-0/2/4/8) so a plain
      // `border-2` still works — the named xs/s/m/l scale above is for
      // matching Luna's exact token names, not a full replacement of
      // Tailwind's own border-width utilities.
      '0': px(number.none),
      '1': px(number['1']),
      '2': px(number['2']),
      '4': px(number['4']),
      '8': px(number['8']),
    },
    fontFamily: {
      sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      black: '800',
    },
    extend: {
      colors: {
        white: color.grey.white,
        black: color.grey.black,
        brand: {
          primary: semantics.color.brand.primary,
          secondary: semantics.color.brand.secondary,
          tertiary: semantics.color.brand.tertiary,
          dark: semantics.color.brand.dark,
        },
        grey: {
          white: color.grey.white,
          100: color.grey['100'],
          90: color.grey['90'],
          80: color.grey['80'],
          70: color.grey['70'],
          60: color.grey['60'],
          50: color.grey['50'],
          40: color.grey['40'],
          30: color.grey['30'],
          20: color.grey['20'],
          10: color.grey['10'],
          black: color.grey.black,
        },
        success: semantics.color.system.success,
        warning: semantics.color.system.warning,
        error: semantics.color.system.error,
        text: {
          primary: semantics.typography.color.primary,
          secondary: semantics.typography.color.secondary,
          'grey-dark': semantics.typography.color['grey-dark'],
          grey: semantics.typography.color.grey,
          'grey-light': semantics.typography.color['grey-light'],
          white: semantics.typography.color.white,
        },
        border: {
          white: semantics.border.color.white,
          black: semantics.border.color.black,
          'dark-grey': semantics.border.color['dark-grey'],
          grey: semantics.border.color.grey,
          'light-grey': semantics.border.color['light-grey'],
        },
        surface: {
          'bg-grey': semantics.surface.background.grey,
          'bg-white': semantics.surface.background.white,
          'container-white': semantics.surface.container.color.white,
          'container-light-grey': semantics.surface.container.color['light-grey'],
          'container-grey': semantics.surface.container.color.grey,
          'container-black': semantics.surface.container.color.black,
          'container-disabled': semantics.surface.container.color.disabled.container,
          // New: Figma's disabled state is two separate tokens (container
          // bg vs. text color) that a previous doc pass conflated into
          // one ambiguous "two possible values" note — see CLAUDE.md.
          'container-disabled-text': semantics.surface.container.color.disabled.text,
        },
        overlay: {
          'black-16': semantics.color.overlay.black['16'],
          'black-50': semantics.color.overlay.black['50'],
          'black-70': semantics.color.overlay.black['70'],
          // No Figma variable backs this in Primitives, Semantics, or
          // Components (confirmed by pulling all three) — Figma's black
          // state-layer primitive scale stops at opacity-70. Kept as a
          // literal per CLAUDE.md's note that this was added as an exact
          // match to a live (non-variable) Figma value on ProfileCard.
          'black-80': 'rgba(0,0,0,0.80)',
          'white-16': semantics.color.overlay.white['16'],
          'white-40': semantics.color.overlay.white['40'],
          'grey-8': semantics.color.overlay.grey['8'],
          'grey-16': semantics.color.overlay.grey['16'],
          'grey-50': semantics.color.overlay.grey['50'],
          'brand-4': semantics.color.overlay.brand['4'],
          'brand-8': semantics.color.overlay.brand['8'],
          'brand-16': semantics.color.overlay.brand['16'],
          'brand-50': semantics.color.overlay.brand['50'],
          'transparent-white': semantics.color.overlay.transparent.white,
          'transparent-black': semantics.color.overlay.transparent.black,
          // Real primitive state-layer values, but neither Semantics nor
          // Components ever names them (no color/overlay/red|yellow|green
          // semantic variable exists) — sourced directly from primitives
          // rather than left as literals or invented as fake semantics.
          'red-8': color.stateLayer.red['opacity-08'],
          'red-16': color.stateLayer.red['opacity-16'],
          'red-50': color.stateLayer.red['opacity-50'],
          'yellow-8': color.stateLayer.yellow['opacity-08'],
          'yellow-16': color.stateLayer.yellow['opacity-16'],
          'yellow-50': color.stateLayer.yellow['opacity-50'],
          'green-8': color.stateLayer.green['opacity-08'],
          'green-16': color.stateLayer.green['opacity-16'],
          'green-50': color.stateLayer.green['opacity-50'],
        },
      },
      boxShadow: {
        'container-2': '0 0 12px 0 rgba(0,0,0,0.02)',
        'container-4': '0 0 12px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
} satisfies Config
