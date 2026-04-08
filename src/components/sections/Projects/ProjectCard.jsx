import { memo } from 'react'
import { motion } from 'framer-motion'
import styles from './Projects.module.css'

const ProjectCard = memo(function ProjectCard({ project, index }) {
  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
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
        <div className={styles.projectTech}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.techTag}>{tag}</span>
          ))}
        </div>
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
  )
})

export default ProjectCard
