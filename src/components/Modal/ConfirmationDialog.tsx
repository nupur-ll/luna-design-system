import { Button } from '../Button'

/**
 * ConfirmationDialog — Luna Design System "Confirmation Pop-Up", node
 * 31120:165365. The content card meant to go inside <Modal>. Figma's copy
 * ("Are you sure you want to delete the content?" / "Yes, Remove") is a
 * delete-confirmation instance, not the component's only use, so title/
 * subtext/button labels are all props rather than hardcoded — same
 * treatment as every other component in this repo that Figma showed with
 * one instance's real copy baked in.
 */
export interface ConfirmationDialogProps {
  title: string
  subtext: string
  cancelLabel?: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
  /** Figma's instance is a destructive (delete) confirmation — Error button. Set false for a neutral confirm. */
  destructive?: boolean
  className?: string
}

export function ConfirmationDialog({
  title,
  subtext,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onCancel,
  onConfirm,
  destructive = true,
  className,
}: ConfirmationDialogProps) {
  return (
    <div
      className={['flex w-600 flex-col gap-24 rounded-12 bg-white px-20 pb-20 pt-16 shadow-container-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-col gap-20">
        <p className="text-[16px] font-bold leading-[20px] tracking-[-0.3px] text-text-primary">{title}</p>
        <div className="h-0.5 w-full bg-border-light-grey" />
        <p className="text-[16px] font-medium leading-[20px] tracking-[-0.3px] text-text-grey-dark">{subtext}</p>
      </div>
      <div className="flex items-center justify-end gap-12">
        <Button variant="secondary" size="md" className="w-140" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={destructive ? 'error' : 'primary'} size="md" className="w-140" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  )
}
