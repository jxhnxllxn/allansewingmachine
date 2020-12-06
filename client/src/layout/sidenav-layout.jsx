import React from 'react'
import ArrowTitle from '../assets/images/arrow-title-1.png'
import Footer from '../layout/footer'

const SideNavLayout = ({ children }) => {
  return (
    <div className='sidenav'>
      <div className='sidenav__header'>
        <img src={ArrowTitle} alt='arrow-title' />
      </div>

      {children}

      <Footer />
    </div>
  )
}

export default SideNavLayout
