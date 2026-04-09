// src/components/GridBackground/GridBackground.jsx
import { useEffect, useRef } from 'react'
import styles from './GridBackground.module.css'

export default function GridBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      el.style.setProperty('--shift-x', `${x}px`)
      el.style.setProperty('--shift-y', `${y}px`)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return <div ref={ref} className={styles.grid} aria-hidden="true" />
}
