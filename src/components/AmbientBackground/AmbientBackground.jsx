import styles from './AmbientBackground.module.css'

export default function AmbientBackground() {
  return (
    <div className={styles.ambientBg}>
      <div className={styles.heroBg} />
      <div className={styles.waveAnimation} />
      <div className={styles.floatingParticles} />
    </div>
  )
}
