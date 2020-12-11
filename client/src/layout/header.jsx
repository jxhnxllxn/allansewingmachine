import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useThrottle } from '../utils/hooks/useThrottle'
import useNavScrollAnimation from '../utils/animations/useScrollAnimation'
import Nav from './nav'
const Header = () => {
  const headerRef = useRef()
  const tl = gsap.timeline()
  const [tl__header] = useState(tl)
  useNavScrollAnimation(tl__header)

  let lastScrollTop = 0
  const scrollFunction = () => {
    const st = window.scrollY
    if (st > lastScrollTop) {
      tl__header.reversed(true)
    } else {
      tl__header.reversed(false)
    }

    lastScrollTop = st
  }

  const scrollThrottle = useThrottle(scrollFunction, 100)

  useEffect(() => {
    window.addEventListener('scroll', scrollThrottle)
    return () => {
      window.removeEventListener('scroll', scrollThrottle)
    }
  }, [])

  return (
    <header className='header' ref={headerRef}>
      <Nav />
    </header>
  )
}

export default Header
