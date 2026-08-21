import type { ImgHTMLAttributes } from 'react'
import discoveryUrl from './discovery.png'
import analyticsUrl from './analytics.png'
import giftingUrl from './gifting.png'
import fullFunnelUrl from './full-funnel.png'
import settingsUrl from './settings.png'
import adminUrl from './admin.png'
import socialListeningUrl from './social-listening.png'

/**
 * Real Navbar nav-item icons, pulled from Figma (not hand-drawn): each is a
 * screenshot of the actual icon instance used in the Navbar component
 * (Luna Design, node 12587:8769 and its per-tab variants), converted from
 * "white glyph on the dark rail" to a transparent-background PNG so it
 * composites over Navbar's own background/active-state highlight. See
 * CLAUDE.md for the extraction method and its one gap: SignOut/Logout
 * couldn't be captured this way (Figma returned a blank render for that
 * specific instance every time) — `IconLogout` below still falls back to
 * the hand-drawn placeholder in `../navIcons.tsx`.
 */
type ImgProps = ImgHTMLAttributes<HTMLImageElement>

const img = (src: string, alt: string) => (props: ImgProps) => (
  <img src={src} alt={alt} className={['size-full object-contain', props.className].filter(Boolean).join(' ')} {...props} />
)

export const IconDiscovery = img(discoveryUrl, 'Discovery')
export const IconAnalytics = img(analyticsUrl, 'Analytics')
export const IconGifting = img(giftingUrl, 'Gifting')
export const IconFullFunnel = img(fullFunnelUrl, 'Full Funnel')
export const IconSettings = img(settingsUrl, 'Settings')
export const IconAdmin = img(adminUrl, 'Admin')
export const IconSocialListening = img(socialListeningUrl, 'Social Listening')
