# AGENT.md

## Project Overview
- Name: `ayurvedic-landing-page`
- Stack: React 18 + Vite 5, plain CSS (no CSS framework)
- Scope: Single-page landing site for Ayurvedic products
- Runtime: Frontend only (no backend/API in this repo)

## Repository Map
- `src/main.jsx`: App bootstrap and global stylesheet import.
- `src/App.jsx`: Main page structure, content sections, and query form state/submit behavior.
- `src/styles.css`: All styling, responsive behavior, and animations.
- `src/assets/`: Product images used by the landing page.
- `index.html`: Vite entry HTML shell.
- `vite.config.js`: Dev server configuration (`host: true`, port `5173`).

## Setup And Commands
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview build: `npm run preview`

## Implementation Guidelines
- Keep the app as a static frontend unless explicitly asked to add backend integrations.
- Prefer small, localized edits in `App.jsx` and `styles.css` over structural rewrites.
- Reuse existing CSS variables in `:root` before introducing new color tokens.
- Preserve accessibility basics:
  - Keep meaningful `alt` text on images.
  - Maintain label/input associations in forms.
  - Preserve visible focus states for interactive elements.
- Preserve responsive behavior at and below the current `860px` breakpoint unless intentionally changing layout.
- Respect reduced-motion handling in `@media (prefers-reduced-motion: reduce)`.

## Content And Data Notes
- Contact and count values are constants in `src/App.jsx`:
  - `CONTACT_NUMBER`
  - `MEDICINES_SOLD`
- Product cards are driven by the `PRODUCTS` array in `src/App.jsx`.
- Query form is currently client-side only and shows a local success message; it does not send network requests.

## Change Validation Checklist
- Run `npm run build` after non-trivial changes.
- If changing layout/styling, verify in dev server at:
  - Desktop width (> `860px`)
  - Mobile width (<= `860px`)
- Confirm no console errors in the browser during normal page load.
- Confirm form interaction still works:
  - Fields update on input.
  - Submit clears fields and shows success message.

## Non-Goals Unless Requested
- Adding routing, global state libraries, or server components.
- Introducing heavy UI frameworks or CSS-in-JS.
- Refactoring to TypeScript.
