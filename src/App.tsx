import { useState } from 'react'
import { luna } from './styles/typography'
import { Button } from './components/Button'
import { InputField, OtpInput, Dropdown } from './components/InputField'
import { RadioButton } from './components/RadioButton'
import { Checkbox } from './components/Checkbox'
import { ToggleSwitch } from './components/ToggleSwitch'
import { Chip } from './components/Chip'
import { StatusChip } from './components/StatusChip'
import { MenuButton } from './components/MenuButton'
import { ToggleButtonGroup } from './components/ToggleButtonGroup'
import { Navbar } from './components/Navbar'
import { PageHeader } from './components/PageHeader'
import { PageFooter } from './components/PageFooter'
import { Pagination } from './components/Pagination'
import { PrimaryTabs } from './components/PrimaryTabs'
import { SecondaryTabs } from './components/SecondaryTabs'
import { IconDiscovery, IconAnalytics, IconGifting, IconFullFunnel, IconSettings } from './icons/lehlah'
import myntraIconUrl from './assets/myntra-icon.png'
import { SearchBar } from './components/SearchBar'
import { ProgressIndicator } from './components/ProgressIndicator'
import { FloatingElement } from './components/FloatingElement'
import { Modal, ConfirmationDialog } from './components/Modal'
import { CreatorCard } from './components/CreatorCard'
import { ProfileCard } from './components/ProfileCard'
import { CreatorListCard } from './components/CreatorListCard'
import { Table } from './components/Table'
import { DiscoveryFilterPanel } from './components/DiscoveryFilterPanel'
import { IconInstagram, IconYoutube } from './icons/common'
import { IconGear } from './icons/navIcons'

