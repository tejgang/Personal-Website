# Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the full portfolio site with a Technical/Editorial aesthetic — grid background, scroll-driven animations, 3D hover interactions, scramble text effects, SVG skill webs, and a simplified Formspree contact form.

**Architecture:** Replace `AmbientBackground` with a mouse-reactive `GridBackground`. Add a `useScramble` hook used by all section titles. Rewrite each section component in place, keeping data files (`src/data/`) and the Navbar/Footer untouched.

**Tech Stack:** React 18, Framer Motion 11 (`useScroll`, `useTransform`, `AnimatePresence`), CSS Modules, SVG, Formspree (form POST).

**Design spec:** `docs/superpowers/specs/2026-04-09-site-redesign-design.md`

---

## File Map

**Create:**
- `src/components/GridBackground/GridBackground.jsx`
- `src/components/GridBackground/GridBackground.module.css`
- `src/hooks/useScramble.js`

**Modify:**
- `src/App.jsx` — swap AmbientBackground → GridBackground
- `src/data/experience.js` — add `description` field to each entry
- `src/components/sections/About/About.jsx`
- `src/components/sections/About/About.module.css`
- `src/components/sections/Experience/Experience.jsx`
- `src/components/sections/Experience/ExperienceItem.jsx`
- `src/components/sections/Experience/Experience.module.css`
- `src/components/sections/Projects/ProjectCard.jsx`
- `src/components/sections/Projects/Projects.module.css`
- `src/components/sections/Skills/Skills.jsx`
- `src/components/sections/Skills/SkillCategory.jsx` → rename/rewrite as `SkillWeb.jsx`
- `src/components/sections/Skills/Skills.module.css`
- `src/components/sections/Contact/Contact.jsx`
- `src/components/sections/Contact/Contact.module.css`
- `.env.example`
- `CLAUDE.md`

**Delete:**
- `src/components/sections/Contact/ContactForm.jsx`
- `src/components/sections/Contact/ContactForm.module.css`
- `src/components/AmbientBackground/AmbientBackground.jsx`
- `src/components/AmbientBackground/AmbientBackground.module.css`
- `src/hooks/useTimelineDots.js` (no longer used after Experience redesign)

---

## Task 1: useScramble hook

**Files:**
- Create: `src/hooks/useScramble.js`

- [ ] **Step 1: Create the hook**

```js
// src/hooks/useScramble.js
import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'

export function useScramble(text, trigger) {
  const [displayed, setDisplayed] = useState(text)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!trigger) return

    let settled = 0
    const msPerChar = Math.min(Math.floor(800 / text.length), 80)

    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < settled) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      settled++
      if (settled > text.length) clearInterval(intervalRef.current)
    }, msPerChar)

    return () => clearInterval(intervalRef.current)
  }, [trigger, text])

  return displayed
}
```

- [ ] **Step 2: Verify in browser (after Task 3 wires it in — skip until then)**

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScramble.js
git commit -m "feat: add useScramble hook for text decode animation"
```

---

## Task 2: GridBackground component

**Files:**
- Create: `src/components/GridBackground/GridBackground.jsx`
- Create: `src/components/GridBackground/GridBackground.module.css`

- [ ] **Step 1: Create the JSX**

```jsx
// src/components/GridBackground/GridBackground.jsx
import { useEffect, useRef } from 'react'
import styles from './GridBackground.module.css'

