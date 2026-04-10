import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import { projects } from '../../../data/projects'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

export default function Projects() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Featured Projects', titleInView)

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
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
