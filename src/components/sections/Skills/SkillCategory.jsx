// src/components/sections/Skills/SkillCategory.jsx
import { memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Skills.module.css'

const SIZE = 360        // container px
const CENTER = SIZE / 2  // 180
const RADIUS = 130       // distance from center to skill bubble centers
const CENTER_BUBBLE_R = 40  // half of 80px center bubble
const SKILL_BUBBLE_R = 24   // half of 48px skill bubble

function getPosition(index, total) {
  const angle = (2 * Math.PI / total) * index - Math.PI / 2
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: CENTER + cos * RADIUS,
    y: CENTER + sin * RADIUS,
    // spoke starts at edge of center bubble, ends at edge of skill bubble
    startX: CENTER + cos * CENTER_BUBBLE_R,
    startY: CENTER + sin * CENTER_BUBBLE_R,
    endX: CENTER + cos * (RADIUS - SKILL_BUBBLE_R),
    endY: CENTER + sin * (RADIUS - SKILL_BUBBLE_R),
  }
}

const SkillWeb = memo(function SkillWeb({ category, index: categoryIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className={styles.webWrapper}>
      {/* SVG lines layer */}
      <svg
        className={styles.webSvg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width={SIZE}
        height={SIZE}
        aria-hidden="true"
      >
        {category.skills.map((skill, i) => {
          const { startX, startY, endX, endY } = getPosition(i, category.skills.length)
          return (
            <motion.path
              key={skill.name}
              d={`M ${startX} ${startY} L ${endX} ${endY}`}
              stroke="rgba(14, 165, 233, 0.25)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { duration: 0.5, delay: categoryIndex * 0.15 + 0.3 + i * 0.06 },
                opacity: { duration: 0.2, delay: categoryIndex * 0.15 + 0.3 + i * 0.06 },
              }}
            />
          )
        })}
      </svg>

      {/* Center bubble — CSS hover only, no bounce */}
      <motion.div
        className={styles.centerBubble}
        style={{ left: CENTER, top: CENTER, x: '-50%', y: '-50%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: categoryIndex * 0.15 }}
      >
        <span className={styles.centerIcon}>{category.icon}</span>
        <span className={styles.centerLabel}>{category.title}</span>
      </motion.div>

      {/* Skill bubbles — bouncy hover */}
      {category.skills.map((skill, i) => {
        const { x, y } = getPosition(i, category.skills.length)

        return (
          <motion.div
            key={skill.name}
            className={styles.skillBubble}
            style={{ left: x, top: y, x: '-50%', y: '-50%' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.35,
              delay: categoryIndex * 0.15 + 0.6 + i * 0.07,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              scale: 1.22,
              transition: { type: 'spring', stiffness: 500, damping: 9 },
            }}
          >
            <img src={skill.img} alt={skill.name} loading="lazy" className={styles.skillIcon} />
            <span className={styles.skillLabel}>{skill.name}</span>
          </motion.div>
        )
      })}
    </div>
  )
})

export default SkillWeb
