// src/components/sections/Skills/Skills.jsx
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import { skillCategories } from '../../../data/skills'
import SkillWeb from './SkillCategory'
import styles from './Skills.module.css'

export default function Skills() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Technical Skills', titleInView)

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <h2 ref={titleRef} className={styles.sectionHeader}>
          {scrambledTitle}
        </h2>
        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <SkillWeb key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
