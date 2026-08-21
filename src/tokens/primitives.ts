/**
 * Primitives collection — Luna Design Figma file (Et2Xt3lqFSU6SmLo4YDCmk),
 * node 34426:5934. Raw values only, no semantic meaning attached.
 *
 * Pulled verbatim via get_variable_defs — do not hand-edit a value here,
 * re-pull from Figma instead (see CLAUDE.md "Token source of truth").
 * Structure mirrors Figma's own collection/group/subgroup/variable nesting
 * exactly (color/grey/10 -> color.grey['10']) so this stays diffable
 * against the source.
 *
 * Nothing in this file is consumed directly by components — semantics.ts
 * (next) maps these onto meaning, and tailwind.config.ts flattens the
 * semantic layer into the theme so existing utility classes are unaffected.
 */

export const primitives = {
  color: {
    grey: {
      black: '#121212',
      '10': '#333333',
      '20': '#565656',
      '30': '#6A6A6A',
      '40': '#7E7E7E',
      '50': '#929292',
      '60': '#A6A6A6',
      '70': '#BABABA',
      '80': '#CECECE',
      '90': '#E2E2E2',
      '100': '#F5F5F5',
      white: '#FFFFFF',
    },
    purple: {
      '10': '#170F24',
      '20': '#2D1E48',
      '30': '#442D6C',
      '40': '#5A3B91',
      '50': '#714AB5',
      '60': '#8D6EC4',
      '70': '#AA93D2',
      '80': '#C6B7E1',
      '90': '#E7E1F0',
      '100': '#F4F1F8',
    },
    green: {
      '10': '#102316',
      '20': '#20462C',
      '30': '#316843',
      '40': '#418B59',
      '50': '#51AE6F',
      '60': '#74BE8C',
      '70': '#97CEA9',
      '80': '#B9DFC5',
      '90': '#E5F7EB',
      '100': '#ECFEF2',
    },
    yellow: {
      '10': '#2C1C07',
      '20': '#57370F',
      '30': '#825316',
      '40': '#AE6E1E',
      '50': '#D98925',
      '60': '#E1A151',
      '70': '#E8B87D',
      '80': '#F0D0A8',
      '90': '#F7E7D3',
      '100': '#FCF6EE',
    },
    red: {
      '10': '#2C0907',
      '20': '#57120F',
      '30': '#831B16',
      '40': '#AF241D',
      '50': '#DC362E',
      '60': '#E25750',
      '70': '#E9817C',
      '80': '#F0ABA8',
      '90': '#F8D5D3',
      '100': '#FCEEEE',
    },
    stateLayer: {
      black: {
        'opacity-0': '#00000000',
        'opacity-08': '#00000014',
        'opacity-16': '#00000029',
        'opacity-20': '#00000033',
        'opacity-50': '#00000080',
        'opacity-70': '#000000B2',
      },
      white: {
        'opacity-0': '#FFFFFF00',
        'opacity-16': '#FFFFFF29',
        'opacity-40': '#FFFFFF66',
      },
      grey: {
        'opacity-08': '#E5E5E514',
        'opacity-16': '#E5E5E529',
        'opacity-50': '#E5E5E580',
      },
      red: {
        'opacity-08': '#DC362E14',
        'opacity-16': '#DC362E29',
        'opacity-50': '#DC362E80',
      },
      yellow: {
        'opacity-08': '#E1A15114',
        'opacity-16': '#E1A15129',
        'opacity-50': '#E1A15180',
      },
      green: {
        'opacity-08': '#51AE6F14',
        'opacity-16': '#51AE6F29',
        'opacity-50': '#51AE6F80',
      },
      purple: {
        'opacity-04': '#6643A30A',
        'opacity-08': '#6643A314',
        'opacity-16': '#6643A329',
        'opacity-20': '#6643A333',
        'opacity-50': '#6643A380',
      },
    },
  },
  number: {
    none: 0,
    half: 0.5,
    '1': 1,
    '1+': 1.5,
    '2': 2,
    '4': 4,
    '8': 8,
    '11': 11,
    '12': 12,
    '14': 14,
    '16': 16,
    '20': 20,
    '22': 22,
    '24': 24,
    '28': 28,
    '32': 32,
    '36': 36,
    '40': 40,
    '44': 44,
    '48': 48,
    '1000': 1000,
  },
} as const
