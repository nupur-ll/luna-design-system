import { IconX } from '../../icons/formIcons'

/**
 * InputChip — Luna Design System ".Input-chip", node 29007:161558.
 * The small removable tag used below Action-field's input (and inline in
 * Dropdown's closed field) to show accumulated/selected values.
 */
export interface InputChipProps {
  text: string
  onRemove?: () => void
  className?: string
}

export function InputChip({ text, onRemove, className }: InputChipProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-8 rounded-4 border-xs border-border-grey bg-overlay-brand-8 px-8 py-4 text-[14px] font-semibold leading-[20px] text-text-secondary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="max-w-[160px] truncate">{text}</span>
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`Remove ${text}`} className="shrink-0 text-text-secondary/70 hover:text-text-secondary">
          <IconX className="size-12" />
        </button>
      )}
    </span>
  )
}
