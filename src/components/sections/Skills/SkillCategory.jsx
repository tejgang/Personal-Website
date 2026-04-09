// src/components/sections/Skills/SkillCategory.jsx
import { memo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Skills.module.css'

const SIZE = 420        // container px
const CENTER = SIZE / 2  // 210
const RADIUS = 155       // distance from center to skill bubble centers
const CENTER_BUBBLE_R = 48  // half of 96px center bubble
const SKILL_BUBBLE_R = 24   // half of 48px skill bubble

function getPosition(index, total) {
  const angle = (2 * Math.PI / total) * index - Math.PI / 2
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  return {
    x: CENTER + cos * RADIUS,
    y: CENTER + sin * RADIUS,
    startX: CENTER + cos * CENTER_BUBBLE_R,
    startY: CENTER + sin * CENTER_BUBBLE_R,
    endX: CENTER + cos * (RADIUS - SKILL_BUBBLE_R),
    endY: CENTER + sin * (RADIUS - SKILL_BUBBLE_R),
  }
}

// Separate component so each bubble tracks its own entry-complete state
function SkillBubble({ skill, x, y, delay, inView }) {
  const [entryDone, setEntryDone] = useState(false)

  return (
    <motion.div
      className={styles.skillBubble}
      style={{ left: x, top: y, x: '-50%', y: '-50%' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={entryDone
        ? { type: 'spring', stiffness: 600, damping: 30 }
        : { delay, type: 'spring', stiffness: 260, damping: 20, duration: 0.35 }
      }
      onAnimationComplete={() => { if (inView) setEntryDone(true) }}
      whileHover={{
        scale: 1.22,
        transition: { type: 'spring', stiffness: 500, damping: 9 },
      }}
    >
      <img src={skill.img} alt={skill.name} loading="lazy" className={styles.skillIcon} />
      <span className={styles.skillLabel}>{skill.name}</span>
    </motion.div>
  )
}

const SkillWeb = memo(function SkillWeb({ category, index: categoryIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [centerEntryDone, setCenterEntryDone] = useState(false)

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

      {/* Center bubble — bouncy hover */}
      <motion.div
        className={styles.centerBubble}
        style={{ left: CENTER, top: CENTER, x: '-50%', y: '-50%' }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={centerEntryDone
          ? { type: 'spring', stiffness: 600, damping: 30 }
          : { duration: 0.4, delay: categoryIndex * 0.15 }
        }
        onAnimationComplete={() => { if (inView) setCenterEntryDone(true) }}
        whileHover={{
          scale: 1.22,
          transition: { type: 'spring', stiffness: 500, damping: 9 },
        }}
      >
        <span className={styles.centerIcon}>{category.icon}</span>
        <span className={styles.centerLabel}>{category.title}</span>
      </motion.div>

      {/* Skill bubbles */}
      {category.skills.map((skill, i) => {
        const { x, y } = getPosition(i, category.skills.length)
        return (
          <SkillBubble
            key={skill.name}
            skill={skill}
            x={x}
            y={y}
            delay={categoryIndex * 0.15 + 0.6 + i * 0.07}
            inView={inView}
          />
        )
      })}
    </div>
  )
})

export default SkillWeb
