import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTimelineDots } from '../../../hooks/useTimelineDots'
import { experiences } from '../../../data/experience'
import ExperienceItem from './ExperienceItem'
import styles from './Experience.module.css'

export default function Experience() {
  const timelineRef = useRef(null)
  const itemRefs = useRef([])

  useTimelineDots(timelineRef, itemRefs)

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.parallaxBg} />
      <div className="container">
        <motion.h2
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-50px' }}
        >
          Experience
        </motion.h2>

        <div className={styles.experienceWrapper}>
          <div className={styles.experienceTimeline} ref={timelineRef}>
            {/* Animated timeline line */}
            <motion.div
              className={styles.timelineLine}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.id}
                exp={exp}
                index={index}
                ref={el => (itemRefs.current[index] = el)}
              />
            ))}
          </div>

          <motion.div
            className={styles.experienceImage}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <img
              src="/images/aerial-view-ocean-front.jpg"
              alt="Aerial ocean view"
              className={styles.campusImage}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
