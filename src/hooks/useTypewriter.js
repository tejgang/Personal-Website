import { useState, useEffect } from 'react'

export function useTypewriter(text, startDelay = 2000, speed = 100) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          setTimeout(() => setDone(true), 1000)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(startTimer)
  }, [text, startDelay, speed])

  return { displayed, done }
}
