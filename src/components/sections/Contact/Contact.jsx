// src/components/sections/Contact/Contact.jsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useScramble } from '../../../hooks/useScramble'
import styles from './Contact.module.css'

export default function Contact() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const scrambledTitle = useScramble('Contact', titleInView)

  const [email, setEmail] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const timerRef = useRef(null)

  useEffect(() => {
    const user = String.fromCharCode(116,101,106,103,97,110,103,117,112,97,110,116,117,108,97)
    const domain = String.fromCharCode(103,109,97,105,108)
    const tld = String.fromCharCode(99,111,109)
    setEmail(`${user}@${domain}.${tld}`)
    return () => clearTimeout(timerRef.current)
  }, [])

  function resetStatusAfterDelay() {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setStatus('idle'), 3000)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch('https://formspree.io/f/mjgpdlzy', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('sent')
        e.target.reset()
        resetStatusAfterDelay()
      } else {
        setStatus('error')
        resetStatusAfterDelay()
      }
    } catch {
      setStatus('error')
      resetStatusAfterDelay()
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <h2 ref={titleRef} className={styles.sectionHeader}>
          {scrambledTitle}
        </h2>

        <motion.div
          className={styles.contactContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Info cards — single row */}
          <div className={styles.contactCards}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <img src="/images/gmail-new.png" alt="Email" width={28} height={28} />
              </div>
              <div>
                <strong>Email</strong>
                <span>{email}</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon} aria-hidden="true">📍</div>
              <div>
                <strong>Location</strong>
                <span>Santa Barbara, CA</span>
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
                  <img src="/images/icone-github-bleu.png" alt="GitHub" width={36} height={36} />
                </div>
                <div>
                  <strong>GitHub</strong>
                  <span>github.com/tejgang</span>
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
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <strong>LinkedIn</strong>
                  <span>linkedin.com/in/tejgangupantula</span>
                </div>
              </div>
            </a>
          </div>

          {/* Get in Touch toggle — centered below cards */}
          <div className={styles.toggleBtnWrapper}>
            <button
              className={styles.toggleBtn}
              onClick={() => setFormOpen(prev => !prev)}
              aria-expanded={formOpen}
              disabled={status === 'sending'}
            >
              {formOpen ? 'Close ✕' : 'Get in Touch'}
            </button>
          </div>

          {/* Expandable form */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                className={styles.formWrapper}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <form className={styles.form} onSubmit={handleSubmit}>
                  {/* Honeypot for spam bots */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />
                  <div className={styles.formRow}>
                    <label htmlFor="contact-name" className={styles.formLabel}>Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      className={styles.formInput}
                      placeholder="Your name"
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor="contact-email" className={styles.formLabel}>Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      className={styles.formInput}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className={styles.formRow}>
                    <label htmlFor="contact-message" className={styles.formLabel}>Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      className={styles.formTextarea}
                      placeholder="What's on your mind?"
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={status === 'sending'}
                  >
                    {status === 'idle' && 'Send Message'}
                    {status === 'sending' && 'Sending...'}
                    {status === 'sent' && 'Sent ✓'}
                    {status === 'error' && 'Error — try again'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
