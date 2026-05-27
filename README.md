# Sudoku Master 🎮

A beautiful, fast, ad-supported online Sudoku game with 5 grid sizes, 6 difficulty levels, daily puzzles, printable PDFs, and a complete How-to-Play guide.

**Live site:** [sudokumaster.vip](https://sudokumaster.vip)

## Features

- 🎯 **5 grid sizes**: 4×4, 6×6, 9×9, 12×12, 16×16
- 🔥 **6 difficulty levels**: Easy, Medium, Hard, Expert, Master, Extreme
- 🎨 **7 visual themes**: Classic, Cosmic Dark, Retro Terminal, Warm Sand, Sakura, Ocean, Forest
- 📅 **Daily puzzle** with streak tracking (same for all players worldwide)
- 🏆 **Personal leaderboard** with best times by grid + difficulty
- 🖨️ **Printable PDFs** — choose grid size, difficulty, puzzles per page
- 📚 **How to Play guide** with techniques from Naked Single to Swordfish
- 🔊 **Sound effects** (optional, mutable)
- 💡 **Smart hints** (3 per game) and **mistakes counter**
- ↩️ **Undo**, **Notes mode** (pencil marks), candidate auto-elimination
- ⌨️ **Full keyboard support** (arrows, 1–9, N, H, Ctrl+Z, Backspace)
- 📱 **PWA installable** — works offline once loaded
- 🔒 **No login required** — all data stays in your browser
- 💰 **Google AdSense + Analytics 4** integrated and ready
- 🌐 **SEO optimized** — sitemap, robots.txt, JSON-LD, Open Graph

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** for fast builds
- **Tailwind CSS 4** via `@tailwindcss/vite`
- **React Router 7** for client-side routing
- **Motion (Framer Motion)** for animations
- **Lucide React** for icons
- **jsPDF** for client-side PDF generation
- **Web Audio API** for sound effects (no external assets)

## Getting started

```bash
# Install dependencies
npm install

# Run dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check
npm run lint
```

## Configuration

Before deploying, replace these placeholders:

### 1. Google Analytics 4

In `index.html`, replace `G-XXXXXXXXXX` (appears twice) with your GA4 Measurement ID.

### 2. Google AdSense

- In `index.html`, replace `ca-pub-XXXXXXXXXXXXXXXX` with your AdSense Publisher ID.
- In `public/ads.txt`, replace the same `pub-XXXXXXXXXXXXXXXX` value.
- In `src/components/AdSlot.tsx`, the same client ID is referenced (auto-uses the index.html value via global script, but you can hard-code if needed).
- In each page's `<AdSlot slot="..." />`, replace slot IDs with your real ad-unit slot IDs from AdSense.

### 3. Domain / canonical URLs

In `index.html`, `public/sitemap.xml`, and `public/robots.txt`, replace `https://sudokumaster.vip` with your actual domain if different.

## Project structure

```
/
├── index.html                  # SEO + AdSense + GA + JSON-LD
├── public/
│   ├── manifest.json           # PWA
│   ├── robots.txt              # SEO
│   ├── sitemap.xml             # SEO
│   ├── ads.txt                 # AdSense verification
│   ├── _redirects              # Netlify SPA fallback
│   ├── .htaccess               # Apache SPA fallback
│   └── favicon/                # Icons (icon.svg + add your PNG variants)
├── src/
│   ├── main.tsx                # React entrypoint
│   ├── App.tsx                 # Routes
│   ├── types.ts                # Shared TypeScript types
│   ├── index.css               # Tailwind + custom CSS
│   ├── components/
│   │   ├── Layout.tsx          # Header, footer, cookie banner
│   │   ├── Board.tsx           # Sudoku grid (all sizes)
│   │   ├── Keypad.tsx          # Number input pad
│   │   ├── GameControls.tsx    # Timer, difficulty, grid-size pickers
│   │   ├── StatsModal.tsx      # Stats dialog
│   │   └── AdSlot.tsx          # AdSense unit wrapper
│   ├── pages/
│   │   ├── PlayPage.tsx        # Main game
│   │   ├── DailyPage.tsx       # Daily puzzle + streak
│   │   ├── LeaderboardPage.tsx # Best times
│   │   ├── PrintablePage.tsx   # Print + PDF export
│   │   ├── HowToPlayPage.tsx   # Rules + techniques
│   │   ├── PrivacyPage.tsx     # Privacy policy
│   │   ├── TermsPage.tsx       # Terms of service
│   │   ├── CookiesPage.tsx     # Cookie policy
│   │   ├── AboutPage.tsx       # About us
│   │   ├── ContactPage.tsx     # Contact form
│   │   └── NotFoundPage.tsx    # 404
│   └── utils/
│       ├── sudoku.ts           # Generator + solver for all grid sizes
│       ├── themes.ts           # 7 theme color palettes
│       ├── analytics.ts        # GA4 wrapper
│       ├── sounds.ts           # Web Audio SFX
│       ├── storage.ts          # localStorage wrapper
│       └── useSudokuGame.ts    # Main game state hook
```

## Routes

- `/` — Play (main game)
- `/easy-sudoku`, `/medium-sudoku`, `/hard-sudoku`, `/expert-sudoku` — Difficulty-locked SEO landing pages
- `/?size=4|6|9|12|16` — Direct grid-size links
- `/daily` — Daily puzzle
- `/leaderboard` — Personal best times
- `/printable` — PDF generation
- `/how-to-play` — Guide
- `/privacy-policy`, `/terms-of-service`, `/cookies` — Legal
- `/about`, `/contact` — Info

## Deployment

See **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)** for full deployment instructions (Netlify, Vercel, Cloudflare Pages, GitHub Pages, traditional Apache/Nginx).

## License

© 2026 Sudoku Master. All rights reserved.
