/**
 * Semantics collection — Luna Design Figma file (Et2Xt3lqFSU6SmLo4YDCmk),
 * node 34426:5935. Each value here is a named alias onto a `primitives`
 * value (see primitives.ts) — never a raw literal — so drift between the
 * two collections is visible as a broken reference, not a silent copy.
 *
 * Pulled verbatim via get_variable_defs — do not hand-edit a value here,
 * re-pull from Figma instead (see CLAUDE.md "Token source of truth").
 *
 * Not yet wired into tailwind.config.ts (deferred until the file
 * restructuring pass) — this file is the source of truth for the
 * semantic layer on its own for now.
 */
import { primitives } from './primitives'

const { color, number } = primitives

export const semantics = {
  typography: {
    color: {
      primary: color.grey.black,
      secondary: color.grey['10'],
      'grey-dark': color.grey['30'],
      grey: color.grey['50'],
      'grey-light': color.grey['70'],
      white: color.grey.white,
    },
  },
  border: {
    color: {
      white: color.grey.white,
      black: color.grey.black,
      'dark-grey': color.grey['70'],
      grey: color.grey['90'],
      'light-grey': color.grey['100'],
    },
    width: {
      xs: number.half,
      s: number['1'],
      m: number['1+'],
      l: number['2'],
    },
  },
  surface: {
    background: {
      grey: color.grey['100'],
      white: color.grey.white,
    },
    container: {
      color: {
        white: color.grey.white,
        'light-grey': color.grey['100'],
        grey: color.grey['80'],
        black: color.grey.black,
        disabled: {
          container: color.grey['90'],
          text: color.grey['60'],
        },
      },
      'corner-radius': {
        '4': number['4'],
        '8': number['8'],
        '12': number['12'],
        '16': number['16'],
        '20': number['20'],
        '24': number['24'],
        '1000': number['1000'],
      },
      padding: {
        '2': number['2'],
        '4': number['4'],
        '8': number['8'],
        '12': number['12'],
        '14': number['14'],
        '16': number['16'],
        '20': number['20'],
        '24': number['24'],
        '32': number['32'],
        '36': number['36'],
        '40': number['40'],
        '44': number['44'],
      },
      spacing: {
        '2': number['2'],
        '4': number['4'],
        '8': number['8'],
        '12': number['12'],
        '14': number['14'],
        '16': number['16'],
        '20': number['20'],
        '24': number['24'],
        '32': number['32'],
        '36': number['36'],
        '40': number['40'],
        '44': number['44'],
      },
    },
  },
  color: {
    brand: {
      primary: color.purple['50'],
      secondary: color.purple['70'],
      tertiary: color.purple['90'],
      dark: color.purple['30'],
    },
    system: {
      error: { primary: color.red['50'], light: color.red['100'], dark: color.red['30'] },
      success: { primary: color.green['40'], light: color.green['100'], dark: color.green['20'] },
      warning: { primary: color.yellow['50'], light: color.yellow['100'], dark: color.yellow['20'] },
    },
    overlay: {
      black: {
        '16': color.stateLayer.black['opacity-16'],
        '50': color.stateLayer.black['opacity-50'],
        '70': color.stateLayer.black['opacity-70'],
      },
      white: {
        '16': color.stateLayer.white['opacity-16'],
        '40': color.stateLayer.white['opacity-40'],
      },
      grey: {
        '8': color.stateLayer.grey['opacity-08'],
        '16': color.stateLayer.grey['opacity-16'],
        '50': color.stateLayer.grey['opacity-50'],
      },
      brand: {
        '4': color.stateLayer.purple['opacity-04'],
        '8': color.stateLayer.purple['opacity-08'],
        '16': color.stateLayer.purple['opacity-16'],
        '50': color.stateLayer.purple['opacity-50'],
      },
      transparent: {
        white: color.stateLayer.white['opacity-0'],
        black: color.stateLayer.black['opacity-0'],
      },
    },
    // Ungrouped in Figma itself: this variable sits directly in the
    // Semantics collection as "color/grey/10" with no further semantic
    // subgroup (unlike everything above, which nests under a named
    // purpose). Carried over as-is rather than guessing a purpose for it.
    grey: {
      '10': color.grey['10'],
    },
  },
} as const
