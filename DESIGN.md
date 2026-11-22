# Design System: Lance

## 0. Design read and plan

**Reading this as:** a solo portfolio for Roblox game owners and studio leads hiring a community and project manager to scale their community and keep the team on track, with a campaign-poster language (Nike product page, the avatar is the product shot), leaning toward native CSS, GSAP ScrollTrigger and Lenis, no framework, no build step.

**Dials**

| Dial | Value | Why |
|---|---|---|
| DESIGN_VARIANCE | 8 | Poster hero with type behind the figure, offset number row, dense bento, pinned split. Collapses to one column under 768px. |
| MOTION_INTENSITY | 7 | Scroll-told page: scrub word reveal, pin, parallax depth in the hero. Every effect has a job and all of it switches off under reduced motion. |
| VISUAL_DENSITY | 3 | Gallery-airy. Huge section gaps, few elements per screen, the renders carry the visual weight. |

**gpt-taste design plan**

```
>>> seed = len(user_prompt) % 7   # 108 chars -> 3
>>> hero, components, gsap = pick(seed)   # then locked to HANDOFF.md where it already decides
hero: "Artistic Asymmetry" (copy bottom left, figure overlapping giant type)
fonts: Geist + Geist Mono for UI, Big Shoulders Display 900 for lockups
components: inline typography image, gapless bento, pinned split
gsap: scrubbing text reveal, scroll pinning (+ hero depth parallax)
```

- AIDA: floating glass pill nav, Attention (red hero), Interest (intro statement and numbers, then the bento), Desire (pinned vouches, live availability), Action (red closing CTA and footer).
- Hero math: the headline sits in a `max-width: 15ch` block at `clamp(2rem, 3.6vw, 3.4rem)`, which holds 2 lines at 1440 and at 1024. No stamps, badges, tags or stats in the hero.
- Bento math: 4 columns x 3 rows = 12 units. Community management 2x2 (4) + Community growth 2x1 (2) + Social media 1x1 (1) + Team coordination 1x1 (1) + QA and player feedback 4x1 (4) = 12. Tablet: 2 columns, Community management 2x2, Community growth 2x1, Social media 1x1, Team coordination 1x1, QA and player feedback 2x1 = 10 units over 5 rows of 2, no holes. `grid-auto-flow: dense` on every breakpoint.
- Label sweep: no "Section 01" style labels, no scroll cues, no version stamps. One small kicker in the whole page (the clock zone label), which is real information.
- Button check: white pill with ink text on red; ink pill with white text on white. Every label fits one line at 320px and up.

## 1. Visual Theme & Atmosphere

A loud, single-minded campaign page. The top and bottom of the page are a deep cola red field with a soft radial light and fine grain, like a studio sweep. Enormous condensed white type ("LANCE", "LET'S BUILD IT.") sits behind the R6 avatar, who stands in front and overlaps the letters, so the character is the product shot. Between the red bookends the page goes cool white with dark cola brown ink, and stays there: one theme, no surprise dark bands. The figure always belongs to the background composition, never to a boxed card. Motion feels heavy and physical: things rise like a part being placed in Studio, never bounce.

- Density: Art Gallery Airy (3)
- Variance: Offset Asymmetric to Artsy (8)
- Motion: Cinematic Choreography, restrained (7)

## 2. Color Palette & Roles

