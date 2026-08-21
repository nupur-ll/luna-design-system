# Luna UI

React + TypeScript + Tailwind component library, generated from the Luna
Design Figma file for LehLah. See `CLAUDE.md` for the design-system rules
this repo follows — read that first if you're working on it with Claude Code.

## Getting started

```bash
npm install
npm run dev       # starts a local preview at http://localhost:5173
npm run build     # type-checks and builds a production bundle
```

## What's here

- `src/components/` — one folder per component (Button, InputField, ...).
- `src/tokens/` — the Luna Figma variables (Primitives → Semantics →
  Components collections), each layer tracing to the one below it.
  `tailwind.config.ts` is generated from these rather than hand-copied values.
- `src/styles/typography.ts` — the Luna type scale as Tailwind className strings.
- `tailwind.config.ts` — the Luna color/spacing/radius/border tokens as a Tailwind theme.
- `src/App.tsx` — a running preview of every component built so far.

## Status

Built so far: **Button**, **InputField** (+ **Dropdown**, **OtpInput**),
**RadioButton**, **Checkbox**, **ToggleSwitch**, **ToggleButtonGroup**,
**Chip**, **StatusChip**, **MenuButton**, **Navbar**, **PageHeader**,
**PageFooter**, **Pagination**, **PrimaryTabs**, **SecondaryTabs**,
**SearchBar**, **ProgressIndicator**, **FloatingElement**, **Modal** (+
**ConfirmationDialog**), **CreatorCard**, **ProfileCard**,
**CreatorListCard**, **Table**, **DiscoveryFilterPanel**. See `CLAUDE.md`
for what's an exact Figma match vs. a deliberate simplification/gap in each
one. Ask for the next batch, or hand this repo to Claude Code and describe
what you want built next; it already knows the rules from `CLAUDE.md`.

## Publishing to GitHub

```bash
git add -A
git commit -m "Initial Luna UI scaffold: Button, InputField, OtpInput"
git remote add origin <your-new-empty-github-repo-url>
git branch -M main
git push -u origin main
```
