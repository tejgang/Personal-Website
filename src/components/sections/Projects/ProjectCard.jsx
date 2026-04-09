// src/components/sections/Projects/ProjectCard.jsx
import { memo, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Projects.module.css'

const ProjectCard = memo(function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    card.classList.remove(styles.cardResetting)
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.classList.add(styles.cardResetting)
      cardRef.current.style.transform =
        'perspective(1000px) rotateY(0deg) rotateX(0deg)'
    }
  }

  return (
    <div
      ref={cardRef}
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={styles.projectCard}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className={styles.projectImage}>
          <div className={styles.projectEmoji}>{project.emoji}</div>
          <img
            src={project.image}
            alt={project.title}
            className={styles.projectHoverImage}
            loading="lazy"
            width={350}
            height={200}
          />
        </div>

        <div className={styles.projectContent}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>

          <div className={styles.projectLinks}>
            {project.links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  )
})

export default ProjectCard
