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
