# verkan portfolio

Static site, no build step. Works on GitHub Pages as is (repo `verkan-web/verkan`).
Design rules and the reasoning behind them are in `DESIGN.md`.

## Folders

- `index.html` the page
- `css/style.css` all styles (tokens at the top)
- `js/main.js` starts everything, in this order: vouches, availability, menu, motion
- `js/vouches.js` builds the vouch list from `data/vouches.js`
- `js/availability.js` live Toronto clock, status, the week of bricks, the Tuesday gap in the visitor's time
- `js/nav.js` mobile menu (hamburger to X, full-screen overlay, focus trap, Escape to close)
- `js/motion.js` GSAP, ScrollTrigger and Lenis (loaded from jsDelivr, pinned versions). Skipped entirely when the visitor prefers reduced motion.
- `data/vouches.js` the vouches
- `data/schedule.js` your hours (Toronto time)
- `assets/renders/` the R6 renders, WebP plus PNG fallback: hero, wave, point, jump, sit, headshot, brick-red, brick-amber
- `assets/textures/baseplate.png` classic Roblox stud tile used in the UI card
- `assets/icons/` favicon, apple touch icon, two Phosphor arrow icons
- `assets/og.png` the link preview image (1200 x 630)
- `assets/vouches/` headshots of the people who vouched
- `assets/avatar/` old R15 files, no longer used by the page
- `_source/` Blender files, textures and the archived first version (`_source/v1/`). Not needed on the live site.

## Add a vouch

1. Save their Roblox headshot as a PNG in `assets/vouches/`.
2. Open `data/vouches.js`, copy one of the blocks and fill in name, username, Roblox user ID, image path and quote.

## Change your hours

Edit `offBlocks` in `data/schedule.js`. Hours are 24-hour Toronto time, days are 0 = Sunday to 6 = Saturday.
Any day with an off block gets the half amber brick automatically.

## Re-render the avatar

Open `_source/verkan-studio.blend` in Blender. Collection `RENDER_STUDIO` holds the camera, the lights,
the shadow catcher and the classic 2x4 brick; `R6RIG` holds the posable avatar. Renders are Cycles on the GPU
(OptiX), 96 samples, transparent film, AgX Punchy. The brick sprites use the Standard view transform so the
red and amber stay true. Export WebP with the Standard view transform too, or Blender applies AgX twice and the
image comes out darker.

## Preview locally

Opening `index.html` straight from the folder won't run the module scripts. Run a tiny server in this folder:

```
python -m http.server 8000
```

then open http://localhost:8000

## Publish

Push everything except `_source/` to `verkan-web/verkan` (the `.gitignore` already leaves it out).
GitHub Pages serves `index.html` from the root.
