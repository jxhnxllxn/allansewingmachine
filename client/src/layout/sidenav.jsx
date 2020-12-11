import React from 'react'
import SideNavLayout from './sidenav-layout'
import SideNavSetting from '../components/sidenav-setting'
import SideNavCart from '../components/sidenav-cart'
import SideNavSearch from '../components/sidenav-search'

const Sidenav = ({ sidenavRef, activeMenuIcons }) => {
  const components = (x) => {
    switch (x) {
      case 'search':
        return <SideNavSearch />
      case 'cart':
        return <SideNavCart />
      case 'person':
        return <SideNavSetting />
      default:
        return null
    }
  }

  return (
    <SideNavLayout sidenavRef={sidenavRef}>
      <div className='sidenav__main'>{components(activeMenuIcons)}</div>
    </SideNavLayout>
  )
}

export default Sidenav
