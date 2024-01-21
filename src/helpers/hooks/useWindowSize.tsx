import React, { useCallback, useState } from 'react'

const defaultIsMobile = true

export default function useWindowSize() {
  const isSSR = typeof window === 'undefined'

  const getMobileBreakpoint = useCallback(() => {
    if (isSSR) return 0
    return Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--mobile-breakpoint')
        .replace(/[a-z]|[A-Z]/g, '')
    )
  }, [isSSR])

  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? 1200 : window.innerWidth,
    height: isSSR ? 800 : window.innerHeight,
  })

  const [isMobile, setIsMobile] = useState(defaultIsMobile)

  React.useEffect(() => {
    const changeWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      setIsMobile(getMobileBreakpoint() > window.innerWidth)
    }

    window.addEventListener('resize', changeWindowSize)
    setIsMobile(getMobileBreakpoint() > window.innerWidth)

    return () => {
      window.removeEventListener('resize', changeWindowSize)
    }
  }, [getMobileBreakpoint])

  return { windowSize, isMobile }
}
