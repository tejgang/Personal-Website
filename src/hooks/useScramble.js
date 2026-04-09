// src/hooks/useScramble.js
import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'

export function useScramble(text, trigger) {
  const [displayed, setDisplayed] = useState(text)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!trigger || text.length === 0) {
      setDisplayed(text)
      return
    }

    let settled = 0
    const msPerChar = Math.min(Math.floor(800 / text.length), 80)

    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < settled) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )
      settled++
      if (settled >= text.length) {
        setDisplayed(text)
        clearInterval(intervalRef.current)
      }
    }, msPerChar)

    return () => clearInterval(intervalRef.current)
  }, [trigger, text])

  return displayed
}
