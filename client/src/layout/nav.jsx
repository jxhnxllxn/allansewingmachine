import React, { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCartItemsCount } from '../redux/cart/cart-selectors'
import { toggleSideNavIcon } from '../redux/ui/ui-actions'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import useSidenavAnimation from '../utils/animations/useSidenavAnimation'
import useOutsideClick from '../utils/hooks/useOutsideClick'

import SideNav from './sidenav'
import NavLinks from '../components/navlinks'
import toggleScrollbar from '../utils/helper/toggleScrollbar'

const Nav = () => {
  const dispatch = useDispatch()
  const sidenavRef = useRef()
  const history = useHistory()
  const itemCount = useSelector((state) => selectCartItemsCount(state))
  const sideNavIconIsOpen = useSelector(({ ui }) => ui.sideNavIconIsOpen)
  const isAuthenticated = useSelector(
    ({ user: { isAuthenticated } }) => isAuthenticated
  )

  const [activeMenuIcons, setActiveMenuIcons] = useState('')

  const tl = gsap.timeline()
  const [tl__sidenav] = useState(tl)
  useSidenavAnimation(tl__sidenav)

  const toggleSideNav = (x) => {
    toggleScrollbar(sideNavIconIsOpen)
    if (!sideNavIconIsOpen) {
      setActiveMenuIcons(x)
    }
    dispatch(toggleSideNavIcon())
    tl__sidenav.reversed(sideNavIconIsOpen)
  }

  const togglePersonNav = () => {
    if (isAuthenticated) {
      toggleSideNav('person')
    } else {
      history.push('/login')
    }
  }

  useOutsideClick(
    [sidenavRef],
    [sideNavIconIsOpen],
    () => sideNavIconIsOpen && toggleSideNav()
  )

  const links = [
    [
      {
        name: 'Home',
        linkTo: '/',
        exact: true,
      },
      {
        name: 'Shop',
        linkTo: '/shop',
        exact: false,
      },
      {
        name: 'Services',
        linkTo: '/services',
        exact: true,
      },
      {
        name: 'About',
        linkTo: '/about',
        exact: true,
      },
      {
        name: 'Contact',
        linkTo: '/contact',
        exact: true,
      },
    ],
  ]

  return (
    <>
      <nav className='nav'>
        <div className='nav__top'>
          <div className='nav__logo'>
            <span className='allan'>Allan</span>
            <span>Sewing Machines</span>
          </div>
          <div id='toggleSideNav'></div>
          <div className='nav__listTop'>
            <ul>
              <li onClick={() => toggleSideNav('search')}>
                <div className='icon icon--search'>
                  <SearchIcon />
                </div>
              </li>
              <li onClick={() => togglePersonNav()}>
                <div className='icon icon--person'>
                  <PersonIcon />
                </div>
              </li>
              <li onClick={() => toggleSideNav('cart')}>
                <div className='icon icon--bag'>
                  <ShoppingBagIcon />
                  <span className='icon__count'>
                    {itemCount > 0 && itemCount}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className='nav__bottom'>
          <div className='nav__listBottom'>
            <NavLinks links={links[0]} />
          </div>
        </div>
      </nav>
      <SideNav sidenavRef={sidenavRef} activeMenuIcons={activeMenuIcons} />
    </>
  )
}

export default Nav
