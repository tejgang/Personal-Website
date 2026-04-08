import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

const BTN_LABELS = {
  idle: 'Send Message',
  sending: 'Sending...',
  sent: 'Sent! 🚀',
  error: 'Error – Try Again',
}

export default function ContactForm({ formRef, nameInputRef }) {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    const form = e.target
    const templateParams = {
      from_name: form.name.value,
      from_email: form.email.value,
      subject: form.subject.value,
      message: form.message.value,
      to_email: 'tejgangupantula@gmail.com',
    }

    try {
      await emailjs.send(
        'service_ckxe5g7',
        'template_atvc8n3',
        templateParams,
        'vgRr7rMZBv_4OI6KH',
      )
      setStatus('sent')
      setTimeout(() => {
        form.reset()
        setStatus('idle')
      }, 2000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit} ref={formRef}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" ref={nameInputRef} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'sending'}
      >
        {BTN_LABELS[status]}
      </button>
    </form>
  )
}
