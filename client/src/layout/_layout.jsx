import React, { useState, useEffect } from 'react'

import Header from './header'
import Footer from './footer'

import { gsap } from 'gsap'
import { useThrottle } from '../utils/hooks/useThrottle'
import useNavScrollAnimation from '../utils/animations/useScrollAnimation'

const Layout = ({ children }) => {
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
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header />
      <main className='page-wrapper'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
