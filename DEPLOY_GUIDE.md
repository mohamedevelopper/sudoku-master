# Deployment Guide — Sudoku Master

This guide covers deploying your Sudoku Master site to popular hosting platforms. The site is a static SPA (single-page app) — there is no backend, no database, no server-side code. Just static files.

## Pre-deployment checklist

Before deploying, replace these placeholders across the codebase:

### 1. Google Analytics 4

**File:** `index.html`
**Find:** `G-XXXXXXXXXX` (appears twice — once in the script `src`, once in `gtag('config', ...)`)
**Replace with:** Your GA4 Measurement ID, e.g. `G-AB12CD34EF`

### 2. Google AdSense

**File:** `index.html`
**Find:** `ca-pub-XXXXXXXXXXXXXXXX`
**Replace with:** Your AdSense Publisher ID, e.g. `ca-pub-1234567890123456`

**File:** `public/ads.txt`
**Find:** `pub-XXXXXXXXXXXXXXXX`
**Replace with:** Same Publisher ID (without the `ca-` prefix)

**File:** `src/components/AdSlot.tsx`
**Find:** `ca-pub-XXXXXXXXXXXXXXXX`
**Replace with:** Same Publisher ID

**Ad slot IDs:** Each `<AdSlot slot="1234567890" />` in the page files (`PlayPage.tsx`, `DailyPage.tsx`, `LeaderboardPage.tsx`, `HowToPlayPage.tsx`, `PrintablePage.tsx`) needs a real ad-unit slot ID from your AdSense dashboard.

### 3. Domain

**Files:** `index.html`, `public/sitemap.xml`, `public/robots.txt`
**Find:** `https://sudokumaster.vip`
**Replace with:** Your actual domain if different.

### 4. Favicon PNGs

`public/favicon/` contains only `icon.svg`. To support all browsers and platforms, generate:
- `favicon.ico` (16, 32, 48 px multi-resolution)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `web-app-manifest-192x192.png`
- `web-app-manifest-512x512.png`

Easiest way: upload `icon.svg` to [realfavicongenerator.net](https://realfavicongenerator.net) and download the PNG bundle.

### 5. Build

```bash
npm install
npm run build
```

Output goes to `dist/`. This folder is what you deploy.

---

## Option 1: Netlify (recommended)

The fastest free option for SPAs.

1. Push your code to GitHub.
2. Sign in at [netlify.com](https://www.netlify.com), click **Add new site → Import from Git**.
3. Pick your repo. Netlify auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**.
5. The `public/_redirects` file already handles SPA routing — no extra config needed.

**Custom domain:** Site settings → Domain management → Add domain. Netlify provides free SSL via Let's Encrypt automatically.

---

## Option 2: Vercel

1. Push to GitHub.
2. Sign in at [vercel.com](https://vercel.com), click **Add New → Project**.
3. Import your repo. Vercel auto-detects Vite. Defaults are correct.
4. Click **Deploy**.

Vercel handles SPA routing automatically for Vite projects. SSL is free.

---

## Option 3: Cloudflare Pages

1. Push to GitHub.
2. Sign in at [pages.cloudflare.com](https://pages.cloudflare.com), click **Create application → Connect to Git**.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy.

Add a `_redirects` rule (already in `public/_redirects`) for SPA fallback.

**Bonus:** Cloudflare's CDN is exceptional for global page-load speeds.

---

## Option 4: GitHub Pages

1. In your repo, go to **Settings → Pages**, set source to **GitHub Actions**.
2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Important:** If deploying to a subpath like `username.github.io/sudoku`, set the `base` in `vite.config.ts`:
```ts
base: '/sudoku/',
```

For SPA routing on GitHub Pages, also create `public/404.html` with the same content as `index.html` — GitHub Pages serves it on missing routes.

---

## Option 5: Traditional Apache

1. Upload `dist/*` to your web root.
2. The included `public/.htaccess` (which goes to `dist/.htaccess` after build) handles SPA fallback, caching, and security headers.

Make sure:
- `mod_rewrite` is enabled.
- `AllowOverride All` is set in your VirtualHost or directory config.

---

## Option 6: Nginx

Upload `dist/*` to your web root, then configure your `server` block:

```nginx
server {
    listen 80;
    server_name sudokumaster.vip www.sudokumaster.vip;
    root /var/www/sudokumaster.vip/dist;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|woff2?|png|jpg|jpeg|gif|webp|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Don't cache index.html
    location = /index.html {
        expires off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

Get a free SSL cert with Certbot:
```bash
sudo certbot --nginx -d sudokumaster.vip -d www.sudokumaster.vip
```

---

## Post-deployment checklist

After your first successful deploy:

1. **Verify ads.txt:** Visit `https://yourdomain.com/ads.txt` — should display your AdSense line.
2. **Verify sitemap:** Visit `https://yourdomain.com/sitemap.xml`.
3. **Submit to Google Search Console:**
   - Add property at [search.google.com/search-console](https://search.google.com/search-console)
   - Submit sitemap URL
   - Request indexing for the home page
4. **AdSense site approval:**
   - In your AdSense dashboard → Sites → Add site → enter your domain
   - Wait for approval (24h – 2 weeks). Ads won't show until approved.
5. **Test on mobile:** Use Chrome DevTools or a real device to confirm responsive behavior.
6. **Lighthouse audit:** In Chrome DevTools, run Lighthouse. Aim for 90+ on all four categories.
7. **PWA install:** Open the site on mobile Chrome/Edge → "Add to Home Screen" should work.

---

## Troubleshooting

**Ads not showing?**
- AdSense approval is required first (separate from publisher ID).
- Browser ad blockers will hide them — test in incognito with extensions off.
- Check the browser console for AdSense errors.

**404 on direct route load (e.g. /daily)?**
- SPA fallback isn't configured. Make sure `_redirects`, `.htaccess`, or your Nginx `try_files` directive is in place.

**Analytics not tracking?**
- Confirm GA4 ID is correct in `index.html`.
- Disable ad blockers when testing.
- New properties can take 24–48 hours to show first data.

**Build fails?**
- Run `npm install` again.
- Delete `node_modules/` and `package-lock.json`, then `npm install`.
- Make sure Node.js version is 18+ (`node -v`).

---

Need help? Email `sudokumaster.vip@gmail.com`.
