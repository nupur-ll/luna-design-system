import { useState } from 'react'
import type { ReactNode } from 'react'
import { IconSignOut } from '../../icons/navIcons'
import lehlahLogoUrl from '../../assets/lehlah-logo.png'

/**
 * Navbar — Luna Design System "Navbar", node 12587:8769.
 * A dark vertical nav rail: logo, a column of icon+label nav items, and an
 * org/profile block pinned to the bottom that opens a small logout popover.
 *
 * Figma models each nav destination (Discovery/Analytics/Gifting/...) as a
 * separate component variant with its own icon baked in. That doesn't make
 * sense as a fixed variant prop in code — different consumers will want
 * different destinations — so this is a generic `items` list instead, same
 * shape as Button's leftIcon/rightIcon: each item's `icon` is a plain
 * ReactNode the consumer supplies (see src/icons/lehlah/index.tsx for the
 * real Figma-sourced nav icons used in this repo's own preview, and
 * src/icons/navIcons.tsx for the one remaining hand-drawn placeholder —
 * SignOut — that Figma's screenshot API returned blank for every time it
 * was requested).
 */
export interface NavbarItem {
  key: string
  label: string
  icon: ReactNode
  active?: boolean
  onClick?: () => void
}

export interface NavbarProps {
  items: NavbarItem[]
  /** Defaults to the real LehLah "L." mark (src/assets/lehlah-logo.png). */
  logo?: ReactNode
  orgName?: string
  orgSubtitle?: string
  orgAvatar?: ReactNode
  onLogout?: () => void
  className?: string
}

export function Navbar({ items, logo, orgName, orgSubtitle, orgAvatar, onLogout, className }: NavbarProps) {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <nav
      className={['flex h-full w-68 flex-col items-center justify-between bg-black px-4 py-20', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center justify-center p-8">
          <div className="flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {logo ?? <img src={lehlahLogoUrl} alt="LehLah" className="size-full object-contain" />}
          </div>
        </div>
        <div className="h-0.5 w-full bg-overlay-white-16" />
        <div className="flex flex-col gap-2 pt-4">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              aria-current={item.active ? 'page' : undefined}
              className="flex size-60 flex-col items-center justify-center gap-2 p-4"
            >
              <span
                className={[
                  'flex items-center justify-center rounded-4 p-8 transition-colors',
                  item.active ? 'bg-overlay-brand-50' : 'hover:bg-overlay-white-16',
                ].join(' ')}
              >
                <span className="size-20 text-white">{item.icon}</span>
              </span>
              <span className="max-w-full text-center text-[11px] font-medium leading-[16px] text-white">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {(orgName || onLogout) && (
        <div className="relative flex w-full flex-col items-center">
          {profileOpen && (
            <div className="absolute bottom-0 left-full ml-8 flex w-[184px] flex-col gap-8 rounded-8 bg-white p-8 shadow-container-4">
              <div className="flex items-center gap-8">
                <div className="size-32 shrink-0 overflow-hidden rounded-full bg-grey-90">{orgAvatar}</div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-text-primary">
                    {orgName}
                  </p>
                  {orgSubtitle && (
                    <p className="truncate text-[11px] font-medium leading-[16px] text-text-grey-dark">
                      {orgSubtitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="h-0.5 w-full bg-border-light-grey" />
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-8 rounded-4 px-8 py-4 text-left hover:bg-surface-container-light-grey"
              >
                <IconSignOut className="size-20 shrink-0 text-text-primary" />
                <span className="text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-text-primary">
                  Logout
                </span>
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex w-full items-center justify-center p-8"
          >
            <div className="size-36 shrink-0 overflow-hidden rounded-full bg-grey-90">{orgAvatar}</div>
          </button>
        </div>
      )}
    </nav>
  )
}
