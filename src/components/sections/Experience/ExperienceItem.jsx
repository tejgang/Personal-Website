import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Experience.module.css'

const ExperienceItem = forwardRef(function ExperienceItem({ exp, index }, ref) {
  return (
    <motion.div
      className={styles.experienceItem}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className={styles.experienceTitle}>
        <img src={exp.logo} alt={exp.company} className={styles.companyLogo} loading="lazy" />
        {exp.role}
      </div>
      <div className={styles.experienceCompany}>
        {exp.url ? (
          <a href={exp.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            {exp.company}
          </a>
        ) : (
          exp.company
        )}
      </div>
      <div className={styles.experienceDate}>{exp.date}</div>
      <div className={styles.experienceLocation}>{exp.location}</div>
    </motion.div>
  )
})

export default ExperienceItem
