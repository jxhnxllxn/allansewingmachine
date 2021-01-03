import React, { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import { useThrottle } from '../utils/hooks/useThrottle'

const Layout = ({ children }) => {
  let lastScrollTop = 0
  const scrollFunction = () => {
    const st = window.scrollY
    if (st > lastScrollTop) {
      console.log('up')
    } else {
      console.log('down')
    }

    lastScrollTop = st
  }

  const scrollThrottle = useThrottle(scrollFunction, 100)

  useEffect(() => {
    document.body.addEventListener('scroll', scrollThrottle)
    return () => {
      document.body.removeEventListener('scroll', scrollThrottle)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Header />
      <main className='page'>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