export default function GridBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      el.style.setProperty('--shift-x', `${x}px`)
      el.style.setProperty('--shift-y', `${y}px`)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div ref={ref} className={styles.grid} aria-hidden="true" />
}
```

- [ ] **Step 2: Create the CSS**

```css
/* src/components/GridBackground/GridBackground.module.css */
.grid {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: #080808;
  background-image:
    linear-gradient(rgba(102, 126, 234, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(102, 126, 234, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  background-position:
    calc(50% + var(--shift-x, 0px)) calc(50% + var(--shift-y, 0px));
  transition: background-position 0.15s ease-out;
  pointer-events: none;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/GridBackground/GridBackground.jsx src/components/GridBackground/GridBackground.module.css
git commit -m "feat: add GridBackground with mouse-reactive grid"
```

---

## Task 3: Wire GridBackground into App

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Swap AmbientBackground for GridBackground**

Replace the full content of `src/App.jsx`:

```jsx
// src/App.jsx
import GridBackground from './components/GridBackground/GridBackground'
import Navbar from './components/Navbar/Navbar'
import About from './components/sections/About/About'
import Experience from './components/sections/Experience/Experience'
import Projects from './components/sections/Projects/Projects'
import Skills from './components/sections/Skills/Skills'
import Contact from './components/sections/Contact/Contact'
import Footer from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Open http://localhost:5173. Move your mouse — the grid should shift subtly. The dark `#080808` background should replace the old gradient/particle background.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire GridBackground into App, remove AmbientBackground"
```

---

## Task 4: Hero / About redesign

**Files:**
- Modify: `src/components/sections/About/About.jsx`
- Modify: `src/components/sections/About/About.module.css`

- [ ] **Step 1: Rewrite About.jsx**

Replace full file content:

```jsx
// src/components/sections/About/About.jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTypewriter } from '../../../hooks/useTypewriter'
import { useScramble } from '../../../hooks/useScramble'
import styles from './About.module.css'

export default function About() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('About Me', titleInView)
  const { displayed, done } = useTypewriter('Data Scientist & ML Engineer', 2000, 80)

  return (
    <section id="about" className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>

          {/* Left: text */}
          <motion.div
            className={styles.aboutText}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <p className={styles.label}>Hi, I'm</p>

            <h1 className={styles.name}>
              <span className={styles.nameSolid}>Tej</span>
              <span className={styles.nameGhost}>Gangupantula</span>
            </h1>

            <div className={styles.divider} />

            <p className={styles.typewriterLine}>
              {displayed}
              {!done && <span className={styles.cursor}>|</span>}
            </p>

            <p ref={titleRef} className={styles.sectionLabel}>{scrambledTitle}</p>

            <div className={styles.aboutDescription}>
              <p>
                Hello! I'm Tej, and I am currently pursuing my B.S. in Statistics and Data Science
                at UC Santa Barbara. I am particularly interested in machine learning, data science,
                and artificial intelligence.
              </p>
              <p>
                My path into AI started with curiosity about how data reveals patterns and drives
                decisions. I've since applied this passion through internships where I built agentic
                AI applications, cloud pipelines, and predictive models that automated healthcare
                workflows and supported clinicians with data-driven insights.
              </p>
              <p>
                When I'm not building or learning, I enjoy cooking for my family and friends,
                working out, and spending quality time with my loved ones.
              </p>
            </div>

            <div className={styles.statsRow}>
              <span>4 Roles</span>
              <span className={styles.dot}>·</span>
              <span>25+ Skills</span>
              <span className={styles.dot}>·</span>
              <span>UCSB</span>
            </div>

            <div className={styles.actions}>
              <a
                href="/documents/Gangupantula_Tej_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resumeBtn}
              >
                View Resume
              </a>
              <a
                href="https://github.com/tejgang"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubBtn}
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className={styles.photoWrapper}>
              <img
                src="/images/IMG_8674.png"
                alt="Tej Gangupantula"
                className={styles.profileImg}
                loading="eager"
                width={400}
                height={550}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite About.module.css**

Replace full file content:

```css
/* src/components/sections/About/About.module.css */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0 4rem;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #667eea, transparent);
}

.heroContent {
  width: 100%;
}

/* Two-column grid: text left, image right */
.heroContent {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* IMAGE COLUMN */
.leftColumn {
  display: flex;
  justify-content: center;
}

.photoWrapper {
  position: relative;
  display: inline-block;
}

.photoWrapper::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 32px;
  height: 32px;
  border-top: 2px solid #667eea;
  border-left: 2px solid #667eea;
  pointer-events: none;
}

.photoWrapper::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 32px;
  height: 32px;
  border-bottom: 2px solid #764ba2;
  border-right: 2px solid #764ba2;
  pointer-events: none;
}

.profileImg {
  display: block;
  width: 100%;
  max-width: 360px;
  height: auto;
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.35);
  object-fit: cover;
}

/* TEXT COLUMN */
.aboutText {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #667eea;
  margin: 0 0 0.5rem;
}

.name {
  margin: 0 0 1rem;
  line-height: 1.05;
}

.nameSolid {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: #fff;
}

.nameGhost {
  display: block;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
}

.divider {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  margin-bottom: 1rem;
}

.typewriterLine {
  font-size: 1rem;
  color: #b0b0b0;
  margin: 0 0 0.5rem;
  min-height: 1.5rem;
}

.cursor {
  color: #667eea;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.sectionLabel {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #555;
  margin: 0 0 1.2rem;
}

.aboutDescription {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.aboutDescription p {
  font-size: 0.9rem;
  color: #b0b0b0;
  line-height: 1.7;
  margin: 0;
}

.statsRow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
  margin-bottom: 1.5rem;
}

.dot {
  color: #667eea;
}

.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.resumeBtn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: opacity 0.2s, transform 0.2s;
}

.resumeBtn:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.githubBtn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border: 1px solid rgba(102, 126, 234, 0.4);
  color: #667eea;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 0.2s, transform 0.2s;
}

.githubBtn:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .heroContent {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .profileImg {
    max-width: 240px;
  }
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`. Open http://localhost:5173:
- Hero shows two columns: text left, image right
- Name shows "Tej" solid and "Gangupantula" in ghost/outline style
- Decorative corner brackets visible on photo (top-left `#667eea`, bottom-right `#764ba2`)
- Typewriter plays on the tagline
- "About Me" label scrambles on scroll into view
- Stats row: `4 Roles · 25+ Skills · UCSB`
- Gradient divider line below the name block
- Left accent bar visible on section

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About/About.jsx src/components/sections/About/About.module.css
git commit -m "feat: redesign Hero/About with editorial layout and corner brackets"
```

---

## Task 5: Add descriptions to experience data

**Files:**
- Modify: `src/data/experience.js`

- [ ] **Step 1: Add `description` field to each entry**

Replace full file content:

```js
// src/data/experience.js
export const experiences = [
  {
    id: 1,
    role: 'AI Engineer Intern',
    company: 'Agentman',
    url: 'https://agentman.ai/',
    logo: '/images/agentman_logo.jpg',
    date: 'Jun 2025 - Present',
    location: 'Berkeley, CA',
    description:
      'Building agentic AI tools and infrastructure. Working on model evaluation pipelines, tool-use frameworks, and developer-facing SDK features that help users deploy production AI agents.',
  },
  {
    id: 2,
    role: 'Machine Learning Intern',
    company: 'FusionCare',
    url: 'https://fusioncare.ai/',
    logo: '/images/fusioncare.jpeg',
    date: 'Jul 2024 - Sep 2024',
    location: 'Davis, CA',
    description:
      'Built predictive ML models to automate healthcare workflows and surface data-driven insights for clinical teams. Developed cloud data pipelines on GCP and integrated model outputs into existing care coordination software.',
  },
  {
    id: 3,
    role: 'Concessions Event Staff',
    company: 'UC Santa Barbara Campus Concessions',
    url: 'https://dining.ucsb.edu/campus-concessions',
    logo: '/images/ucsb.png',
    date: 'Feb 2024 - Present',
    location: 'Santa Barbara, CA',
    description:
      'Managed point-of-sale operations and customer service at UCSB sporting events and campus venues. Coordinated with team leads on inventory and staffing logistics.',
  },
  {
    id: 4,
    role: 'Web Development Intern',
    company: 'Modesto City Schools District',
    url: null,
    logo: '/images/modesto.png',
    date: 'Nov 2022 - May 2023',
    location: 'Modesto, CA',
    description:
      'Developed and maintained district website pages. Improved accessibility compliance and page load performance. Collaborated with communications staff to publish content updates across multiple school sites.',
  },
]
```

> **Note:** These descriptions are reasonable placeholders — edit them to match your actual work before shipping.

- [ ] **Step 2: Commit**

```bash
git add src/data/experience.js
git commit -m "feat: add description field to experience data"
```

---

## Task 6: Experience section redesign

**Files:**
- Modify: `src/components/sections/Experience/Experience.jsx`
- Modify: `src/components/sections/Experience/ExperienceItem.jsx`
- Modify: `src/components/sections/Experience/Experience.module.css`

- [ ] **Step 1: Rewrite Experience.jsx**

Replace full file content:

```jsx
// src/components/sections/Experience/Experience.jsx
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import { experiences } from '../../../data/experience'
import ExperienceItem from './ExperienceItem'
import styles from './Experience.module.css'

export default function Experience() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const lineRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Experience', titleInView)
  const [expandedId, setExpandedId] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0.1, 0.75], [0, 1])

  function handleToggle(id) {
    setExpandedId(prev => (prev === id ? null : id))
  }

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className="container">
        <h2 ref={titleRef} className={styles.sectionHeader}>
          {scrambledTitle}
        </h2>

        <div className={styles.experienceWrapper}>
          <div className={styles.experienceTimeline}>
            <motion.div
              className={styles.timelineLine}
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
            />
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.id}
                exp={exp}
                index={index}
                isExpanded={expandedId === exp.id}
                onToggle={() => handleToggle(exp.id)}
              />
            ))}
          </div>

          <motion.div
            className={styles.experienceImage}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <img
              src="/images/aerial-view-ocean-front.jpg"
              alt="Aerial ocean view"
              className={styles.campusImage}
              loading="lazy"
              width={600}
              height={600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite ExperienceItem.jsx**

Replace full file content:

```jsx
// src/components/sections/Experience/ExperienceItem.jsx
import { useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import styles from './Experience.module.css'

export default function ExperienceItem({ exp, index, isExpanded, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const scrambledCompany = useScramble(exp.company, inView)

  return (
    <motion.div
      ref={ref}
      className={styles.experienceItem}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-80px' }}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.itemHeader}>
        <div className={styles.experienceTitle}>
          <img src={exp.logo} alt={exp.company} className={styles.companyLogo} loading="lazy" />
          {exp.role}
        </div>
        <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>▾</span>
      </div>

      <div className={styles.experienceCompany}>
        {exp.url ? (
          <a
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {scrambledCompany}
          </a>
        ) : (
          scrambledCompany
        )}
      </div>

      <div className={styles.experienceMeta}>
        <span className={styles.experienceDate}>{exp.date}</span>
        <span className={styles.metaSep}>·</span>
        <span className={styles.experienceLocation}>{exp.location}</span>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className={styles.experienceDescription}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p>{exp.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
```

- [ ] **Step 3: Update Experience.module.css**

Replace full file content:

```css
/* src/components/sections/Experience/Experience.module.css */
.section {
  padding: 6rem 0;
  position: relative;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #667eea, transparent);
}

.sectionHeader {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 3rem;
  letter-spacing: -0.5px;
}

.experienceWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* TIMELINE */
.experienceTimeline {
  position: relative;
  padding-left: 1.5rem;
}

.timelineLine {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #667eea, #764ba2);
}

/* EXPERIENCE CARD */
.experienceItem {
  position: relative;
  padding: 1.25rem 1.25rem 1.25rem 1.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  transition: border-color 0.2s, background 0.2s;
}

.experienceItem:hover {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.04);
}

/* Timeline dot */
.experienceItem::before {
  content: '';
  position: absolute;
  left: -1.875rem;
  top: 1.4rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #667eea;
  border: 2px solid #080808;
}

.itemHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.4rem;
}

.experienceTitle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.companyLogo {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.08);
}

.chevron {
  color: #555;
  font-size: 1.1rem;
  transition: transform 0.25s ease, color 0.2s;
  flex-shrink: 0;
  margin-top: 2px;
}

.chevronOpen {
  transform: rotate(180deg);
  color: #667eea;
}

.experienceCompany {
  font-size: 0.85rem;
  color: #667eea;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.experienceMeta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #666;
}

.metaSep {
  color: #444;
}

.experienceDescription {
  margin-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 0.75rem;
}

.experienceDescription p {
  font-size: 0.85rem;
  color: #b0b0b0;
  line-height: 1.7;
  margin: 0;
}

/* SIDE IMAGE */
.experienceImage {
  position: sticky;
  top: 6rem;
}

.campusImage {
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  object-fit: cover;
}

/* Responsive */
@media (max-width: 900px) {
  .experienceWrapper {
    grid-template-columns: 1fr;
  }

  .experienceImage {
    display: none;
  }
}
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`. Scroll to Experience:
- "Experience" title scrambles on scroll into view
- Timeline line grows as you scroll through the section (scroll-driven, not instant)
- Items alternate: even items slide in from left, odd from right
- Cards show role, company (scrambles), date, location — no description by default
- Click a card → description expands; clicking another collapses the first
- Chevron rotates when open

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Experience/Experience.jsx src/components/sections/Experience/ExperienceItem.jsx src/components/sections/Experience/Experience.module.css
git commit -m "feat: redesign Experience with scroll-driven timeline and expandable cards"
```

---

## Task 7: Projects 3D tilt and tech strip

**Files:**
- Modify: `src/components/sections/Projects/ProjectCard.jsx`
- Modify: `src/components/sections/Projects/Projects.module.css`

- [ ] **Step 1: Rewrite ProjectCard.jsx**

Replace full file content:

```jsx
// src/components/sections/Projects/ProjectCard.jsx
import { memo, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Projects.module.css'

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }

  function handleMouseLeave() {
    cardRef.current.style.transform =
      'perspective(1000px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <motion.div
      ref={cardRef}
      className={styles.projectCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.projectImage}>
        <div className={styles.projectEmoji}>{project.emoji}</div>
        <img
          src={project.image}
          alt={project.title}
          className={styles.projectHoverImage}
          loading="lazy"
          width={350}
          height={200}
        />
      </div>

      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.projectLinks}>
          {project.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Tech strip — revealed on hover */}
      <div className={styles.techStrip}>
        {project.tags.map(tag => (
          <span key={tag} className={styles.techTag}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
})

export default ProjectCard
```

- [ ] **Step 2: Update Projects.module.css — add `position: relative` to card, add tech strip rules**

In `src/components/sections/Projects/Projects.module.css`, make two targeted edits:

**Edit 1** — add `position: relative` and `will-change: transform` to the existing `.projectCard` rule. Find this line inside `.projectCard`:
```css
  overflow: hidden;
```
and add after it:
```css
  position: relative;
  will-change: transform;
```

**Edit 2** — add the tech strip styles at the end of the file (before any `@media` blocks):
```css
.techStrip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.6rem 1rem;
  background: linear-gradient(to top, rgba(8, 8, 8, 0.95) 60%, transparent);
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.projectCard:hover .techStrip {
  transform: translateY(0);
}

.techTag {
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  background: rgba(102, 126, 234, 0.15);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 3px;
  color: #667eea;
  font-weight: 500;
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`. Scroll to Projects:
- Cards no longer have tech tags visible by default
- Hover a card → card tilts in 3D perspective (rotates ~5-10° on X/Y axis)
- Tech tags strip slides up from the bottom on hover
- Mouse leave → card smoothly returns to flat

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Projects/ProjectCard.jsx src/components/sections/Projects/Projects.module.css
git commit -m "feat: add 3D tilt and hover tech strip to project cards"
```

---

## Task 8: Skills web/node layout

**Files:**
- Modify: `src/components/sections/Skills/Skills.jsx`
- Modify: `src/components/sections/Skills/SkillCategory.jsx` (full rewrite → becomes SkillWeb)
- Modify: `src/components/sections/Skills/Skills.module.css`

- [ ] **Step 1: Rewrite SkillCategory.jsx as SkillWeb**

Replace full file content (keep filename `SkillCategory.jsx` to avoid import changes):

```jsx
// src/components/sections/Skills/SkillCategory.jsx
import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Skills.module.css'

const SIZE = 300        // container px
const CENTER = SIZE / 2
const RADIUS = 108      // distance from center to skill bubbles

function getPosition(index, total) {
  const angle = (2 * Math.PI / total) * index - Math.PI / 2
  return {
    x: CENTER + Math.cos(angle) * RADIUS,
    y: CENTER + Math.sin(angle) * RADIUS,
  }
}

const SkillWeb = memo(function SkillWeb({ category, index: categoryIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className={styles.webWrapper}>
      {/* SVG lines layer */}
      <svg
        className={styles.webSvg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={SIZE}
        height={SIZE}
        aria-hidden="true"
      >
        {category.skills.map((skill, i) => {
          const { x, y } = getPosition(i, category.skills.length)
          return (
            <motion.path
              key={skill.name}
              d={`M ${CENTER} ${CENTER} L ${x} ${y}`}
              stroke="rgba(102, 126, 234, 0.25)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 0.5, delay: categoryIndex * 0.15 + 0.3 + i * 0.06 },
                opacity: { duration: 0.2, delay: categoryIndex * 0.15 + 0.3 + i * 0.06 },
              }}
            />
          )
        })}
      </svg>

      {/* Center bubble */}
      <motion.div
        className={styles.centerBubble}
        style={{ left: CENTER, top: CENTER }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: categoryIndex * 0.15 }}
      >
        <span className={styles.centerIcon}>{category.icon}</span>
        <span className={styles.centerLabel}>{category.title}</span>
      </motion.div>

      {/* Skill bubbles */}
      {category.skills.map((skill, i) => {
        const { x, y } = getPosition(i, category.skills.length)
        return (
          <motion.div
            key={skill.name}
            className={styles.skillBubble}
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.35,
              delay: categoryIndex * 0.15 + 0.6 + i * 0.07,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.18 }}
          >
            <img src={skill.img} alt={skill.name} loading="lazy" className={styles.skillIcon} />
            <span className={styles.skillLabel}>{skill.name}</span>
          </motion.div>
        )
      })}
    </div>
  )
})

export default SkillWeb
```

- [ ] **Step 2: Rewrite Skills.jsx**

Replace full file content:

```jsx
// src/components/sections/Skills/Skills.jsx
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import { skillCategories } from '../../../data/skills'
import SkillWeb from './SkillCategory'
import styles from './Skills.module.css'

export default function Skills() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Technical Skills', titleInView)

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <h2 ref={titleRef} className={styles.sectionHeader}>
          {scrambledTitle}
        </h2>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <SkillWeb key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Rewrite Skills.module.css**

Replace full file content:

```css
/* src/components/sections/Skills/Skills.module.css */
.section {
  padding: 6rem 0;
  position: relative;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #667eea, transparent);
}

.sectionHeader {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 3rem;
  letter-spacing: -0.5px;
}

/* 2x2 grid of webs */
.skillsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
}

/* Web container — fixed square, positions children absolutely */
.webWrapper {
  position: relative;
  width: 300px;
  height: 300px;
  flex-shrink: 0;
}

.webSvg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Center bubble */
.centerBubble {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border: 1px solid rgba(102, 126, 234, 0.4);
  border-radius: 50%;
  width: 72px;
  height: 72px;
  justify-content: center;
  z-index: 2;
}

.centerIcon {
  font-size: 1.3rem;
  line-height: 1;
}

.centerLabel {
  font-size: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  text-align: center;
  line-height: 1.2;
  padding: 0 4px;
}

/* Individual skill bubbles */
.skillBubble {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 52px;
  z-index: 2;
  cursor: default;
}

.skillIcon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: brightness(0.85);
  transition: filter 0.2s;
}

.skillBubble:hover .skillIcon {
  filter: brightness(1.2);
}

.skillLabel {
  font-size: 0.5rem;
  color: #888;
  text-align: center;
  white-space: nowrap;
  transition: color 0.2s;
}

.skillBubble:hover .skillLabel {
  color: #b0b0b0;
}

/* Responsive: stack to 1 column on small screens */
@media (max-width: 700px) {
  .skillsGrid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`. Scroll to Skills:
- 2×2 grid of web diagrams, one per category
- Each web: center bubble appears first, then SVG lines draw outward, then skill bubbles pop in with spring animation
- Hover a skill bubble → it scales up
- Section title scrambles on scroll enter

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Skills/Skills.jsx src/components/sections/Skills/SkillCategory.jsx src/components/sections/Skills/Skills.module.css
git commit -m "feat: redesign Skills as SVG web/node layout with staggered animation"
```

---

## Task 9: Contact redesign with Formspree

**Files:**
- Modify: `src/components/sections/Contact/Contact.jsx`
- Modify: `src/components/sections/Contact/Contact.module.css`
- Delete: `src/components/sections/Contact/ContactForm.jsx`
- Delete: `src/components/sections/Contact/ContactForm.module.css` (if it exists)

**Prerequisite:** Create a free account at https://formspree.io, create a new form, and copy your form endpoint ID (looks like `xyzabcde`). Replace `YOUR_FORMSPREE_ID` in the code below.

- [ ] **Step 1: Rewrite Contact.jsx**

Replace full file content:

```jsx
// src/components/sections/Contact/Contact.jsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import styles from './Contact.module.css'

export default function Contact() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Contact', titleInView)

  const [email, setEmail] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    const user = String.fromCharCode(116,101,106,103,97,110,103,117,112,97,110,116,117,108,97)
    const domain = String.fromCharCode(103,109,97,105,108)
    const tld = String.fromCharCode(99,111,109)
    setEmail(`${user}@${domain}.${tld}`)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        e.target.reset()
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <h2 ref={titleRef} className={styles.sectionHeader}>
          {scrambledTitle}
        </h2>

        <motion.div
          className={styles.contactContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Info cards */}
          <div className={styles.contactCards}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <img src="/images/gmail-new.png" alt="Email" width={28} height={28} />
              </div>
              <div>
                <strong>Email</strong>
                <span>{email}</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📍</div>
              <div>
                <strong>Location</strong>
                <span>Santa Barbara, CA</span>
              </div>
            </div>

            <a
              href="https://github.com/tejgang"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img src="/images/github.png" alt="GitHub" width={36} height={36} />
                </div>
                <div>
                  <strong>GitHub</strong>
                  <span>github.com/tejgang</span>
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/tejgangupantula/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/images/linkedin-logo-linkedin-icon-transparent-free-png.png"
                    alt="LinkedIn"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/tejgangupantula</span>
                </div>
              </div>
            </a>
          </div>

          {/* Get in Touch toggle button */}
          <button
            className={styles.toggleBtn}
            onClick={() => setFormOpen(prev => !prev)}
            aria-expanded={formOpen}
          >
            {formOpen ? 'Close ✕' : 'Get in Touch →'}
          </button>

          {/* Expandable form */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                className={styles.formWrapper}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <label htmlFor="contact-name" className={styles.formLabel}>Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className={styles.formInput}
                      placeholder="Your name"
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor="contact-email" className={styles.formLabel}>Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className={styles.formInput}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor="contact-message" className={styles.formLabel}>Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      className={styles.formTextarea}
                      placeholder="What's on your mind?"
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'sending'}
                  >
                    {status === 'idle' && 'Send Message'}
                    {status === 'sending' && 'Sending...'}
                    {status === 'sent' && 'Sent ✓'}
                    {status === 'error' && 'Error — try again'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite Contact.module.css**

Replace full file content:

```css
/* src/components/sections/Contact/Contact.module.css */
.section {
  padding: 6rem 0;
  position: relative;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #667eea, transparent);
}

.sectionHeader {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 3rem;
  letter-spacing: -0.5px;
}

.contactContent {
  max-width: 560px;
}

/* Info cards */
.contactCards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.contactLink {
  text-decoration: none;
  color: inherit;
  display: block;
}

.contactItem {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  transition: border-color 0.2s, background 0.2s;
}

.contactLink:hover .contactItem,
.contactItem:hover {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.05);
}

.contactIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  font-size: 1.2rem;
}

