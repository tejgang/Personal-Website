// src/components/sections/Experience/ExperienceItem.jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import styles from './Experience.module.css'

export default function ExperienceItem({ exp, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const scrambledCompany = useScramble(exp.company, inView)
  const [isFlipped, setIsFlipped] = useState(false)

  const dotDelay = index * 0.1 + 0.65

  function handleCardClick() {
    setIsFlipped(f => !f)
  }

  return (
    <motion.div
      ref={ref}
      className={styles.experienceItem}
      onClick={handleCardClick}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div
        className={styles.timelineDot}
        aria-hidden="true"
        style={{ x: '-50%' }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, delay: dotDelay, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-80px' }}
      />

      <div className={`${styles.cardFlipper} ${isFlipped ? styles.flipped : ''}`}>
        {/* Front face */}
        <div className={styles.cardFront}>
          <div className={styles.itemHeader}>
            <div className={styles.experienceTitle}>
              <img src={exp.logo} alt={exp.company} className={styles.companyLogo} loading="lazy" />
              {exp.role}
            </div>
            <span className={styles.flipHint} aria-hidden="true">↗</span>
          </div>

          <div className={styles.experienceCompany}>
            {exp.url ? (
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.companyLink}
                onClick={e => e.stopPropagation()}
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
        </div>

        {/* Back face */}
        <div className={styles.cardBack}>
          <p className={styles.backDescription}>{exp.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
