import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import { projects } from '../../../data/projects'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

const SLIDE_TRANSITION = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }

export default function Projects() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Featured Projects', titleInView)

  const [windowStart, setWindowStart] = useState(0)
  const visible = projects.slice(windowStart, windowStart + 2)
  const firstId = projects[0].id
  const lastId = projects[projects.length - 1].id

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <div className="container">
        <motion.h2
          id="projects-heading"
          ref={titleRef}
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {scrambledTitle}
        </motion.h2>

        <div className={styles.carouselViewport}>
          {windowStart === 0 && (
            <button
              type="button"
              className={`${styles.arrowBubble} ${styles.arrowRight}`}
              onClick={() => setWindowStart(1)}
              aria-label="Show next project"
            >
              ›
            </button>
          )}
          {windowStart === 1 && (
            <button
              type="button"
              className={`${styles.arrowBubble} ${styles.arrowLeft}`}
              onClick={() => setWindowStart(0)}
              aria-label="Show previous project"
            >
              ‹
            </button>
          )}

          <div className={styles.projectsGrid}>
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((project, index) => {
                const isFirst = project.id === firstId
                const isLast = project.id === lastId

                let edgeProps = {}
                if (isFirst) {
                  // Prior Auth: slides in from the left when returning,
                  // slides out to the left when moving to the next pair.
                  edgeProps = {
                    initial: { x: '-30%', opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    exit: { x: '-30%', opacity: 0 },
                  }
                } else if (isLast) {
                  // Brain Tumor: slides in from the right when advancing,
                  // fades out in place when moving back.
                  edgeProps = {
                    initial: { x: '30%', opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    exit: { opacity: 0 },
                  }
                }

                return (
                  <motion.div
                    key={project.id}
                    layout
                    {...edgeProps}
                    transition={SLIDE_TRANSITION}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
