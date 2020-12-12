import React from 'react'
import ArrowTitle from '../assets/images/arrow-title-1.png'
import Footer from '../layout/footer'

const SideNavLayout = ({ children, sidenavRef }) => {
  const handleCloseNav = () => {
    document.getElementById('toggleSideNav').click()
  }
  return (
    <div ref={sidenavRef} className='sidenav'>
      <div className='sidenav__header'>
        <img src={ArrowTitle} alt='arrow-title' />
      </div>

      <div onClick={() => handleCloseNav()} className='sidenav__close'>
        &#10005;
      </div>

      <div className='sidenav__main'>{children}</div>

      <Footer />
    </div>
  )
}

export default SideNavLayout
