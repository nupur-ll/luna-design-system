# Luna UI — design system rules for Claude Code

This repo is a React + TypeScript + Tailwind component library generated from
the **Luna Design System** (Figma file "Luna Design", `Et2Xt3lqFSU6SmLo4YDCmk`),
LehLah's B2B influencer-marketing SaaS design language. Read this file before
adding or editing any component or screen — it's the same rule set the Luna
Design Figma file itself is built against, so following it keeps code and
design in sync.

## What's in this repo so far

- `src/components/Button` — Primary/Secondary/Error/Ghost, sizes lg/md/sm.
- `src/components/InputField` — all 5 Figma types are covered, split across components by shape rather than crammed into one: `InputField` handles Default/Action-field/Prefix-field, `Dropdown` handles the search+option-list type, `OtpInput` handles the 6-cell OTP type. `Dropdown` takes a `type: 'multi-select' | 'single-select'` prop — multi-select shows checkboxes and accumulates chips (the original build); single-select (added after Figma's ".Dropdown-variations" sub-component turned out to have a Single-select type too, node 29087:48626) shows plain bold option rows with no checkboxes, and picking one replaces the value and closes the panel. `value`/`onChange` stay array-shaped either way. Of the 5 Figma states (Default/Focused/Filled/Error/Disabled), Focused is native `:focus` and Filled is "has a value" for Default/Prefix-field (confirmed pixel-identical to Default in Figma) — only `error`/`disabled` need real props there. Action-field's "Filled" is the one exception: it's a tag accumulator (type → click Add → becomes a removable chip below), not just "has text" — see the comment in `InputField.tsx` for the reasoning, since Figma's copy didn't spell that interaction out directly. Error messages carry Figma's WarningCircle icon (`src/icons/formIcons.tsx`), not just red text. Also has a `suffix?: ReactNode` prop, symmetric to the existing `prefix` — added for Discovery Filter Panel's select-styled fields, which bake a trailing caret into the Figma instance; same slot pattern as `prefix` rather than a separate "select field" component.
- `src/components/RadioButton`, `src/components/Checkbox` — single-element selection controls; the selected checkmark/dot is a small hand-drawn SVG, not a Figma-exported asset (see "Icon assets" below).
- `src/components/ToggleSwitch` — on/off switch, sm (44×24) / lg (64×32).
- `src/components/ToggleButtonGroup` — the segmented multi-option control (Figma calls this "Toggle Button" — distinct from `ToggleSwitch`, Figma's "Toggle Switch").
- `src/components/Chip`, `src/components/StatusChip` — Chip takes a `state: 'default' | 'unselected' | 'selected' | 'inactive' | 'disabled'` prop, one real look per Figma variant (re-verified live: Default has a border and Unselected doesn't, Inactive is a solid-border/tinted-bg/muted-text look and Disabled is dashed-border-plus-shadow — they're not collapsible the way an earlier pass here assumed).
- `src/components/MenuButton` — dropdown-trigger button with an option list; Figma's Focused/Selected variants are real `open` state and a `value` prop instead of style props. Each `MenuButtonOption` can also carry an `icon` and/or a small 24px `avatar` (added after Figma's `.menu_dropdown` sub-component showed an icon+logo-thumbnail row — e.g. for a brand/org switcher). The open panel is capped at `max-h-[184px] overflow-y-auto` (Figma's `showScroll` variant models a fixed ~5-row scrollable list; this repo's panel previously had no bound and would grow unbounded for long option lists) — the scrollbar itself is the browser's native one, not Figma's custom-colored thumb/track, since that styling isn't reachable with plain Tailwind utilities; flagged here as an approximation rather than silently matched.
- `src/components/Navbar` — the dark vertical nav rail (logo, icon+label items, bottom org/profile block with a logout popover). Nav destinations are a generic `items` prop (`{ key, label, icon, active, onClick }`), not fixed variants — Figma modeled each destination as its own component variant, which doesn't translate to a real prop API since different consumers will want different destinations. Defaults to the real LehLah "L." mark (`src/assets/lehlah-logo.png`) if no `logo` is supplied; the org avatar is left as a `ReactNode` slot (`orgAvatar`), same reasoning — this repo's own preview passes the uploaded Myntra brand image. Nav-item icons in this repo's preview are real Figma-sourced PNGs (`src/icons/lehlah/`, see "Icon assets" below), not hand-drawn placeholders — the one exception is `IconSignOut` in the logout row, still a placeholder (see "Icon assets"). The component's own `py-20` bottom padding was already correct; if a consumer sees the avatar flush against the bottom edge with no gap, check that the element `<Navbar>` is rendered inside has *enough height* — `h-full` on `<nav>` is a fixed height equal to its parent, and if the parent is shorter than the nav's natural content (logo block + items + avatar block), the content overflows past the box and visually "eats" the bottom padding even though the CSS value is unchanged. This repo's own preview hit exactly this (a 420px-tall demo wrapper was too short for 5 nav items; fixed by sizing the wrapper to fit, e.g. `h-[520px]`) — it was never a bug in Navbar.tsx itself.
- `src/components/PageHeader`, `src/components/PageFooter` — composed from this repo's own `<Button>` via an `actions`/`meta` slot rather than re-implementing Secondary/Primary button styling. `PageHeader` also has a `brandLogo` slot (44px bordered rounded avatar, before the icon+title block) for the org/brand logo. Figma's Header variant also has a credit-balance chip, a refresh-timestamp chip, and a tertiary button that read as one-off instance overrides rather than generic header needs — not built here, flagged as a gap instead of guessed at.
- `src/components/Pagination` — "1–15 of 300" plus prev/next; takes `from`/`to`/`total` as numbers rather than Figma's hardcoded string.
- `src/components/PrimaryTabs`, `src/components/SecondaryTabs` — the two tab-row styles (bordered chip vs. pill-in-a-track). Both are generic `items` + `activeKey`/`onChange`, not a fixed tab count like the Figma instances. `SecondaryTabItem` can also carry an optional `icon` (Figma's `.Secondary-Tab-chip` has an icon slot on both Active/Inactive states). Note: a `.Tab-buttons` sub-component elsewhere in the file (white-card/shadow active state, "Upload" placeholder text) was initially mistaken for a PrimaryTabs redesign during a review pass — it's actually `ToggleButtonGroup`'s own sub-component (matches `ToggleButtonGroup.tsx` exactly, same node-ID family as "Toggle Button"), and PrimaryTabs' purple-bordered-chip style is unchanged. Flagging the near-miss here in case it resurfaces.
- `src/icons/lehlah/` — real Figma-sourced Navbar nav-item icons (Discovery/Analytics/Gifting/FullFunnel/Settings/Admin/SocialListening), extracted as PNGs rather than hand-drawn. See "Icon assets" below for how and for the one icon this method couldn't get. (`navIcons.tsx`/`formIcons.tsx` are covered further down, after the newer components — their icons now mostly come from `src/icons/common` too.)
- `src/assets/lehlah-logo.png` — the real LehLah "L." brand mark, Navbar's default logo.
- `src/components/SearchBar` — Discovery and Generic search types in one component; internal `open` dropdown state seeded by input focus, closed on outside blur. Takes `recentSearches`/`results` as consumer-supplied arrays rather than Figma's fixed instance content.
- `src/components/ProgressIndicator` — Figma's stepper is a fixed 5-tab instance; this is a generic `steps: {key,label,icon?}[]` + `activeKey`, with per-step state (`completed`/`active`/`default`) derived from list position. Steps are `flex-1` rather than Figma's fixed 160px width so any step count fits. The default step icon color is `text-text-grey-dark` (not white) — Figma's own `.Progress Tab` sub-component uses two different gear glyphs, white on the Active/Completed purple circles and a muted tone on the Default grey one; see `IconGear`'s note in "Icon assets" below for why it's hand-drawn instead of the extracted (white) PNG.
- `src/components/FloatingElement` — `type: 'action' | 'toast'`. Action shows text + up to 2 buttons + an optional info row; Toast is an icon + text on a black pill.
- `src/components/Modal` + `ConfirmationDialog` — `Modal` is a generic backdrop/overlay shell (`open`, `onClose`, `closeOnBackdropClick`, Escape-key handling) that isn't itself a Figma component — Figma only shows the confirmation *content* card, not the overlay chrome around it, so the shell was added as a gap-fill rather than pulled from a node. `ConfirmationDialog` is that Figma content card (title/subtext/Cancel+Confirm buttons, `destructive` styling) meant to be passed as `Modal`'s children.
- `src/components/CreatorCard` — creator tile. No longer takes a `platform` prop — confirmed directly that the Instagram/YouTube platform-badge pair and the `handleLabel` row (both present in an earlier pass) were intentionally dropped from this card in Figma; the top-right control is now real `selected` state (Default: a "+" add button; Selected: a 36px green `CheckCircle` badge with no button chrome), and the stats-row background is `bg-overlay-grey-16` (was `bg-overlay-brand-4`).
- `src/components/ProfileCard` — the large single-creator profile view. `details`/`contacts`/`content` are consumer-supplied arrays rather than Figma's fixed field list; cover photo uses a new `overlay.black-80` token (see below) for the gradient over the header photo. The creator name clamps to 2 lines (`line-clamp-2`) rather than single-line `truncate`, per an edge case in the file. `ProfileCardDetail`/`ProfileCardContentRow` both take an optional `tooltip` — wraps the value in the new `src/components/Tooltip` on hover, for the specific fields Figma's edge cases show one on (2+ languages, a long city name, a long agency name), not every field.
- `src/components/Tooltip` — Luna's ".Tooltip" sub-component (a black pill, white 12px semibold text). Generic `text`/`children` wrapper, hover-triggered; surfaced by ProfileCard's edge cases rather than being its own documented page in the file, so the above-center placement is this repo's own choice, not pixel-matched from a screen.
- `src/components/CreatorListCard` — `variant: 'single-select' | 'multi-select'` switches between the two Figma instances (Add-to-list/Delete actions vs. a selection checkbox); `thumbnails` is a `ReactNode[]` slot capped at 6 by convention — fewer than 6 pads the remaining grid cells with empty placeholder boxes rather than collapsing the grid (per Figma's "For less than 6 creators" edge case). Single-select's row order is grid → "Created by" → name/count text (with the optional delete button inline beside it, independent of `onAddToList`) → the full-width Add-to-List button.
- `src/components/Table` — `columns`/`rows` generic API covers both Figma variants; `stickyFirstColumn` turns on the Horizontal-Scroll behavior (first column pinned via a separate non-scrolling `ColumnGroup`, rest wrapped in `overflow-x-auto`) for any column count. Verified via Playwright screenshot that the pinned column stays fixed while the rest scroll.
- `src/components/DiscoveryFilterPanel` — the biggest Figma→prop generalization in this repo. Figma bakes in ~18 fixed filter sections with real tenant content (brand names, city lists, price bands); every one of them is actually one of a handful of repeating shapes, so this takes a `sections: FilterSection[]` list (`toggles` / `checkboxes` / `range` / `select-range` / `select`) and the consumer supplies which sections exist and what's in them. Reuses `Checkbox`, `ToggleSwitch`, `InputField`, `Button` rather than reimplementing any of them. The `checkboxes` shape has its own "Show More" expand state built in. `select` (added once the "compact"/"compact-selected" variants surfaced it) is a single closed-field dropdown trigger — `Select X` placeholder, or a purple-tinted bold "Selected (N)" when filled; its open panel is a checkbox list, built on the same convention as the `checkboxes` shape since Figma's pulls only showed the closed states, not this one's own option-list panel.
- `src/icons/common/` — `IconMagnifyingGlass`, `IconXCircle`, `IconInfo` are real Figma-extracted PNGs (same base64-screenshot + pixel-reconstruction workflow as `src/icons/lehlah/`, see "Icon assets" below); `IconWarningCircleFilled`, `IconCheckCircle`, `IconInstagram`, `IconYoutube` are hand-drawn SVGs — each is a flat-color glyph that doesn't fit either extraction technique (see "Icon assets"), not a placeholder guess. Also holds 12 more real Figma-extracted PNGs added when `navIcons.tsx`/`formIcons.tsx`'s remaining placeholders were replaced (`ChartBar`, `Gift`, `FunnelSimple`, `UserSound`, `Gear`, `UserCircleGear`, `UserCircle`, `CaretLeft`, `CaretRight`, `CaretDown`, `WarningCircle`, `XMark`) — see `navIcons.tsx`/`formIcons.tsx`'s own header comments for which of these actually got wired in as the default vs. kept available-but-unused, and why.
- `src/icons/navIcons.tsx`, `src/icons/formIcons.tsx` — no longer all hand-drawn placeholders. Most icons now re-export a real extracted asset from `src/icons/common`. Four stay hand-drawn `currentColor` SVGs on purpose, not by oversight: `IconSignOut` (every on-canvas Figma instance sits inside a `hidden` frame — confirmed by checking all 41 instances in the file, not just retried a couple), `IconGift` (CreatorCard tints it `text-brand-primary` to match an adjacent badge), `IconCaretLeft`/`IconCaretRight` (Pagination's next button sits on a filled purple circle with `text-white`, and its prev button has a `hover:text-brand-primary` tint — a fixed-color PNG can't do either; this was caught by screenshotting Pagination after the swap and seeing a low-contrast grey chevron on the purple circle, not assumed safe from the build passing), and `IconGear` (ProgressIndicator's Default state needs a muted icon on its grey circle while Active/Completed need white on purple — the extracted PNG is the white variant, confirmed by opening the file, which is wrong for Default). The real assets for all four are still in `src/icons/common` for any future context that doesn't need dynamic color.
- `src/styles/typography.ts` — the full Luna type scale (Heading/Title/Body × size × weight) as ready-made Tailwind className strings.
- `tailwind.config.ts` — colors, spacing, radii, border widths, all pulled from the design system's tokens (see "Token source of truth" below).
- DM Sans is self-hosted via `@fontsource/dm-sans`, imported in `src/main.tsx` — don't remove this in favor of a system-font fallback; without it every component silently renders in the wrong typeface.

The LehLah icon set import (previously queued) is now done for every icon
`navIcons.tsx`/`formIcons.tsx` actually reference: all but four
(`IconSignOut`, `IconGift`, `IconCaretLeft`/`IconCaretRight`, `IconGear` —
see above for why) are real Figma-extracted assets, not hand-drawn
stand-ins. What's
*not* done, flagged rather than silently implied: this only covers the
icons this repo's own components currently use. It is not a general-purpose
Phosphor icon library import — a consumer wanting some other Phosphor icon
by name (e.g. for a `leftIcon`/`rightIcon` slot on Button) still needs to
supply their own component, same as before. Building a new component
follows the same process as the ones above: pull the component from Figma,
cross-check against this file, write it by hand rather than pasting the raw
Figma output verbatim.

## A real gotcha: the custom spacing/border-width scales are closed sets

`theme.spacing` and `theme.borderWidth` in `tailwind.config.ts` don't extend
Tailwind's defaults, they *replace* them (see the comment at the top of that
file for why). The failure mode when a component uses a pixel value that
isn't already a key in one of those scales is **silent** — Tailwind just
emits no CSS for that class, so the element collapses to its content size or
loses its border with no build error and no warning. This already happened
twice (a checkbox rendered at 12px instead of 18px; a border rendered at
0px instead of 2px) before being caught by literally comparing a screenshot
against Figma pixel-by-pixel.

So: after adding any component, actually look at it rendered (or screenshot
it) next to the Figma reference — don't trust that "the build succeeded"
means the styling applied. If a new pixel value is genuinely a layout
spacing/size value, add it as a named key to the scale in
`tailwind.config.ts` (keep the key equal to the pixel value). If it's a
one-off decorative dimension (like the radio button's inner dot), use an
arbitrary value (`size-[10px]`) instead of polluting the shared scale.

## Icon assets

Figma's `get_design_context` returns icons as remote asset URLs that expire
after 7 days — fine for a one-time look, wrong for anything committed to
this repo. Small structural marks (checkmarks, carets, the radio dot) are
hand-drawn inline SVGs here instead. Anything that's a real Phosphor icon
(button left/right icon slots, etc.) is left as a `leftIcon`/`rightIcon`
`ReactNode` prop for the consumer to fill in — once the icon library task is
done, those slots should default to the matching component from
`src/icons/`.

This sandbox can't `curl`/fetch `figma.com` URLs directly (the network
proxy blocks the domain), so `download_assets`' returned URLs are dead ends
here. The workaround used for `src/icons/lehlah/`: call `get_screenshot`
with `enableBase64Response: true` on the specific icon instance, which
embeds the PNG inline in the tool result instead of returning a URL, then
run it through a luminance→alpha pass (icon instances on the dark Navbar
render as an opaque white-glyph-on-dark-background PNG, not true
transparency — convert `alpha = luminance, rgb = white` to recover a
transparent icon that composites over any background). This got 7 of the 8
icons needed for Navbar. It could not get `IconSignOut`/Logout: two
different source instances were tried (one sits inside a Figma frame with
`hidden: true`, which renders as a blank 1×1; an alternate non-hidden
instance rendered as a genuine blank white 20×20 on two separate attempts,
for reasons that weren't determined) — `IconSignOut` is still the
hand-drawn placeholder in `navIcons.tsx`, flagged here rather than silently
left unexplained.

The same base64-screenshot workaround got `src/icons/common/`'s three
extracted icons (MagnifyingGlass, XCircle, Info), but needed a second
reconstruction technique: the Navbar icons are white-on-dark (luminance is
alpha, RGB is flat white), while these are colored-icon-on-white-background
screenshots, where luminance-to-alpha doesn't apply. For those, the script
finds the darkest/most-saturated pixel as the assumed true glyph color, then
derives per-pixel alpha as `(255 - observed) / (255 - fg)` averaged across
channels ("unpremultiply over white"). Icons that are a flat single
foreground color over a transparent/white background work with this; icons
that are a genuine multi-color composite (the orange-circle-plus-white-"!"
warning icon, for instance) don't, and were hand-drawn instead rather than
forcing an extraction that would come out wrong.

## Core rules (non-negotiable)

- **Semantic tokens only.** Never a raw hex value in a component or layout — always a Tailwind color class backed by `tailwind.config.ts` (e.g. `bg-brand-primary`, not `bg-[#714AB5]`).
- **Spacing scale only.** `theme.spacing` in `tailwind.config.ts` intentionally *replaces* Tailwind's default scale — only the approved pixel values (2,4,8,12,14,16,20,24,32,36,44,...) exist as named utilities, and the class name always equals the pixel value (`p-16` = 16px). If a design calls for an off-scale value, that's a signal to double-check the Figma source, not to reach for an arbitrary value.
- **Reuse existing components.** Before writing a new one, check `src/components/` — compose Button/InputField/etc. rather than re-implementing.
- **Every interactive component needs its states.** Default, hover, focused, disabled, and error, even if only default is wired up in a first pass — Figma hover/focus are CSS pseudo-classes in code (`hover:`, `focus:`), not extra props; only states that need runtime control (`error`, `disabled`) should be props.
- **Labels above inputs, always.** Never substitute placeholder text for a label.
- **No gradients, ever.**
- **Icons:** Phosphor Icons, one style per screen — never mix outline and filled icons together.
- **Max 2 CTAs per action row.** Destructive actions use the Error variant, never Primary.
- **Left-aligned, dense layouts** for list/data screens — this is a B2B tool, not a consumer app; don't add extra whitespace.
- **Flag gaps instead of improvising.** If a component, token, or pattern isn't in this file or in the Figma file, say so and ask rather than inventing one.

## Token source of truth

`tailwind.config.ts` and `src/styles/typography.ts` were generated from the
Luna Design Figma file's own variables and text styles (colors, spacing,
type scale), cross-checked live per component as each one was built. If a
value here ever looks wrong, the Figma file is the source of truth, not this
file — re-pull the specific variable/style rather than guessing.

A few known documentation gaps carried over from the source design docs
(flagged rather than silently resolved):
- `surface-container-color-disabled-grey` has two different values in the original doc (#E2E2E2 vs #A6A6A6) depending on context — check the specific component's live Figma value if precision matters.
- `typography-color-primary` is listed as both #000000 and #121212 in different places in the source docs; this repo uses #121212 (`black` / `text-primary`), matching what was confirmed live on the Button and Input Field components.

Two tokens were added this batch, both exact matches to a live Figma value
rather than approximations: `spacing['140']` (140px, Confirmation Dialog's
button width) and `colors.overlay['black-80']` (rgba(0,0,0,0.80), ProfileCard's
photo gradient overlay — Figma specifies 80% black exactly, so this was added
as its own token instead of reusing the existing `overlay.black-70`).

## Adding a new component from Figma

1. Get the component's Figma link (must include `?node-id=`).
2. Pull it with the Figma MCP tools (`get_design_context`, `get_variable_defs`).
3. Treat the returned code as reference only — rewrite it as a clean, idiomatic React + Tailwind component matching this repo's conventions (see `Button.tsx` / `InputField.tsx` for the pattern: typed props, Tailwind classes built only from `tailwind.config.ts` tokens, hover/focus as CSS not props).
4. Add a barrel export in the component's `index.ts`.
5. Wire up a Code Connect template (`ComponentName.figma.ts`) so the Figma file links back to this file — see `figma-code-connect` skill conventions if regenerating these. **Currently blocked, not skipped**: every Code Connect MCP tool (`get_code_connect_suggestions`, `list_file_components_for_code_connect`, and by extension the others) rejects with "You need a Dev or Full seat on an Organization or Enterprise plan to use Code Connect" — an account/plan-level gate on Figma's side, confirmed by calling the tools directly, not assumed. None of this repo's components have Code Connect mappings yet. Retry once the Figma workspace has that seat/plan.
6. Update this file's "What's in this repo so far" section.
