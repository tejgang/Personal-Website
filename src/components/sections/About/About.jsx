// src/components/sections/About/About.jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTypewriter } from '../../../hooks/useTypewriter'
import { useScramble } from '../../../hooks/useScramble'
import styles from './About.module.css'

export default function About() {
  const sectionRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const scrambledTitle = useScramble('About Me', sectionInView)
  const { displayed: nameDisplayed, done: nameDone } = useTypewriter('Tej Gangupantula', 500, 80)

  const [photoIdx, setPhotoIdx] = useState(0)
  const photos = [
    { src: '/images/IMG_8674.png', alt: 'Tej Gangupantula' },
    { src: '/images/cat-gray.jpg', alt: 'Billu' },
    { src: '/images/cat-tabby.jpg', alt: 'Sheru' },
  ]
  function prevPhoto() { setPhotoIdx(i => (i - 1 + photos.length) % photos.length) }
  function nextPhoto() { setPhotoIdx(i => (i + 1) % photos.length) }

  return (
    <section id="about" className={styles.hero} ref={sectionRef}>
      <div className="container">
        <div className={styles.heroContent}>

          {/* Left: text */}
          <motion.div
            className={styles.aboutText}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <p className={styles.label}>Hi, I'm</p>

            <h1 className={styles.name}>
              <span className={styles.nameSolid}>
                {nameDisplayed}{!nameDone && <span className={styles.cursor}>|</span>}
              </span>
            </h1>

            <div className={styles.divider} />

            <p className={styles.sectionLabel} aria-hidden="true">{scrambledTitle}</p>

            <div className={styles.aboutDescription}>
              <p>
                Hello! I'm Tej, and I am currently pursuing my B.S. in Statistics and Data Science
                at UC Santa Barbara. I am particularly interested in machine learning, data science,
                and artificial intelligence.
              </p>
              <p>
                My path into AI started with curiosity about how data reveals patterns and drives
                decisions. I'm currently an AI Engineer intern at Agentman, building healthcare
                automation systems using agentic AI, GCP, and LLM-powered tools. I've also built
                clinical NLP pipelines and predictive models that automated workflows and gave
                clinicians data-driven insights.
              </p>
              <p>
                When I'm not building or learning, I enjoy cooking for myself and others, traveling,
                spending quality time with loved ones, and playing with my two cats, Billu and Sheru.
              </p>
            </div>

            <div className={styles.actions}>
              <a
                href="/documents/Gangupantula_Tej_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resumeBtn}
              >
                View Resume
              </a>
              <a
                href="https://github.com/tejgang"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubBtn}
              >
                GitHub ↗
              </a>
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            className={styles.imageColumn}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className={styles.photoWrapper}>
              <div className={styles.carouselWrapper}>
                <img
                  key={photoIdx}
                  src={photos[photoIdx].src}
                  alt={photos[photoIdx].alt}
                  className={styles.profileImg}
                  loading="eager"
                  width={400}
                  height={550}
                />
              </div>
              <div className={styles.carouselControls}>
                <button className={styles.carouselBtn} onClick={prevPhoto} aria-label="Previous photo">‹</button>
                {photos.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.carouselDot} ${i === photoIdx ? styles.activeDot : ''}`}
                    onClick={() => setPhotoIdx(i)}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
                <button className={styles.carouselBtn} onClick={nextPhoto} aria-label="Next photo">›</button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
