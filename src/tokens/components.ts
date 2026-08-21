/**
 * Components collection — Luna Design Figma file (Et2Xt3lqFSU6SmLo4YDCmk),
 * node 34426:6652. Component-specific token overrides (Button, Input
 * Field, Floating Element, Search Bar) — the most specific of the three
 * layers.
 *
 * Every value here traces to a `primitives` entry, same convention as
 * semantics.ts. get_variable_defs returns fully-resolved values, not the
 * alias chain Figma stores internally, so these are pinned to `primitives`
 * directly rather than guessing whether Figma routes each one through a
 * semantic alias first — where a value happens to equal an existing
 * semantics.ts entry too (e.g. button error fill / semantics.color.system
 * .error.primary) that's noted in a comment, but not asserted as the
 * actual alias path.
 *
 * Pulled verbatim via get_variable_defs — do not hand-edit a value here,
 * re-pull from Figma instead (see CLAUDE.md "Token source of truth").
 * Not yet wired into tailwind.config.ts (deferred until the file
 * restructuring pass).
 */
import { primitives } from './primitives'

const { color } = primitives

export const components = {
  button: {
    color: {
      primary: {
        fill: color.grey.black,
        hover: color.stateLayer.grey['opacity-08'],
        text: color.grey.white,
      },
      secondary: {
        fill: color.grey.white,
        hover: color.stateLayer.black['opacity-16'],
        text: color.grey.black,
        border: color.grey['90'],
      },
      error: {
        // fill/text match semantics.color.system.error.primary / grey.white
        fill: color.red['50'],
        hover: color.stateLayer.black['opacity-16'],
        text: color.grey.white,
      },
      ghost: {
        'text-primary': color.grey.black,
        // matches semantics.color.brand.primary
        'text-brand': color.purple['50'],
      },
      disabled: {
        fill: color.grey['90'],
        text: color.grey['60'],
      },
    },
  },
  'input-field': {
    color: {
      container: color.grey.white,
      border: color.grey['90'],
      'label-text': color.grey['30'],
      icon: color.grey['30'],
      default: {
        'placeholder-text': color.grey['50'],
        overlay: color.stateLayer.grey['opacity-08'],
      },
      focused: {
        // matches semantics.color.brand.primary
        border: color.purple['50'],
      },
      filled: {
        'input-text': color.grey.black,
      },
      error: {
        // matches semantics.color.system.error.primary
        border: color.red['50'],
        text: color.red['50'],
      },
      disabled: {
        fill: color.grey['100'],
        text: color.grey['50'],
      },
    },
  },
  'floating-element': {
    color: {
      container: color.grey.black,
      text: color.grey.white,
      icon: {
        // matches semantics.color.system.success/warning/error.primary
        success: color.green['40'],
        warning: color.yellow['50'],
        error: color.red['50'],
      },
    },
    button: {
      color: {
        primary: { fill: color.grey.white, text: color.grey.black },
        secondary: { fill: color.grey.black, text: color.grey.white, border: color.grey.white },
      },
    },
  },
  'search-bar': {
    color: {
      container: color.grey.white,
      border: color.grey['90'],
      default: { 'placeholder-text': color.grey['50'] },
      focused: { border: color.purple['50'] },
      filled: { 'input-text': color.grey.black },
      icon: { primary: color.grey['10'], brand: color.purple['50'] },
    },
    dropdown: {
      typography: color.grey['50'],
      divider: { color: color.grey['100'] },
      'search-chips': {
        border: { color: color.stateLayer.purple['opacity-08'] },
        color: {
          text: color.grey['10'],
          icon: color.grey['50'],
          fill: color.stateLayer.purple['opacity-04'],
        },
      },
      cards: {
        typography: { primary: color.purple['50'], secondary: color.grey['50'] },
        border: { color: color.stateLayer.purple['opacity-08'] },
      },
    },
  },
} as const
