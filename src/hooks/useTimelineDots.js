import { useEffect } from 'react'

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

function rgbToHex(r, g, b) {
  const toHex = x => x.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

const START_COLOR = '#667eea'
const END_COLOR = '#764ba2'

export function useTimelineDots(timelineRef, itemsRef) {
  useEffect(() => {
    function updateDotColors() {
      const timeline = timelineRef.current
      if (!timeline) return
      const rect = timeline.getBoundingClientRect()
      const items = itemsRef.current
      if (!items) return
      items.forEach(item => {
        if (!item) return
        const itemRect = item.getBoundingClientRect()
        const itemCenter = itemRect.top + itemRect.height / 2
        const ratio = (itemCenter - rect.top) / rect.height
        const t = Math.min(Math.max(ratio, 0), 1)
        const c1 = hexToRgb(START_COLOR)
        const c2 = hexToRgb(END_COLOR)
        const r = Math.round(lerp(c1.r, c2.r, t))
        const g = Math.round(lerp(c1.g, c2.g, t))
        const b = Math.round(lerp(c1.b, c2.b, t))
        item.style.setProperty('--dot-color', rgbToHex(r, g, b))
      })
    }

    updateDotColors()
    window.addEventListener('scroll', updateDotColors)
    window.addEventListener('resize', updateDotColors)
    return () => {
      window.removeEventListener('scroll', updateDotColors)
      window.removeEventListener('resize', updateDotColors)
    }
  }, [timelineRef, itemsRef])
}
