import { useState, useEffect } from 'react'

export function useTypewriter(text, startDelay = 2000, speed = 100) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Skip animation for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text)
      setDone(true)
      return
    }

    let interval
    let doneTimer

    const startTimer = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
        } else {
          clearInterval(interval)
          doneTimer = setTimeout(() => setDone(true), 1000)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      clearInterval(interval)
      clearTimeout(doneTimer)
    }
  }, [text, startDelay, speed])

  return { displayed, done }
}
