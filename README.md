# Lance Portfolio

Static site, no build step. Works on GitHub Pages as is.
Design rules and the reasoning behind them are in `DESIGN.md`.

## Folders & Files

- [index.html](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/index.html) the main page
- [css/style.css](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/css/style.css) all styles (tokens at the top)
- [js/main.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/js/main.js) starts everything: vouches, availability, menu, motion
- [js/vouches.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/js/vouches.js) builds the vouch list from `data/vouches.js`
- [js/availability.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/js/availability.js) live New York clock, status, and weekly availability
- [js/nav.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/js/nav.js) mobile menu (hamburger to X, full-screen overlay, focus trap, Escape to close)
- [js/motion.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/js/motion.js) GSAP, ScrollTrigger and Lenis smooth scroll
- [data/vouches.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/data/vouches.js) the vouches
- [data/schedule.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/data/schedule.js) availability in New York (Eastern Time)
- [assets/renders/](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/assets/renders/) the R6 renders (hero, wave, point, jump, sit, headshot, bricks)
- [assets/textures/baseplate.png](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/assets/textures/baseplate.png) classic Roblox stud tile
- [assets/icons/](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/assets/icons/) favicon, apple touch icon, arrow icons
- [assets/og.png](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/assets/og.png) social link preview image (1200 x 630)
- [assets/vouches/](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/assets/vouches/) headshots of the people who vouched
- [server.ps1](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/server.ps1) local PowerShell HTTP server (supports WebP, JS modules, CSS)

## Preview Locally

Opening `index.html` directly from the filesystem won't load ES modules due to CORS policies. You can run the included PowerShell server:

```powershell
.\server.ps1
```

Or specify a custom port:

```powershell
.\server.ps1 -Port 8080
```

Then open `http://localhost:8080` in your web browser.

## Add or Edit Vouches

1. Save the reviewer's Roblox headshot as a PNG in `assets/vouches/` (e.g. `assets/vouches/name.png`).
2. Open [data/vouches.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/data/vouches.js), copy one of the blocks and fill in name, username, robloxId, image, and quote.

## Change Hours & Availability

Edit `offBlocks` in [data/schedule.js](file:///c:/Users/binon/Downloads/new%20lance%20port%20discord%202.0/data/schedule.js).
Hours are 24-hour clock, days are 0 = Sunday to 6 = Saturday. The clock uses `America/New_York` and automatically follows daylight saving time. An empty `offBlocks` array means available every day.

## Publish to GitHub Pages

1. Push this directory to your GitHub repository (e.g. `lance/lance.github.io`).
2. In GitHub Repository Settings > Pages, set Branch to `main` and Folder to `/ (root)`.