/** Demo-only stand-in for a real photo — none of the new card components ship with placeholder art. */
function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-brand-secondary to-brand-dark text-[12px] font-semibold text-white ${className ?? ''}`}>
      {label}
    </div>
  )
}

/**
 * Temporary preview page — a running style-guide of everything that's
 * been pulled from Figma so far. Claude Code will replace this with
 * real app pages; keep it around as a quick visual sanity check while
 * more components are added.
 */
export default function App() {
  const [campaignName, setCampaignName] = useState('')
  const [hashtags, setHashtags] = useState<string[]>(['#abc', '#def', '#ghi'])
  const [hashtagInput, setHashtagInput] = useState('')
  const [otp, setOtp] = useState('')
  const [audiences, setAudiences] = useState<string[]>(['insta'])
  const [platform, setPlatform] = useState('instagram')
  const [chipSelected, setChipSelected] = useState(true)
  const [toggleView, setToggleView] = useState('upload')
  const [navActive, setNavActive] = useState('discovery')
  const [primaryTab, setPrimaryTab] = useState('profile')
  const [secondaryTab, setSecondaryTab] = useState('overview')
  const [searchValue, setSearchValue] = useState('Tarini')
  const [genericSearch, setGenericSearch] = useState('')
  const [activeStep, setActiveStep] = useState('verify')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [creatorSelected, setCreatorSelected] = useState(false)
  const [listSelected, setListSelected] = useState(false)
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({
    appUsers: true,
    niches: ['beauty'],
  })

  return (
    <div className="min-h-screen bg-surface-bg-white p-24">
      <h1 className={`${luna.headingMedium700} text-text-primary`}>Luna UI</h1>
      <p className={`${luna.bodyMedium400} mt-8 text-text-secondary`}>
        Components generated from the Luna Design Figma file will appear here as they're built.
      </p>

      <section className="mt-32 flex flex-col gap-16">
        <h2 className={`${luna.titleSmall600} text-text-primary`}>Button — sizes &amp; variants</h2>
        <div className="flex flex-wrap items-end gap-12">
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="sm">Small</Button>
        </div>
        <div className="flex flex-wrap items-center gap-12">
          <Button variant="primary" size="lg">Remove</Button>
          <Button variant="secondary" size="lg">Remove</Button>
          <Button variant="error" size="lg">Remove</Button>
          <Button variant="primary" size="lg" disabled>Remove</Button>
          <Button variant="ghost" ghostTone="primary">Remove</Button>
          <Button variant="ghost" ghostTone="brand">Remove</Button>
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Input Field — Default / Prefix-field</h2>
        <div className="flex max-w-[306px] flex-col gap-16">
          <InputField
            label="Name of the campaign"
            required
            placeholder="Enter campaign name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
          <InputField
            label="Name of the campaign"
            required
            defaultValue="2"
            error="Budget cannot exceed ₹100Cr"
          />
          <InputField label="Name of the campaign" required placeholder="Enter campaign name" disabled />
          <InputField
            label="Contact number"
            required
            placeholder="98765 43210"
            prefix={<span className="font-semibold">+91</span>}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Input Field — Action-field (tag accumulator)</h2>
        <div className="max-w-[306px]">
          <InputField
            label="Add hashtags"
            required
            placeholder="Type a hashtag"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            actionLabel="Add"
            onAction={(currentValue) => {
              if (!currentValue.trim()) return
              setHashtags((tags) => [...tags, currentValue.trim()])
              setHashtagInput('')
            }}
            tags={hashtags}
            onRemoveTag={(index) => setHashtags((tags) => tags.filter((_, i) => i !== index))}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Input Field — Dropdown</h2>
        <div className="max-w-[306px]">
          <Dropdown
            label="Audiences"
            required
            placeholder="Select audiences"
            options={[
              { label: 'Instagram creators', value: 'insta' },
              { label: 'YouTube creators', value: 'youtube' },
              { label: 'Fashion niche', value: 'fashion' },
              { label: 'Beauty niche', value: 'beauty' },
              { label: 'Tier 1 cities', value: 'tier1' },
            ]}
            value={audiences}
            onChange={setAudiences}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Input Field — OTP</h2>
        <OtpInput value={otp} onChange={setOtp} />
        <OtpInput value="482" onChange={() => {}} error="Incorrect OTP, please try again" />

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Radio / Checkbox / Toggle Switch</h2>
        <div className="flex flex-wrap items-center gap-24">
          <RadioButton name="platform-demo" label="Instagram" checked={platform === 'instagram'} onChange={() => setPlatform('instagram')} />
          <RadioButton name="platform-demo" label="YouTube" checked={platform === 'youtube'} onChange={() => setPlatform('youtube')} />
          <Checkbox label="Gifted by you" defaultChecked />
          <Checkbox label="Blue tick creator" />
          <ToggleSwitch defaultChecked />
          <ToggleSwitch size="lg" />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Chips / Status Chip</h2>
        <div className="flex flex-wrap items-center gap-12">
          <Chip selected={chipSelected} onClick={() => setChipSelected((s) => !s)}>
            Myntra
          </Chip>
          <Chip>Nykaa</Chip>
          <Chip disabled>Boat</Chip>
          <StatusChip variant="positive">Approved</StatusChip>
          <StatusChip variant="negative">Rejected</StatusChip>
          <StatusChip variant="processing">Processing</StatusChip>
          <StatusChip variant="incomplete">Incomplete</StatusChip>
          <StatusChip variant="default">Application Under Review</StatusChip>
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Menu Button / Toggle Button Group</h2>
        <div className="flex flex-wrap items-center gap-24">
          <MenuButton
            label="Select platform"
            options={[
              { label: 'Instagram', value: 'instagram' },
              { label: 'YouTube', value: 'youtube' },
            ]}
          />
          <ToggleButtonGroup
            value={toggleView}
            onChange={setToggleView}
            options={[
              { label: 'Upload', value: 'upload' },
              { label: 'Creator Lists', value: 'lists' },
              { label: 'Manual Select', value: 'manual' },
            ]}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Navbar</h2>
        <div className="h-[520px] w-fit">
          <Navbar
            orgName="Myntra Fashion"
            orgSubtitle="Fashion E-commerce"
            orgAvatar={<img src={myntraIconUrl} alt="Myntra Fashion" className="size-full object-cover" />}
            onLogout={() => alert('Logout clicked')}
            items={[
              { key: 'discovery', label: 'Discovery', icon: <IconDiscovery />, active: navActive === 'discovery', onClick: () => setNavActive('discovery') },
              { key: 'analytics', label: 'Analytics', icon: <IconAnalytics />, active: navActive === 'analytics', onClick: () => setNavActive('analytics') },
              { key: 'gifting', label: 'Gifting', icon: <IconGifting />, active: navActive === 'gifting', onClick: () => setNavActive('gifting') },
              { key: 'funnel', label: 'Full Funnel', icon: <IconFullFunnel />, active: navActive === 'funnel', onClick: () => setNavActive('funnel') },
              { key: 'settings', label: 'Settings', icon: <IconSettings />, active: navActive === 'settings', onClick: () => setNavActive('settings') },
            ]}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Page Header / Footer</h2>
        <div className="flex flex-col overflow-hidden rounded-8 border border-border-grey">
          <PageHeader
            title="Campaign Performance"
            backButton
            onBack={() => alert('Back clicked')}
            actions={
              <>
                <Button variant="secondary" size="md">Export</Button>
                <Button variant="primary" size="md">New Campaign</Button>
              </>
            }
          />
          <div className="p-24 text-[14px] text-text-grey">Page content goes here.</div>
          <PageFooter
            meta={<span className={`${luna.titleLarge700} text-text-primary`}>43 <span className="text-[16px] font-medium text-text-grey">credits required</span></span>}
            actions={
              <>
                <Button variant="secondary" size="md">Secondary</Button>
                <Button variant="primary" size="md">Primary</Button>
              </>
            }
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Pagination</h2>
        <Pagination from={1} to={15} total={300} />

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Primary Tabs / Secondary Tabs</h2>
        <PrimaryTabs
          activeKey={primaryTab}
          onChange={setPrimaryTab}
          items={[
            { key: 'profile', label: 'Profile Summary' },
            { key: 'sales', label: 'Sales Overview' },
            { key: 'campaign', label: 'Campaign Performance' },
            { key: 'gifting', label: 'Gifting Campaigns' },
          ]}
        />
        <SecondaryTabs
          activeKey={secondaryTab}
          onChange={setSecondaryTab}
          items={[
            { key: 'overview', label: 'Overview', count: 8 },
            { key: 'creators', label: 'Creators', count: 24 },
            { key: 'posts', label: 'Posts', count: 12 },
          ]}
        />

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Search Bar — Discovery / Generic</h2>
        <div className="flex flex-wrap items-start gap-24">
          <SearchBar
            type="discovery"
            value={searchValue}
            onChange={setSearchValue}
            recentSearches={['Shwetha', 'shwetha_923', 'Nivea']}
            onRemoveRecentSearch={() => {}}
            results={[
              { id: '1', name: 'Tarini Shetty', handle: 'tarini_shetty', avatar: <PhotoPlaceholder label="TS" className="size-full" /> },
              { id: '2', name: 'Tarini Shetty', handle: 'tarini_shetty', avatar: <PhotoPlaceholder label="TS" className="size-full" /> },
            ]}
          />
          <SearchBar type="generic" value={genericSearch} onChange={setGenericSearch} />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Progress Indicator</h2>
        <ProgressIndicator
          activeKey={activeStep}
          steps={[
            { key: 'details', label: 'Details' },
            { key: 'verify', label: 'Verify' },
            { key: 'submit', label: 'Submit' },
          ]}
        />
        <div className="flex gap-8">
          <Button size="sm" variant="secondary" onClick={() => setActiveStep('details')}>Details</Button>
          <Button size="sm" variant="secondary" onClick={() => setActiveStep('verify')}>Verify</Button>
          <Button size="sm" variant="secondary" onClick={() => setActiveStep('submit')}>Submit</Button>
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Floating Element — Action / Toast</h2>
        <div className="flex flex-col gap-12">
          <FloatingElement
            type="action"
            text="43 Creators Selected:"
            primaryButtonText="Remove"
            secondaryButtonText="Remove"
            infoText="57 out of 100 creators shortlisted. Only 43 creators can be approved, others will be auto-rejected."
          />
          <FloatingElement type="toast" toastText="43 Creators Selected:" />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Modal / Confirmation Dialog</h2>
        <Button variant="error" size="md" onClick={() => setConfirmOpen(true)}>Delete content</Button>
        <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <ConfirmationDialog
            title="Are you sure you want to delete the content?"
            subtext="The content will be removed permanently from the campaign and the report date."
            confirmLabel="Yes, Remove"
            onCancel={() => setConfirmOpen(false)}
            onConfirm={() => setConfirmOpen(false)}
          />
        </Modal>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Creator Card</h2>
        <div className="flex flex-wrap gap-16">
          <CreatorCard
            platform="instagram"
            photo={<PhotoPlaceholder label="Supriya P" className="size-full" />}
            creatorName="Supriya P"
            handleLabel="supriya123_456"
            verifiedContact
            gifted
            lehlahUser
            selected={creatorSelected}
            onToggleSelect={() => setCreatorSelected((s) => !s)}
            niches={['Beauty & Skincare', 'Health & Fitness']}
            stats={[
              { value: '200K', label: 'Followers' },
              { value: '2.23%', label: 'Eng. Rate%' },
              { value: '120K', label: 'Median Views' },
            ]}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Profile Card</h2>
        <ProfileCard
          name="Garima Goel"
          verified
          photo={<PhotoPlaceholder label="Garima Goel" className="size-full" />}
          onAddToList={() => alert('Add to list')}
          platforms={[
            {
              icon: <IconInstagram className="size-full" />,
              handle: '@garimagoel',
              stats: [
                { icon: <IconGear className="size-full" />, value: '532K Followers' },
                { icon: <IconGear className="size-full" />, value: '168 Posts' },
              ],
            },
            {
              icon: <IconYoutube className="size-full" />,
              handle: 'Style with Garima / @garimagoel',
              stats: [
                { icon: <IconGear className="size-full" />, value: '250K Subscribers' },
                { icon: <IconGear className="size-full" />, value: '168 Videos' },
              ],
            },
          ]}
          details={[
            { icon: <IconGear className="size-full" />, value: 'Tiruvananthapuram' },
            { icon: <IconGear className="size-full" />, value: 'Malayalam, Hindi +1' },
            { icon: <IconGear className="size-full" />, value: 'Female' },
            { icon: <IconGear className="size-full" />, value: '₹5,000 - ₹15,000' },
          ]}
          contacts={[
            { icon: <IconGear className="size-full" />, value: '+918692002715', tag: "Agency's Contact", verified: true },
            { icon: <IconGear className="size-full" />, value: 'sweta.chaudhary@gmail.com', verified: true },
          ]}
          content={[
            { label: 'Content Niche', values: ['Beauty & Skincare', 'Fashion & Lifestyle'] },
            { label: 'Creator Type', values: ['Actor/Model', 'Photographer/Videographer'] },
            { label: 'Creator Aesthetic', values: ['Massy Premium'] },
          ]}
        />

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Creator List Card</h2>
        <div className="flex flex-wrap gap-16">
          <CreatorListCard
            variant="single-select"
            listName="My Beauty Creators"
            creatorsLabel="100 Creators"
            createdBy="nupur.g@lehlah.club"
            thumbnails={Array.from({ length: 6 }, (_, i) => <PhotoPlaceholder key={i} label={`${i + 1}`} className="size-full" />)}
            onAddToList={() => alert('Added to list')}
          />
          <CreatorListCard
            variant="multi-select"
            listName="My Beauty Creators"
            creatorsLabel="100 Creators"
            createdBy="nupur.g@lehlah.club"
            thumbnails={Array.from({ length: 6 }, (_, i) => <PhotoPlaceholder key={i} label={`${i + 1}`} className="size-full" />)}
            selected={listSelected}
            onToggleSelect={() => setListSelected((s) => !s)}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Table — Default / Horizontal Scroll</h2>
        <Table
          columns={[
            { key: 'c1', header: 'Label 1' },
            { key: 'c2', header: 'Label 2' },
            { key: 'c3', header: 'Label 3' },
            { key: 'c4', header: 'Label 4' },
            { key: 'c5', header: 'Label 5' },
            { key: 'cta', header: 'CTA Label' },
          ]}
          rows={Array.from({ length: 5 }, (_, i) => ({
            key: `row-${i}`,
            cells: {
              c1: `C1-Value ${i + 1}`,
              c2: `C2-Value ${i + 1}`,
              c3: `C3-Value ${i + 1}`,
              c4: `C4-Value ${i + 1}`,
              c5: `C5-Value ${i + 1}`,
              cta: <Button size="sm" variant="secondary">Action</Button>,
            },
          }))}
        />
        <div className="mt-12">
          <Table
            stickyFirstColumn
            columns={[
              { key: 'creator', header: 'Creator', width: 242 },
              { key: 'followers', header: 'Followers', width: 160 },
              { key: 'engagement', header: 'Eng. Rate%', width: 160 },
              { key: 'views', header: 'Median Views', width: 160 },
              { key: 'posts', header: 'Posts', width: 160 },
            ]}
            rows={Array.from({ length: 4 }, (_, i) => ({
              key: `creator-row-${i}`,
              cells: {
                creator: (
                  <span className="flex items-center gap-12">
                    <PhotoPlaceholder label="C" className="size-40 shrink-0 rounded-full" />
                    <span className="flex flex-col">
                      <span className="text-[14px] font-semibold text-text-primary">Creator Name</span>
                      <span className="text-[12px] text-text-grey">@username</span>
                    </span>
                  </span>
                ),
                followers: '200K',
                engagement: '2.23%',
                views: '120K',
                posts: '168',
              },
            }))}
          />
        </div>

        <h2 className={`${luna.titleSmall600} mt-16 text-text-primary`}>Discovery Filter Panel</h2>
        <DiscoveryFilterPanel
          onClear={() => setFilterValues({})}
          values={filterValues}
          onChange={(key, value) => setFilterValues((v) => ({ ...v, [key]: value }))}
          sections={[
            {
              kind: 'toggles',
              items: [
                { key: 'appUsers', icon: <IconGear className="size-full" />, label: 'Lehlah App Users' },
                { key: 'gifted', icon: <IconGear className="size-full" />, label: 'Gifted by you' },
              ],
            },
            {
              kind: 'range',
              key: 'instagramFollowers',
              title: 'Instagram Followers',
              minLabel: 'Min followers',
              maxLabel: 'Max followers',
            },
            {
              kind: 'checkboxes',
              key: 'niches',
              title: 'Content Niche',
              options: [
                { key: 'beauty', label: 'Beauty & Skincare' },
                { key: 'lifestyle', label: 'Lifestyle' },
                { key: 'vlogs', label: 'Daily Vlogs' },
                { key: 'fitness', label: 'Health & Fitness' },
                { key: 'food', label: 'Food & Recipes' },
                { key: 'travel', label: 'Travel' },
              ],
            },
            {
              kind: 'select-range',
              key: 'saleRange',
              title: 'Sale Range',
              fields: [
                { label: 'Total sales', placeholder: 'Select total sales range' },
                { label: 'Date range', placeholder: 'Select the date range' },
              ],
            },
          ]}
        />
      </section>
    </div>
  )
}
