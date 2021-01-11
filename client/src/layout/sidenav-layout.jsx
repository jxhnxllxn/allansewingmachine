import React from 'react'
import { useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring'

const SideNavLayout = ({ children, sidenavRef }) => {
  const sideNavIsOpen = useSelector(({ ui }) => ui.sideNavIconIsOpen)

  const handleCloseNav = () => {
    document.getElementById('toggleSideNav').click()
  }

  const { x } = useSpring({ x: sideNavIsOpen ? 0 : -100 })

  return (
    <animated.div
      ref={sidenavRef}
      className='sidenav'
      style={{ transform: x.interpolate((x) => `translateX(${x * -1}%)`) }}
    >
      {console.log(sideNavIsOpen)}
      <div onClick={() => handleCloseNav()} className='sidenav__close'>
        &#10005;
      </div>
      <div className='sidenav__main'>{children}</div>
    </animated.div>
  )
}

export default SideNavLayout
