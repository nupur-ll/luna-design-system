import type { ReactNode } from 'react'

/**
 * Table — Luna Design System "Table", node 29957:153976. Two Figma main
 * variants: "Default" (a plain grid, every column equal-width, no
 * scrolling) and "Horizontal Scroll" (a wide table where the first column
 * — a creator identity cell with avatar+name+username — stays pinned
 * while the rest of the columns scroll sideways).
 *
 * Figma bakes in a fixed 6-column / 5-row instance for Default and a
 * fixed set of identity+data columns for Horizontal Scroll. Neither is a
 * real column/row count in practice, so both collapse into one generic
 * `columns` + `rows` API; `stickyFirstColumn` switches on the
 * Horizontal-Scroll behavior for any column count rather than being a
 * separate component.
 */
export interface TableColumn {
  key: string
  header: ReactNode
  /** Fixed pixel width. Omit to split remaining space evenly, matching Figma's Default variant. */
  width?: number
}

export interface TableRow {
  key: string
  cells: Record<string, ReactNode>
}

export interface TableProps {
  columns: TableColumn[]
  rows: TableRow[]
  /** Pins the first column and scrolls the rest — Figma's "Horizontal Scroll" variant. */
  stickyFirstColumn?: boolean
  className?: string
}

export function Table({ columns, rows, stickyFirstColumn, className }: TableProps) {
  const [firstColumn, ...restColumns] = columns

  function ColumnGroup({ cols, sticky }: { cols: TableColumn[]; sticky?: boolean }) {
    return (
      <div className={sticky ? 'shrink-0 border-r border-border-grey bg-white' : 'flex min-w-0 flex-1 flex-col'} style={sticky ? { width: cols[0]?.width ?? 242 } : undefined}>
        <div className="flex h-44 w-full border-b border-border-grey">
          {cols.map((col) => (
            <div
              key={col.key}
              className="flex shrink-0 items-center px-16 text-[14px] font-semibold leading-[20px] tracking-[0] text-text-primary"
              style={{ width: col.width, flex: col.width ? undefined : 1 }}
            >
              {col.header}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.key} className="flex w-full items-stretch border-b border-border-light-grey last:border-b-0">
            {cols.map((col) => (
              <div
                key={col.key}
                className="flex min-h-[56px] shrink-0 items-center px-16 text-[14px] font-medium leading-[20px] tracking-[0] text-text-secondary"
                style={{ width: col.width, flex: col.width ? undefined : 1 }}
              >
                {row.cells[col.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (!stickyFirstColumn) {
    return (
      <div className={['w-full overflow-hidden rounded-8 border border-border-grey', className].filter(Boolean).join(' ')}>
        <ColumnGroup cols={columns} />
      </div>
    )
  }

  return (
    <div className={['flex w-full overflow-hidden rounded-8 border border-border-grey', className].filter(Boolean).join(' ')}>
      {firstColumn && <ColumnGroup cols={[firstColumn]} sticky />}
      <div className="flex-1 overflow-x-auto">
        <div className="flex min-w-max">
          <ColumnGroup cols={restColumns} />
        </div>
      </div>
    </div>
  )
}