.contactItem div:last-child {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contactItem strong {
  font-size: 0.75rem;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contactItem span {
  font-size: 0.8rem;
  color: #888;
}

/* Toggle button */
.toggleBtn {
  background: none;
  border: 1px solid rgba(102, 126, 234, 0.4);
  color: #667eea;
  padding: 0.6rem 1.25rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  margin-bottom: 0;
}

.toggleBtn:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

/* Form */
.formWrapper {
  margin-top: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
}

.formRow {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.formLabel {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #666;
}

.formInput,
.formTextarea {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.6rem 0.75rem;
  color: #fff;
  font-size: 0.85rem;
  font-family: inherit;
  transition: border-color 0.2s;
  resize: vertical;
}

.formInput:focus,
.formTextarea:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
}

.formTextarea {
  min-height: 100px;
}

.submitBtn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.65rem 1.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  align-self: flex-start;
}

.submitBtn:hover:not(:disabled) {
  opacity: 0.88;
  transform: translateY(-1px);
}

.submitBtn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .contactContent {
    max-width: 100%;
  }
}
```

- [ ] **Step 3: Delete ContactForm files**

```bash
rm src/components/sections/Contact/ContactForm.jsx
```

Also delete `ContactForm.module.css` if it exists:
```bash
rm -f src/components/sections/Contact/ContactForm.module.css
```

- [ ] **Step 4: Verify in browser**

Run `npm run dev`. Scroll to Contact:
- 4 info cards visible (email, location, GitHub, LinkedIn)
- "Get in Touch →" button below cards
- Click button → form expands with name, email, message fields
- Button label changes to "Close ✕"
- Click again → form collapses
- Fill form and submit → if Formspree ID is set, submission succeeds; otherwise, check network tab

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact/Contact.jsx src/components/sections/Contact/Contact.module.css
git commit -m "feat: redesign Contact with expandable Formspree form, remove EmailJS"
```

