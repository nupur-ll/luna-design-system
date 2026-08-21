import type { ReactNode } from 'react'

/**
 * PageFooter — Luna Design System "Footer", node 30419:163854, composed
 * with its ".Footer-elements" sub-variants (Text/CTA/Back Button, node
 * 31766:196130). Same slot-based approach as PageHeader: `meta` is the
 * left-hand content (credits chip + text, a back button, or nothing) and
 * `actions` is the right-hand button group — pass this repo's own
 * <Button> rather than re-implementing Secondary/Primary styling here.
 */
export interface PageFooterProps {
  meta?: ReactNode
  actions?: ReactNode
  className?: string
}

export function PageFooter({ meta, actions, className }: PageFooterProps) {
  return (
    <footer
      className={[
        'flex items-center gap-16 border-t-xs border-border-grey bg-surface-container-light-grey px-40 py-24 shadow-container-2',
        meta ? 'justify-between' : 'justify-end',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {meta && <div className="flex items-center gap-20">{meta}</div>}
      {actions && <div className="flex items-center gap-16">{actions}</div>}
    </footer>
  )
}
