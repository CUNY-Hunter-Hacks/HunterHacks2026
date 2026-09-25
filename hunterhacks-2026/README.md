# Hunter Hacks 2026 — Battle of the Boroughs

April 25–26, 2026 · live at [hunterhacks.com](https://hunterhacks.com)

[← Back to the HunterHacks overview](../README.md)

## Overview
This directory contains the code for the HunterHacks 2026 website. This year's theme, **Battle of the Boroughs**, is a New York City-focused theme that highlights the uniqueness of each of the city's five boroughs and the problems that can be solved within them. Built with React 19 and Vite 7.

## Running locally
From inside the `hunterhacks-2026` directory:
```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Architecture
Unlike the 2025 site, 2026 doesn't have a `src/components` folder — almost the entire site lives in a single `App` component:
- `src/App.jsx` — all page markup, state, and logic
- `src/App.css` — all page styling
- `src/index.css` — global resets, font-face declarations, and CSS custom properties
- `src/main.jsx` — mounts `App` into `#root`

The page is one long scroll broken into sections identified by id, which the navbar links jump to:
- `#hero` — title, countdown, apply button
- `#about` — the borough map ("Boroughs" section)
- `#schedule` — event schedule
- `#faq` — FAQ accordion
- `#sponsors` — sponsor metrocard fan
- footer (no id; last section on the page)

A `scroll` listener in `App.jsx` toggles the navbar between `.dark-bg` (light text, used over the hero image) and `.light-bg` (dark text, used once you've scrolled past the hero) based on scroll position relative to the hero section's height.

## Sections and what powers them

**Countdown** — `App.jsx` computes a live countdown to a hard-coded `targetDate` constant (`new Date("2026-04-25T18:00:00")`) with a `setInterval` that updates every second. Once the target date has passed, all values fall to `0`.

**Borough intro typewriter** — the paragraph above the borough map types itself out character-by-character. It's gated behind an `IntersectionObserver` watching the boroughs section (`boroughsSectionRef`); once the section scrolls into view (10% threshold), `hasStartedTyping` flips to `true` and a second effect reveals `fullText` one character at a time via `setInterval`.

**Borough map hover** — the map is five layered PNGs (`/BX.png`, `/MN.png`, `/SI.png`, `/BK.png`, `/QN.png`, one per borough), stacked with CSS `z-index`. Because the layers overlap in their rectangular bounding boxes, hover detection isn't just "which image is under the cursor": on image load, each borough's PNG is drawn to an off-screen `<canvas>` so `handleMouseMove` can read the pixel alpha at the cursor position and only treat the borough as hovered where the artwork itself is opaque. The `boroughInfo` object holds each borough's display name, track subtitle, and bird-mascot image, which populate the little popup card shown on hover.

**Schedule** — hard-coded JSX in `App.jsx` (`#schedule` section), two `.schedule-day` columns for Saturday and Sunday with a mouse-tracked CSS spotlight effect (`handleSpotlight`).

**FAQ** — driven by the `faqs` array in `App.jsx` (question/answer pairs). Clicking a question toggles `openFaqIndex` and reveals its answer.

**Sponsor metrocard fan** — a fanned stack of sponsor "metrocard" images (`public/Hunter_Card.png`, `Bloomberg_Card.png`, `BASTA_Card.png`, `Career_Center_Card.png`, `Metrocard_default.png`) laid out and animated with CSS transforms in `.card-fan`/`.sponsor-card`.

**Footer** — social links (Instagram, LinkedIn, Discord) and credits.

## How to update common things

| What | File | What to edit |
|---|---|---|
| Event dates / countdown target | `src/App.jsx` | `targetDate` constant and the `APRIL 25-26, 2026` subtitle text in the hero section |
| Apply link | `src/App.jsx` | `href` on the `.apply-btn` link in the hero section |
| Schedule | `src/App.jsx` | the two `.schedule-day` blocks inside the `#schedule` section |
| FAQ questions/answers | `src/App.jsx` | the `faqs` array |
| Borough track text | `src/App.jsx` | the `boroughInfo` object (`name`, `subtitle`, `bird`) and the `fullText` intro string |
| Sponsor cards | `src/App.jsx` + `public/` | add/replace an `<img className="sponsor-card card-N">` in `.card-fan` and its image in `public/`; card position/rotation is set per `.card-N` class in `App.css` |
| Prospectus PDF | `public/prospectus.pdf` | replace the file (the sponsors section links to `/prospectus.pdf`) |

## Assets & fonts
All static assets live in `public/` and are referenced with root-relative paths (e.g. `/BX.png`):
- Borough map layers: `A.png`, `B.png`, `BX.png`, `MN.png`, `SI.png`, `BK.png`, `QN.png`, `Boros.png`, `boro map.gif`
- Section title graphics: `Boros.png`, `Schedule.png`, `FAQ.png`, `Sponsors.png`
- Bird mascots: `yellow_bird.PNG`, `white_bird.PNG`, `half_half_bird.PNG`, `pink_bird.PNG`, `purple_bird.PNG`, `birds_footer.png`
- Sponsor cards: `Hunter_Card.png`, `Bloomberg_Card.png`, `BASTA_Card.png`, `BASTA_Card_new.png`, `Career_Center_Card.png`, `Metrocard_default.png`
- Background/texture: `nyc_pixel.png` (hero background, ~4 MB), `tv_overlay.jpg` (map scanline overlay)
- Documents: `prospectus.pdf`, sponsor/interest form PDFs
- `atlanta-college/` — the "Atlanta College" custom font (`Atlanta-College.ttf`), used per the license in `1001fonts-atlanta-college-eula.txt` — check that file before redistributing or modifying it
- `roadway/` — the "Roadway" custom font (`Roadway.ttf`, plus its readme), used as the site's primary font via `@font-face` in `src/index.css`

Google Fonts (Michroma, Roboto) are loaded via an `@import` at the top of `src/index.css`.

## Deployment
TODO: the 2025 site documents deploying via Vercel, but nothing in this repository confirms how the 2026 site is deployed to hunterhacks.com. Confirm and document the actual deployment process here.

## Credits
- Kelly Lin — Lead Designer & Lead Developer
- Ynalois Pangilinan — Developer
- Natalie Gallo — Developer
- Emily Klapper — Developer
- Kyle Bautista — Hosting
