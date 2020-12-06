import React, { lazy, Suspense } from 'react'
import SideNavLayout from './sidenav-layout'
import Loading from '../components/loading'
import SideNavSetting from '../components/sidenav-setting'
import SideNavCart from '../components/sidenav-cart'
const SignIn = lazy(() => import('../pages/login'))

const Sidenav = ({ sidenavRef, activeMenuIcons }) => {
  const components = (x) => {
    switch (x) {
      case 'search':
        return (
          <Suspense fallback={<Loading />}>
            <SignIn />
          </Suspense>
        )
      case 'cart':
        return (
          <Suspense fallback={<Loading />}>
            <SideNavCart />
          </Suspense>
        )
      case 'person':
        return (
          <Suspense fallback={<Loading />}>
            <SideNavSetting />
          </Suspense>
        )
      default:
        return null
    }
  }

  return (
    <SideNavLayout>
      <div className='sidenav__main' ref={sidenavRef}>
        {components(activeMenuIcons)}
      </div>
    </SideNavLayout>
  )
}

export default Sidenav
