# Site Redesign — Design Spec
**Date:** 2026-04-09  
**Status:** Approved for implementation planning

---

## Context

The current site feels flat — rectangular text boxes, limited depth, minimal interactivity beyond scroll-reveal fades. Now that the site is fully in React, it's the right time to invest in a more immersive, editorial design. Goals: more visual depth, more interactivity, a consistent design personality across all sections.

Color palette is **intentionally deferred** — to be chosen based on the user's profile photo and the Santa Barbara photo already in the site. Purple-blue gradient (`#667eea → #764ba2`) is used as a placeholder throughout; it will be swapped in a follow-up pass.

---

## Design Direction

**Aesthetic:** Technical / Editorial (dark, sharp, grid-based)  
- Subtle `#667eea`-tinted grid lines as the base background texture  
- Sharp border-radius (4–8px), not soft rounded cards  
- Strong typographic hierarchy: uppercase labels, tight line-height, weight contrast  
- Thin vertical accent bar on the left edge of each section  

**Interactivity pillars:**
1. **Mouse-reactive grid** — background grid warps subtly toward cursor
2. **Scroll-driven transforms** — elements transform *as* you scroll, not just on entry
3. **3D hover micro-interactions** — cards tilt in perspective on hover
4. **Scramble text effect** — section titles decode into place on scroll-enter (extends typewriter)

---

## Section Specs

### 1. Site Shell / Background

**Replace** `AmbientBackground` with a new `GridBackground` component:
- Full-screen fixed canvas or CSS grid overlay
- Grid lines at ~28px spacing, `rgba(primaryColor, 0.06)` tint
- On `mousemove`: lines near cursor warp slightly (CSS `perspective` or canvas distortion), max ~10px displacement, eases back on mouse leave
- Thin left-edge accent bar: `2px` wide, `linear-gradient(180deg, primaryColor, transparent)`, fixed per section

**Scramble text hook** (`useScramble`):
- Takes a string and a `trigger` boolean
- On trigger: cycles each character through random ASCII chars at ~30ms intervals, settles letter by letter left-to-right
- Total reveal time: ~800ms for a typical section title
- Used on: all `<h2>` section titles, company names in Experience

---

### 2. Hero / About

**Layout:** Two-column (image right, text left) — preserved from current.

**Typography changes:**
- First name (`Tej`) — large, full white, `font-weight: 800`
- Last name (`Gangupantula`) — outline/ghost style: `color: transparent`, `-webkit-text-stroke: 1px rgba(255,255,255,0.35)`
- Label above: small uppercase, `letter-spacing: 3px`, accent color — "Data Scientist & ML Engineer"

**Photo treatment:**
- Decorative corner brackets (CSS `::before`/`::after` or extra `<div>`s): sharp L-shaped corners, `2px solid primaryColor`, positioned top-left and bottom-right of the image container
- Border: `1px solid rgba(primaryColor, 0.4)`
- Border-radius: 8px (keep slight rounding)

**Stats row** below bio text:
- `4 Roles · 25+ Skills · UCSB`
- Small, uppercase, `color: #888`, separated by `·`

**Scroll entrance:**
- Text column: `x: -40px → 0, opacity: 0 → 1`
- Image column: `x: 40px → 0, opacity: 0 → 1`
- Both triggered `whileInView`, staggered by 0.15s

**Typewriter:** Keep as-is on the bio/tagline line.

---

### 3. Experience

**Timeline structure:** Preserved. Upgrades:

**Scroll-driven line growth:**
- The vertical timeline line starts at `scaleY: 0` (transform-origin top)
- Grows to `scaleY: 1` as the user scrolls through the section
- Use Framer Motion `useScroll` + `useTransform` to drive `scaleY` from scroll progress

**Item entrance:**
- Odd-indexed items: `x: -50px → 0`
- Even-indexed items: `x: 50px → 0`
- Both: `opacity: 0 → 1`, triggered `whileInView`

**Expandable cards:**
- Default state: shows role, company, date, location — **description hidden**
- Click card: description expands with `AnimatePresence` height animation (Framer Motion `layout`)
- Chevron icon indicates expandability
- Only one card expanded at a time

**Company name scramble:** Trigger on `whileInView` using `useScramble` hook.

---

### 4. Projects

**Structure:** Keep existing card grid.

