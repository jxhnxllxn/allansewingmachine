import React, { useEffect, useState } from 'react'
import Nav from './nav'
import Footer from './footer'
import { useThrottle } from '../utils/hooks/useThrottle'
import Sidebar from './sidebar'

const Layout = ({ children }) => {
  let lastScrollTop = 0
  const [toggle, settoggle] = useState(false)

  const scrollFunction = () => {
    const st = document.body.scrollTop
    if (st > lastScrollTop) {
      settoggle(true)
    } else {
      settoggle(false)
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
      <Sidebar />
      <Nav toggle={toggle} />
      <main className='page'>{children}</main>
    </>
  )
}

export default Layout
