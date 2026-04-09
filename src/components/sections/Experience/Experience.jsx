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
