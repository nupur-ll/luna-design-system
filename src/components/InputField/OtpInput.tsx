import { useRef } from 'react'
import { IconWarningCircle } from '../../icons/formIcons'

/**
 * OtpInput — Luna Design System "Input-field", Type=OTP.
 * Figma: node 29104:135012 (OTP variant), Luna Design.
 * 6 separate cells, each its own input box, per components.md.
 */
export interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export function OtpInput({ length = 6, value, onChange, error, disabled }: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([])

  function setDigit(index: number, digit: string) {
    const next = value.split('')
    next[index] = digit
    onChange(next.join('').slice(0, length))
    if (digit && index < length - 1) refs.current[index + 1]?.focus()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            disabled={disabled}
            value={value[i] ?? ''}
            maxLength={1}
            inputMode="numeric"
            onChange={(e) => setDigit(i, e.target.value.replace(/\D/g, ''))}
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus()
            }}
            className={[
              'h-full min-w-0 flex-1 rounded-8 border bg-white px-16 py-12 text-center text-[20px] font-semibold leading-[24px] text-text-primary',
              error ? 'border-error-primary' : 'border-border-grey focus:border-brand-primary',
              disabled ? 'bg-surface-container-light-grey text-text-grey' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>
      {error && (
        <p className="flex items-center gap-4 text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-error-primary">
          <IconWarningCircle className="size-16 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
