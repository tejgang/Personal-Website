import { memo } from 'react'
import { motion } from 'framer-motion'
import styles from './Skills.module.css'

const SkillCategory = memo(function SkillCategory({ category, index }) {
  return (
    <motion.div
      className={styles.skillCategory}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className={styles.skillIcon}>{category.icon}</div>
      <h3>{category.title}</h3>
      <div className={styles.skillBubbles}>
        {category.skills.map(skill => (
          <div key={skill.name} className={styles.skillBubble}>
            <img src={skill.img} alt={skill.name} loading="lazy" />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
})

export default SkillCategory
