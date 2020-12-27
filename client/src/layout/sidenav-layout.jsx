import React from 'react'

const SideNavLayout = ({ children, sidenavRef }) => {
  const handleCloseNav = () => {
    document.getElementById('toggleSideNav').click()
  }
  return (
    <div ref={sidenavRef} className='sidenav'>
      <div onClick={() => handleCloseNav()} className='sidenav__close'>
        &#10005;
      </div>

      <div className='sidenav__main'>{children}</div>
    </div>
  )
}

export default SideNavLayout
