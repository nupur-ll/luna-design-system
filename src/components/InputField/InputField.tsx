import { forwardRef, useId, useRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { IconWarningCircle } from '../../icons/formIcons'
import { InputChip } from './InputChip'

/**
 * InputField — Luna Design System, component set "Input-field" (node
 * 29104:135012). Covers the Default, Action-field, and Prefix-field types.
 * Dropdown and OTP are separate components — see Dropdown.tsx and
 * OtpInput.tsx in this folder — since their shape is different enough that
 * forcing them into one component would make all three harder to use.
 *
 * States: Figma's "Focused" is the browser's native :focus, handled with a
 * `focus-within:` class rather than a prop. "Filled" is genuinely just
 * "has a value" for the Default and Prefix-field types — confirmed by
 * comparing the Default/Default and Default/Filled screenshots side by
 * side, they're pixel-identical apart from the text itself — so it needs
 * no code of its own. `error` and `disabled` are the two states that
 * actually need a prop.
 *
 * Action-field's "Filled" state is the one exception: the Figma instance
 * shows the typed value AND a row of removable chips below it at the same
 * time, which is a tag-accumulator (type a value, click Add, it becomes a
 * chip; the field clears for the next one) rather than "the input has
 * text". That's what `tags`/`onAddTag`/`onRemoveTag` below model — this is
 * the one place in this component where the Figma instance's exact copy
 * ("2" in the field, "#abc/#def/#ghi" as chips) didn't tell us the
 * interaction on its own, so this is an inferred behavior, not a directly
 * observed one.
 */

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size' | 'prefix'> {
  label: string
  required?: boolean
  error?: string
  helperText?: string
  /** Renders a fixed non-editable prefix before the input, e.g. an icon or "+91". */
  prefix?: ReactNode
  /**
   * Renders a fixed non-editable trailing icon, e.g. a caret for a
   * select-styled field (see DiscoveryFilterPanel's "Sale Range" rows,
   * node 29288:103757 — a plain InputField with CaretDown baked into the
   * field rather than a real dropdown). Distinct from `actionLabel`,
   * which is an interactive button.
   */
  suffix?: ReactNode
  /** Renders a trailing action button (Figma's Action-field "Add" button). */
  actionLabel?: string
  /**
   * Called with the input's current value when the action button is
   * clicked. Typical use: append it to your `tags` array and update
   * `value` to clear the field for the next entry.
   */
  onAction?: (currentValue: string) => void
  /** Accumulated chips shown below the field — only meaningful alongside `actionLabel`. */
  tags?: string[]
  onRemoveTag?: (index: number) => void
  /** Tags beyond this many collapse into a "+N more" chip. Defaults to 3. */
  maxVisibleTags?: number
  className?: string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    label,
    required,
    error,
    helperText,
    prefix,
    suffix,
    actionLabel,
    onAction,
    tags,
    onRemoveTag,
    maxVisibleTags = 3,
    className,
    disabled,
    id,
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const localRef = useRef<HTMLInputElement | null>(null)

  const visibleTags = tags?.slice(0, maxVisibleTags) ?? []
  const overflowCount = (tags?.length ?? 0) - visibleTags.length

  return (
    <div className={['flex w-full flex-col gap-4', className].filter(Boolean).join(' ')}>
      <label
        htmlFor={inputId}
        className="flex items-center gap-4 text-[14px] font-semibold leading-[20px] text-text-grey-dark"
      >
        {label}
        {required && <span className="text-[16px] leading-[20px] tracking-[-0.3px]">*</span>}
      </label>

      <div
        className={[
          'flex h-44 items-center rounded-8 border bg-white px-16',
          error
            ? 'border-error-primary'
            : disabled
              ? 'border-border-grey bg-surface-container-light-grey'
              : 'border-border-grey focus-within:border-brand-primary',
          prefix ? 'gap-12 pr-8' : '',
          actionLabel || suffix ? 'gap-12 pr-8' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {prefix && (
          <span className="flex h-full shrink-0 items-center border-r border-border-grey pr-12 text-[14px] leading-[20px] text-text-grey">
            {prefix}
          </span>
        )}

        <input
          ref={(node) => {
            localRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) (ref as { current: HTMLInputElement | null }).current = node
          }}
          id={inputId}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold leading-[20px] text-text-primary placeholder:font-medium placeholder:text-text-grey disabled:cursor-not-allowed disabled:text-text-grey"
          {...rest}
        />

        {actionLabel && (
          <button
            type="button"
            onClick={() => onAction?.(localRef.current?.value ?? '')}
            disabled={disabled}
            className="shrink-0 rounded-4 bg-black px-12 py-8 text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-white disabled:bg-surface-container-disabled disabled:text-grey-60"
          >
            {actionLabel}
          </button>
        )}

        {suffix && !actionLabel && <span className="flex shrink-0 items-center text-text-grey">{suffix}</span>}
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-start gap-4">
          {visibleTags.map((tag, index) => (
            <InputChip key={`${tag}-${index}`} text={tag} onRemove={disabled ? undefined : () => onRemoveTag?.(index)} />
          ))}
          {overflowCount > 0 && <InputChip text={`+${overflowCount} more`} />}
        </div>
      )}

      {error ? (
        <p className="flex items-center gap-4 text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-error-primary">
          <IconWarningCircle className="size-16 shrink-0" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[12px] leading-[16px] text-text-grey">{helperText}</p>
      ) : null}
    </div>
  )
})
