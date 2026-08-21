/**
 * Luna typography scale, generated from the luna-design-system skill's
 * typography.md.
 *
 * Tailwind's `fontSize` utility can't bundle size + line-height + weight
 * into one class the way a Figma text style does, so instead each Luna
 * text style below is a ready-made Tailwind className string — combine
 * it with a color utility (e.g. `text-text-primary`) at the call site.
 *
 * Naming mirrors Figma exactly: `--luna-{role}-{size}-{weight}`.
 * Usage: <p className={luna.bodyMedium600}>...</p>
 */
export const luna = {
  // Heading — 32/28/24px
  headingLarge400: 'text-[32px] leading-[36px] font-normal',
  headingLarge500: 'text-[32px] leading-[36px] font-medium',
  headingLarge600: 'text-[32px] leading-[36px] font-semibold',
  headingLarge700: 'text-[32px] leading-[36px] font-bold',
  headingLarge800: 'text-[32px] leading-[36px] font-black',
  headingMedium400: 'text-[28px] leading-[32px] font-normal',
  headingMedium500: 'text-[28px] leading-[32px] font-medium',
  headingMedium600: 'text-[28px] leading-[32px] font-semibold',
  headingMedium700: 'text-[28px] leading-[32px] font-bold',
  headingMedium800: 'text-[28px] leading-[32px] font-black',
  headingSmall400: 'text-[24px] leading-[28px] font-normal',
  headingSmall500: 'text-[24px] leading-[28px] font-medium',
  headingSmall600: 'text-[24px] leading-[28px] font-semibold',
  headingSmall700: 'text-[24px] leading-[28px] font-bold',
  headingSmall800: 'text-[24px] leading-[28px] font-black',

  // Title — 22/20/16px
  titleLarge400: 'text-[22px] leading-[28px] font-normal',
  titleLarge500: 'text-[22px] leading-[28px] font-medium',
  titleLarge600: 'text-[22px] leading-[28px] font-semibold',
  titleLarge700: 'text-[22px] leading-[28px] font-bold',
  titleLarge800: 'text-[22px] leading-[28px] font-black',
  titleMedium400: 'text-[20px] leading-[24px] font-normal',
  titleMedium500: 'text-[20px] leading-[24px] font-medium',
  titleMedium600: 'text-[20px] leading-[24px] font-semibold',
  titleMedium700: 'text-[20px] leading-[24px] font-bold',
  titleMedium800: 'text-[20px] leading-[24px] font-black',
  titleSmall400: 'text-[16px] leading-[20px] font-normal',
  titleSmall500: 'text-[16px] leading-[20px] font-medium',
  titleSmall600: 'text-[16px] leading-[20px] font-semibold',
  titleSmall700: 'text-[16px] leading-[20px] font-bold',
  titleSmall800: 'text-[16px] leading-[20px] font-black',

  // Body — 16/14/12/11px
  bodyLarge400: 'text-[16px] leading-[20px] font-normal',
  bodyLarge500: 'text-[16px] leading-[20px] font-medium',
  bodyLarge600: 'text-[16px] leading-[20px] font-semibold',
  bodyLarge700: 'text-[16px] leading-[20px] font-bold',
  bodyLarge800: 'text-[16px] leading-[20px] font-black',
  bodyMedium400: 'text-[14px] leading-[20px] font-normal',
  bodyMedium500: 'text-[14px] leading-[20px] font-medium',
  bodyMedium600: 'text-[14px] leading-[20px] font-semibold',
  bodyMedium700: 'text-[14px] leading-[20px] font-bold',
  bodyMedium800: 'text-[14px] leading-[20px] font-black',
  bodySmall400: 'text-[12px] leading-[16px] font-normal',
  bodySmall500: 'text-[12px] leading-[16px] font-medium',
  bodySmall600: 'text-[12px] leading-[16px] font-semibold',
  bodySmall700: 'text-[12px] leading-[16px] font-bold',
  bodySmall800: 'text-[12px] leading-[16px] font-black',
  bodyExtraSmall400: 'text-[11px] leading-[16px] font-normal',
  bodyExtraSmall500: 'text-[11px] leading-[16px] font-medium',
  bodyExtraSmall600: 'text-[11px] leading-[16px] font-semibold',
  bodyExtraSmall700: 'text-[11px] leading-[16px] font-bold',
  bodyExtraSmall800: 'text-[11px] leading-[16px] font-black',
} as const
