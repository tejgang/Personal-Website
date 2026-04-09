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
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle()}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
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
