import { useEffect, useState } from 'react'
import { useTypewriter } from '../../../hooks/useTypewriter'
import styles from './About.module.css'

export default function About() {
  const [imageVisible, setImageVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const { displayed, done } = useTypewriter('Tej Gangupantula', 2000, 100)

  useEffect(() => {
    const imgTimer = setTimeout(() => setImageVisible(true), 300)
    const txtTimer = setTimeout(() => setTextVisible(true), 800)
    return () => {
      clearTimeout(imgTimer)
      clearTimeout(txtTimer)
    }
  }, [])

  return (
    <section id="about" className={styles.hero}>
      <div className={styles.overlay} />
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.aboutContent}>

            <div className={styles.leftColumn}>
              <div className={`${styles.aboutImage} ${imageVisible ? styles.bounceIn : ''}`}>
                <img src="/images/IMG_8674.png" alt="Tej Gangupantula" loading="eager" />
              </div>
            </div>

            <div className={`${styles.aboutText} ${textVisible ? styles.fadeIn : ''}`}>
              <div className={styles.aboutHeader}>
                <h2>About me</h2>
              </div>
              <div className={styles.aboutDescription}>
                <h1>
                  {displayed}
                  {!done && <span className={styles.cursor}>|</span>}
                </h1>
                <p className={styles.subtitle}>University of California, Santa Barbara</p>
                <p>
                  Hello! I'm Tej, and I am currently pursuing my B.S. in Statistics and Data Science
                  at UC Santa Barbara. I am particularly interested in machine learning, data science,
                  and artificial intelligence.
                </p>
                <p>
                  My path into AI started with curiosity about how data reveals patterns and drives
                  decisions. I've since applied this passion through internships where I built agentic
                  AI applications, cloud pipelines, and predictive models that automated healthcare
                  workflows and supported clinicians with data-driven insights.
                </p>
                <p>
                  When I'm not building or learning, I enjoy cooking for my family and friends,
                  working out, and spending quality time with my loved ones. I'm excited about AI's
                  potential to drive change, especially where it can improve health, equity, and access
                  through smart, data-driven tools.
                </p>
              </div>
              <div className={styles.resumeLink}>
                <a
                  href="/documents/Gangupantula_Tej_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resumeBtn}
                >
                  My Resume
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
