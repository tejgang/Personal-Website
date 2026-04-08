import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import styles from './Contact.module.css'

export default function Contact() {
  const [email, setEmail] = useState('')
  const formRef = useRef(null)
  const nameInputRef = useRef(null)

  useEffect(() => {
    // Obfuscated to deter email scrapers
    const user = String.fromCharCode(116,101,106,103,97,110,103,117,112,97,110,116,117,108,97)
    const domain = String.fromCharCode(103,109,97,105,108)
    const tld = String.fromCharCode(99,111,109)
    setEmail(`${user}@${domain}.${tld}`)
  }, [])

  function handleEmailClick() {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        if (nameInputRef.current) nameInputRef.current.focus()
      }, 100)
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.overlay} />
      <div className="container">
        <motion.h2
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-50px' }}
        >
          Get In Touch
        </motion.h2>

        <div className={styles.contactContent}>
          {/* Contact info cards */}
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <div
              className={`${styles.contactItem} ${styles.emailClickable}`}
              onClick={handleEmailClick}
            >
              <div className={styles.contactIcon}>
                <img src="/images/gmail-new.png" alt="Email" style={{ width: 32, height: 32 }} />
              </div>
              <div>
                <strong>Email</strong><br />
                <span>{email}</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📍</div>
              <div>
                <strong>Location</strong><br />
                Santa Barbara, CA
              </div>
            </div>

            <a
              href="https://github.com/tejgang"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img src="/images/github.png" alt="GitHub" style={{ width: 40, height: 40 }} />
                </div>
                <div>
                  <strong>GitHub</strong><br />
                  github.com/tejgang
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/tejgangupantula/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <img
                    src="/images/linkedin-logo-linkedin-icon-transparent-free-png.png"
                    alt="LinkedIn"
                    style={{ width: 53, height: 53 }}
                  />
                </div>
                <div>
                  <strong>LinkedIn</strong><br />
                  linkedin.com/in/tejgangupantula
                </div>
              </div>
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <ContactForm formRef={formRef} nameInputRef={nameInputRef} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
