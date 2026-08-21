import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Button — Luna Design System
 * Figma: component set "Button", node 28903:74326 (Luna Design, Et2Xt3lqFSU6SmLo4YDCmk)
 *
 * Figma models hover as its own variant ("Hovered"); in real code that's a
 * CSS pseudo-class, not a prop, so it's implemented with Tailwind `hover:`
 * classes below instead of a `property` prop. Figma's separate "Disabled"
 * variant is likewise the native `disabled` attribute here — one visual
 * treatment applies regardless of `variant`, which matches what Figma's own
 * disabled fill/text tokens do (they don't vary by variant either).
 */

export type ButtonVariant = 'primary' | 'secondary' | 'error' | 'ghost'
export type ButtonSize = 'lg' | 'md' | 'sm'
/** Only meaningful when variant="ghost" — Figma's Ghost-primary vs Ghost-brand. */
export type GhostTone = 'primary' | 'brand'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  ghostTone?: GhostTone
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
  children: ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'h-44 px-24 py-12 gap-8',
  md: 'h-36 px-16 py-8 gap-8',
  sm: 'h-32 px-12 py-8 gap-8',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  lg: 'size-20',
  md: 'size-16',
  sm: 'size-16',
}

const textClasses: Record<ButtonSize, string> = {
  // luna-body-medium-600 (Large/Medium), luna-body-small-600 (Small)
  lg: 'text-[14px] leading-[20px] font-semibold tracking-[0]',
  md: 'text-[14px] leading-[20px] font-semibold tracking-[0]',
  sm: 'text-[12px] leading-[16px] font-semibold tracking-[-0.3px]',
}

const filledVariantClasses: Record<'primary' | 'secondary' | 'error', string> = {
  primary: 'bg-black text-white hover:bg-[linear-gradient(0deg,rgba(229,229,229,0.08),rgba(229,229,229,0.08)),linear-gradient(0deg,#121212,#121212)]',
  secondary: 'bg-white text-text-primary border border-border-grey hover:bg-overlay-black-16',
  error: 'bg-error-primary text-white hover:brightness-95',
}

const ghostToneClasses: Record<GhostTone, string> = {
  primary: 'text-text-primary',
  brand: 'text-brand-primary',
}

/**
 * Primary/Secondary/Error/Ghost button. Set the native `disabled` attribute
 * for the disabled look — it's applied uniformly, matching Figma's
 * disabled tokens (`button/color/disabled/fill` #e2e2e2, `/text` #a6a6a6).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'lg', ghostTone = 'primary', leftIcon, rightIcon, className, children, disabled, ...rest },
  ref,
) {
  if (variant === 'ghost') {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          'inline-flex items-center justify-center gap-8 rounded-4 p-2 font-bold text-[14px] leading-[20px]',
          disabled ? 'text-text-grey' : ghostToneClasses[ghostTone],
          !disabled && 'hover:opacity-80',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {leftIcon && <span className="size-16 shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="size-16 shrink-0">{rightIcon}</span>}
      </button>
    )
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-4',
        sizeClasses[size],
        textClasses[size],
        disabled ? 'bg-surface-container-disabled text-grey-60' : filledVariantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {leftIcon && <span className={`${iconSizeClasses[size]} shrink-0`}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={`${iconSizeClasses[size]} shrink-0`}>{rightIcon}</span>}
    </button>
  )
})
