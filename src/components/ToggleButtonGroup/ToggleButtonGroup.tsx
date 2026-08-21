/**
 * ToggleButtonGroup — Luna Design System "Toggle Button", node 29795:200430.
 * A segmented control (Figma names this "Toggle Button", distinct from
 * the on/off "Toggle Switch" in ../ToggleSwitch).
 */
export type ToggleButtonGroupSize = 'sm' | 'lg'

export interface ToggleButtonOption {
  label: string
  value: string
}

export interface ToggleButtonGroupProps {
  options: ToggleButtonOption[]
  value: string
  onChange: (value: string) => void
  size?: ToggleButtonGroupSize
  className?: string
}

const containerPaddingClasses: Record<ToggleButtonGroupSize, string> = {
  sm: 'p-2',
  lg: 'p-4',
}

const itemClasses: Record<ToggleButtonGroupSize, string> = {
  sm: 'px-12 py-8 text-[12px] leading-[16px] tracking-[-0.3px]',
  lg: 'px-12 py-8 text-[14px] leading-[20px]',
}

export function ToggleButtonGroup({ options, value, onChange, size = 'lg', className }: ToggleButtonGroupProps) {
  return (
    <div
      className={[
        'inline-flex items-center rounded-4 bg-surface-container-light-grey',
        containerPaddingClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              'flex-1 whitespace-nowrap rounded-4 text-center font-semibold',
              itemClasses[size],
              active
                ? 'border-[0.5px] border-border-grey bg-white text-text-primary shadow-container-4'
                : 'font-medium text-text-grey',
            ].join(' ')}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