**3D tilt on hover:**
- `onMouseMove` on each card: calculate cursor position relative to card center
- Apply `rotateX` and `rotateY` proportionally (~5–8° max)
- `perspective: 1000px` on the card wrapper
- Ease back to flat on `onMouseLeave`

**Tech stack strip:**
- Currently: tech tags visible at all times
- New: tags hidden by default, revealed as a strip sliding up from the bottom of the card on hover
- `overflow: hidden`, `height: 0 → auto` (or fixed height) with `transition`

---

### 5. Skills

**Replace** the current category grid with an SVG-based web/node layout.

**Structure per category:**
- Central labeled bubble (category name + emoji icon)
- Individual skill bubbles connected by lines radiating outward
- All four webs displayed simultaneously in a **2×2 grid** (one per category quadrant)

**SVG implementation:**
- Each web is a self-contained SVG or positioned-absolute layout with a central `<div>` and skill `<div>`s
- Lines drawn as `<line>` elements in SVG, or CSS `transform-origin`-based absolutely positioned bars
- Positions calculated based on count of skills (evenly distribute around a circle, or in a spoke pattern)

**Entrance animation (per web, staggered by category index):**
1. Central bubble fades in (`opacity: 0 → 1`, `scale: 0 → 1`)
2. Lines draw out (`strokeDashoffset` animation or `scaleX: 0 → 1` on positioned bars)
3. Skill bubbles pop in one by one (`scale: 0 → 1`, staggered)

**Hover states:**
- Hover skill bubble: bubble scales up, border highlights, connecting line pulses (opacity flicker)
- Hover central bubble: all connected lines pulse simultaneously

---

### 6. Contact

**Remove** `ContactForm.jsx` and EmailJS integration entirely.

**New layout:**
- 4 info cards remain (email, location, GitHub, LinkedIn) — keep current card styling, update to editorial aesthetic (sharper corners, tighter padding)
- Below cards: a single `"Get in Touch →"` button

**Expandable form:**
- On click: section expands via `AnimatePresence` to reveal a compact 3-field form
  - Name (text)
  - Email (email)
  - Message (textarea, ~4 rows)
  - Submit button
- Form submits via **Formspree** (`<form method="POST" action="https://formspree.io/f/{id}">`)
- No JS SDK, no env vars needed — just a form POST
- On success: Formspree redirects back or shows inline thank-you (use `fetch` + `e.preventDefault()` for AJAX submission)
- Button text toggles: `"Get in Touch →"` ↔ `"Close"` when expanded

**Remove:** `VITE_EMAILJS_SERVICE`, `VITE_EMAILJS_TEMPLATE`, `VITE_EMAILJS_KEY` env vars (update `.env.example` and Netlify dashboard note in CLAUDE.md)

---

## Files to Create / Modify

**New components:**
- `src/components/GridBackground/GridBackground.jsx` + `.module.css` — replaces AmbientBackground
- `src/hooks/useScramble.js` — scramble text animation hook

**Modified components:**
- `src/components/sections/About/About.jsx` + `.module.css`
- `src/components/sections/Experience/Experience.jsx`, `ExperienceItem.jsx` + CSS
- `src/components/sections/Projects/ProjectCard.jsx` + `.module.css`
- `src/components/sections/Skills/Skills.jsx`, `SkillCategory.jsx` + CSS (major rewrite)
- `src/components/sections/Contact/Contact.jsx` + `.module.css` (remove ContactForm.jsx)
- `src/App.jsx` — swap AmbientBackground → GridBackground
- `.env.example` — remove EmailJS vars
- `CLAUDE.md` — update env var docs

**Deferred (follow-up):**
- Color palette swap (inspired by profile photo + Santa Barbara photo)

---

## Verification

- `npm run dev` — visually inspect each section in browser
- Mouse movement on any section → grid should subtly warp
- Scroll through Experience → line grows, items alternate sides, cards collapse by default
- Click an experience card → description expands, others collapse
- Hover a project card → 3D tilt, tech strip slides up
- Skills section → 2×2 web layout, entrance animation plays on scroll
- Hover a skill bubble → highlights + line pulses
- Contact → 4 cards visible, "Get in Touch" button present
- Click button → form expands inline
- Submit form → Formspree receives submission (test with real email)
- `npm run build` → no errors