---

## Task 10: Cleanup and docs

**Files:**
- Delete: `src/components/AmbientBackground/AmbientBackground.jsx`
- Delete: `src/components/AmbientBackground/AmbientBackground.module.css`
- Modify: `.env.example`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Delete AmbientBackground and unused hooks**

```bash
rm src/components/AmbientBackground/AmbientBackground.jsx
rm src/components/AmbientBackground/AmbientBackground.module.css
rmdir src/components/AmbientBackground 2>/dev/null || true
rm src/hooks/useTimelineDots.js
```

- [ ] **Step 2: Update .env.example**

Replace full file content (remove EmailJS vars):

```
# No environment variables required for local development.
# Formspree form ID is hardcoded in Contact.jsx (not sensitive).
```

- [ ] **Step 3: Update CLAUDE.md — Environment Variables section**

Replace the Environment Variables section with:

```markdown
## Environment Variables
- No env vars required — Formspree form ID is hardcoded directly in `Contact.jsx`
- To change the Formspree endpoint: update the `fetch` URL in `src/components/sections/Contact/Contact.jsx`
```

- [ ] **Step 4: Build check**

```bash
npm run build
```

Expected: clean build, no errors, no references to deleted files.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove AmbientBackground, ContactForm, update env docs"
```

---

## Final Verification Checklist

- [ ] `npm run dev` — site loads with dark `#080808` grid background
- [ ] Move mouse across any section → grid shifts subtly
- [ ] Hero: two columns, "Tej" solid + "Gangupantula" ghost, corner brackets on photo, stats row, typewriter on tagline
- [ ] Experience: "Experience" title scrambles in; timeline line grows on scroll; cards slide from alternating sides; click to expand; only one open at a time
- [ ] Projects: hover card → 3D tilt; tech strip slides up from bottom
- [ ] Skills: 2×2 web grid; center → lines → bubbles animate in; hover bubble scales up
- [ ] Contact: 4 info cards; "Get in Touch →" button; click → form expands; Formspree ID set
- [ ] `npm run build` → success, no warnings
- [ ] Push to `origin HEAD:main` → Netlify deploys clean
