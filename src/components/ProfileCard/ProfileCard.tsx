import type { ReactNode } from 'react'
import { Button } from '../Button'
import { IconCheckCircle } from '../../icons/common'

/**
 * ProfileCard — Luna Design System "Profile Card", node 29206:75571.
 * Figma's 4 variants (Default/Agency Creator/LehLah App User/Both) are all
 * the same layout with different subsets of rows filled in (an agency
 * contact tag here, an app-user detail there) — not a real "variant" API,
 * so this is one component whose sections (`platforms`, `details`,
 * `contacts`, `content`) are all optional/generic arrays. Whatever a
 * particular creator has, the consumer passes; the card doesn't encode
 * which of the 4 named Figma variants that corresponds to.
 *
 * Every row in Figma reuses the same little "icon + value" shape
 * (Figma's own ".Card Details" sub-component, node 23645:38656) for a
 * dozen different fields (followers, location, gender, phone, email...).
 * Rather than one prop per field, this repo represents each of those as
 * `{ icon, value }` and lets the consumer supply as many as apply —
 * closer to how Table/Dropdown/Navbar already turn Figma's fixed
 * instance lists into generic arrays.
 */
export interface ProfileCardDetail {
  icon: ReactNode
  value: ReactNode
}

export interface ProfileCardPlatform {
  /** Platform glyph (Instagram/YouTube/etc) — consumer-supplied, same slot pattern as Navbar's item icons. */
  icon: ReactNode
  handle: ReactNode
  stats: ProfileCardDetail[]
}

export interface ProfileCardContact extends ProfileCardDetail {
  /** e.g. "Agency's Contact" — Figma's pill tag next to a phone/email row. */
  tag?: string
  verified?: boolean
}

export interface ProfileCardContentRow {
  label: string
  values: string[]
}

export interface ProfileCardProps {
  name: string
  verified?: boolean
  /** The cover photo — consumer supplies the <img>, same as Navbar's orgAvatar. */
  photo: ReactNode
  onAddToList?: () => void
  addToListLabel?: string
  platforms?: ProfileCardPlatform[]
  details?: ProfileCardDetail[]
  contacts?: ProfileCardContact[]
  content?: ProfileCardContentRow[]
  className?: string
}

function DetailCell({ icon, value }: ProfileCardDetail) {
  return (
    <div className="flex flex-1 items-center gap-4 px-8 py-4">
      <span className="flex size-14 shrink-0 items-center justify-center text-text-primary">{icon}</span>
      <span className="truncate text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-text-primary">{value}</span>
    </div>
  )
}

export function ProfileCard({
  name,
  verified,
  photo,
  onAddToList,
  addToListLabel = 'Add to list',
  platforms = [],
  details = [],
  contacts = [],
  content = [],
  className,
}: ProfileCardProps) {
  return (
    <div
      className={['flex w-350 flex-col gap-16 rounded-12 bg-white px-12 pb-16 pt-12 shadow-container-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="relative flex h-[326px] w-full flex-col justify-end overflow-hidden rounded-8 p-12">
        <div className="absolute inset-0 [&>*]:size-full [&>*]:object-cover">{photo}</div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-overlay-black-80" />
        <div className="relative flex w-full items-center gap-12">
          <div className="flex flex-1 items-center gap-4 text-[14px] font-bold leading-[20px] tracking-[0] text-white">
            <span className="truncate">{name}</span>
            {verified && <IconCheckCircle className="size-16 shrink-0" />}
          </div>
          {onAddToList && (
            <Button variant="secondary" size="sm" onClick={onAddToList} className="shrink-0">
              {addToListLabel}
            </Button>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-8">
        {platforms.length > 0 && (
          <div className="flex flex-col">
            {platforms.map((platform, index) => (
              <div key={index} className="flex flex-col gap-4 py-8">
                <div className="flex items-center gap-6 px-8">
                  <span className="flex size-12 shrink-0 items-center justify-center text-text-primary">{platform.icon}</span>
                  <span className="text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-text-primary">{platform.handle}</span>
                </div>
                <div className="flex items-start gap-8">
                  {platform.stats.map((stat, statIndex) => (
                    <DetailCell key={statIndex} {...stat} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {platforms.length > 0 && (details.length > 0 || contacts.length > 0) && <div className="h-0.5 w-full bg-border-light-grey" />}

        {details.length > 0 && (
          <div className="flex w-full flex-col">
            {Array.from({ length: Math.ceil(details.length / 2) }, (_, rowIndex) => (
              <div key={rowIndex} className="flex items-start gap-8">
                <DetailCell {...details[rowIndex * 2]} />
                {details[rowIndex * 2 + 1] && <DetailCell {...details[rowIndex * 2 + 1]} />}
              </div>
            ))}
          </div>
        )}

        {details.length > 0 && contacts.length > 0 && <div className="h-0.5 w-full bg-border-light-grey" />}

        {contacts.length > 0 && (
          <div className="flex w-full flex-col">
            {contacts.map((contact, index) => (
              <div key={index} className="flex w-full items-center gap-4 px-8 py-4">
                <span className="flex size-14 shrink-0 items-center justify-center text-text-primary">{contact.icon}</span>
                <span className="text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-text-primary">{contact.value}</span>
                {contact.tag && (
                  <span className="rounded-full bg-surface-container-light-grey px-8 py-2 text-[11px] font-semibold leading-[16px] tracking-[0] text-text-grey">
                    {contact.tag}
                  </span>
                )}
                {contact.verified && <IconCheckCircle className="size-16 shrink-0" />}
              </div>
            ))}
          </div>
        )}

        {contacts.length > 0 && content.length > 0 && <div className="h-0.5 w-full bg-border-light-grey" />}

        {content.length > 0 && (
          <div className="flex w-full flex-col gap-8">
            {content.map((row, index) => (
              <div key={index} className="flex flex-col gap-2 px-8">
                <p className="text-[12px] font-semibold leading-[16px] tracking-[-0.3px] text-text-grey">{row.label}</p>
                <p className="flex items-center gap-6 text-[12px] font-medium leading-[16px] tracking-[-0.3px] text-text-primary">
                  {row.values.map((value, valueIndex) => (
                    <span key={valueIndex} className="flex items-center gap-6">
                      {valueIndex > 0 && <span className="size-4 shrink-0 rounded-full bg-text-grey" />}
                      {value}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
