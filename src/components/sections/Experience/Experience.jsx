// src/components/sections/Experience/Experience.jsx
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import { experiences } from '../../../data/experience'
import ExperienceItem from './ExperienceItem'
import styles from './Experience.module.css'

export default function Experience() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const placeholderRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const sectionInView = useInView(sectionRef, { margin: '-10% 0px' })
  const scrambledTitle = useScramble('Experience', titleInView)
  const [expandedId, setExpandedId] = useState(null)
  const [imgPos, setImgPos] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineScaleY = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const mapped = Math.max(0, Math.min(1, (latest - 0.1) / (0.75 - 0.1)))
    if (mapped > lineScaleY.get()) lineScaleY.set(mapped)
  })

  // Measure the placeholder's position so we can pin the image there with position:fixed
  useEffect(() => {
    function measure() {
      if (!placeholderRef.current) return
      const r = placeholderRef.current.getBoundingClientRect()
      setImgPos({ left: r.left, width: r.width })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (placeholderRef.current) ro.observe(placeholderRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

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

          {/* Invisible placeholder reserves the right grid column for measurement */}
          <div ref={placeholderRef} className={styles.imagePlaceholder} />
        </div>
      </div>

      {/* Fixed image — pinned to the right column position, centered in viewport */}
      {imgPos && (
        <motion.div
          className={styles.experienceImage}
          style={{ left: imgPos.left, width: imgPos.width }}
          initial={{ opacity: 0 }}
          animate={{ opacity: sectionInView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.imageWrapper}>
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
      )}
    </section>
  )
}
