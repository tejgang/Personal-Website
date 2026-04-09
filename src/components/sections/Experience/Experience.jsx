// src/components/sections/Experience/Experience.jsx
import { useRef } from 'react'
import { motion, useScroll, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import { experiences } from '../../../data/experience'
import ExperienceItem from './ExperienceItem'
import styles from './Experience.module.css'

export default function Experience() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Experience', titleInView)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineScaleY = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const mapped = Math.max(0, Math.min(1, (latest - 0.1) / (0.75 - 0.1)))
    if (mapped > lineScaleY.get()) lineScaleY.set(mapped)
  })

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
              />
            ))}
          </div>

          <motion.div
            className={styles.imageColumn}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className={styles.photoWrapper}>
              <img
                src="/images/aerial-view-ocean-front.jpg"
                alt="Aerial ocean view"
                className={styles.campusImage}
                loading="lazy"
                width={600}
                height={600}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