- **Cola Red** (#B5121B): Hero and closing CTA field. The brand. Never used for body text on white.
- **Cola Red Deep** (#7E0A10): Edge vignette of the red field, pressed state of red surfaces.
- **Cola Red Light** (#D7232A): Radial light behind the avatar in the red field.
- **Cola Ink** (#1E0B07): All text on light surfaces, the dark AI card, primary pill on white.
- **Muted Ink** (#6E5B55): Secondary text on Cool White. 5.9:1 on #F2F3F3.
- **Cool White** (#F2F3F3): Page canvas between the bookends, text on red (6.2:1 on Cola Red).
- **Paper** (#FBFBFB): Inner core of bezel cards.
- **On-Red Muted** (#EED7D6): Secondary text on Cola Red (4.9:1).
- **Can Amber** (#F5B21B): The single accent. Fill only (status, the Tuesday half brick, small highlights), always with Cola Ink on top. Never amber text on white or red.
- **Hairline** (rgba(30, 11, 7, 0.08)): Bezel rings and dividers.

Shadows are tinted with Cola Ink or Cola Red Deep, never neutral black.

## 3. Typography Rules

- **Display:** Big Shoulders Display, weight 900, line-height 0.86 to 0.9, uppercase only for the big lockups (LANCE, the three numbers, LET'S BUILD IT., section titles). Tracking 0 to -0.01em. Sized in `vw` so the lockups span the width.
- **Body:** Geist 400/500/600. 1rem to 1.125rem, line-height 1.55, max 62ch. Headings that are sentences stay in sentence case.
- **Mono:** Geist Mono 500 for the live New York clock and time values, tabular numbers.
- **Banned:** Inter, Roboto, Arial, Unbounded (it wrapped the old hero to 4 lines), any serif.

## 4. Component Stylings

- **Primary pill (Nike lockup CTA):** fully rounded, 56px tall, label in Geist 500, with the arrow nested in its own 40px circle flush to the right padding (button-in-button). White pill with ink text on red, ink pill with white text on white. Hover: the inner circle slides up-right by 2px and scales 1.06; press: whole pill scales to 0.98. Transition `cubic-bezier(0.32, 0.72, 0, 1)` 500ms.
- **Text link CTA:** Geist 500 with a 1px underline that grows from the left on hover.
- **Bezel card (double bezel):** outer shell with a hairline ring, 6px padding, 28px radius, faint ink tint; inner core with its own fill, an inset top highlight and a 22px radius (concentric). Used only in the bento, where the cards are the content.
- **Chips:** 32px pills, hairline ring, Geist 500 at 0.8125rem. On red, a white 14% fill.
- **Squircle headshots:** 64px, `border-radius: 34%`, Roblox headshots on a Cool White fill.
- **Red platform:** the availability row uses a clean, solid red platform. Each day remains clearly labeled and accessible.
- **Nav:** floating glass pill 16px below the top edge, dark ink glass (`rgba(30,11,7,0.55)` with 18px blur and saturate), white text, inner 1px highlight. Height 56px. Mobile: a hamburger whose two bars rotate into an X, opening a full-screen ink glass overlay; links slide up from a mask with a 60ms stagger.
- **Status:** a single amber or white dot that means something (around or away), next to plain text.
- **Loading:** images reserve their box with width and height; the clock renders server-free from the first frame, no spinners anywhere.

## 5. Layout Principles

- Max content width 1360px, 16px side gutter on phones, `clamp(20px, 4vw, 56px)` above.
- Section rhythm `clamp(6rem, 14vw, 12rem)` top and bottom, bottom slightly larger.
- Hero: full-bleed `min-height: 100dvh`. Giant type centered behind, figure centered slightly right and anchored to the floor, copy block bottom left.
- Intro: one large statement with an inline pill image, then two statistics on an offset grid (not cards).
- What I do: gapless 4-column bento, dense flow, exactly 5 cells.
- Vouches: 5/7 split. Left column pinned (title and the point render), with Cw’s review in the right column.
- Availability: New York clock and status left, note right, then the full-width availability row with the car scene.
- Closing: red field, giant type behind Lance’s avatar, CTA pill, then a one-line footer.
- Every multi-column layout becomes a single column under 768px. No horizontal scroll at 320px.

## 6. Motion & Interaction

- Engine: GSAP 3 + ScrollTrigger and Lenis smooth scroll, loaded from jsDelivr with pinned versions. Lenis drives ScrollTrigger through the GSAP ticker. Never `window.addEventListener('scroll')`.
- Hero load: LANCE letters rise out of a mask with a stagger, the figure lifts in, copy follows.
- Hero depth: pointer parallax, type moves least, figure moves most (`gsap.quickTo`). Off on touch.
- Hero exit: as the hero scrolls away the figure rises and the type sinks, scrubbed.
- Intro: words scrub from 12% to 100% opacity in reading order.
- Bento and availability: fade-up batches; the platform and avatar enter cleanly.
- Vouches: left column pinned for the length of the quotes. The pin is `position: sticky` rather than a ScrollTrigger pin: same result, no layout work in JS, and it keeps working without scripts. The point render scales up as the section arrives.
- Closing: the wave render rises in as the section enters.
- Easing: `power3.out`, `expo.out` and `cubic-bezier(0.32, 0.72, 0, 1)`. No linear, no bounce.
- `prefers-reduced-motion: reduce`: no Lenis, no GSAP, no parallax; everything renders in its final state.
- Reveals always use explicit `fromTo` values. GSAP reads a CSS translate equal to half an element's height as `yPercent: -50`, which once left the week bricks hanging 48px high.
- Perpetual loops stay under 5 seconds (the jump float, the status ping), so no pause control is needed.

## 7. Anti-Patterns (Banned)

- No em dashes or en dashes anywhere in visible text.
- No placeholder or invented content: every number, name and quote comes from HANDOFF.md and `data/`.
- No stats, badges or tags in the hero. No "scroll" cues. No section numbers or meta labels.
- No boxed avatar: renders live in the background composition.
- No random dark sections; red only at the two ends.
- No contact forms. Discord is the only contact.
- No Inter, Roboto, Arial, Unbounded, serif.
- No pure black (#000000), no neon glows, no gradient text.
- No three equal feature cards.
- No emojis.
- No custom cursors.
