import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useDispatch, useSelector } from 'react-redux'

import { Link, NavLink } from 'react-router-dom'

import { selectCartItemsCount } from '../redux/cart/cart-selectors'
import { toggleMenuIcons } from '../redux/ui/ui-actions'

import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'

import useSidenavAnimation from '../utils/animations/useSidenavAnimation'
import toggleScrollbar from '../utils/animations/toggleScrollbar'
import useOutsideClick from '../utils/hooks/useOutsideClick'

import SideNav from './sidenav'

const Nav = ({ isNavMenuIconsHidden, mTop }) => {
  const dispatch = useDispatch()
  const personIconRef = useRef()
  const cartIconRef = useRef()
  const sidenavRef = useRef()
  const searchIconRef = useRef()
  const menuIconRef = useRef()
  const itemCount = useSelector((state) => selectCartItemsCount(state))

  const [activeMenuIcons, setActiveMenuIcons] = useState('')

  const tl = gsap.timeline()
  const [tl__sidenav] = useState(tl)
  useSidenavAnimation(tl__sidenav, mTop)

  const toggleSideNav = (x) => {
    if (!isNavMenuIconsHidden) {
      setActiveMenuIcons(x)
    }
    dispatch(toggleMenuIcons())
    tl__sidenav.reversed(isNavMenuIconsHidden)
    toggleScrollbar(isNavMenuIconsHidden)
  }

  useOutsideClick(
    [sidenavRef, cartIconRef, personIconRef, searchIconRef],
    [isNavMenuIconsHidden],
    () => isNavMenuIconsHidden && toggleSideNav()
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
          <div></div>
          <div className='nav__listTop'>
            <ul>
              <li ref={searchIconRef} onClick={() => toggleSideNav('search')}>
                <div className='icon icon--search'>
                  <SearchIcon />
                </div>
              </li>
              <li ref={personIconRef} onClick={() => toggleSideNav('person')}>
                <div className='icon icon--person'>
                  <PersonIcon />
                </div>
              </li>
              <li ref={cartIconRef} onClick={() => toggleSideNav('cart')}>
                <div className='icon icon--bag' id='toggleIconCart'>
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
            <ul>
              {links[0].map((x, i) => (
                <li key={i}>
                  <NavLink exact={x.exact} to={x.linkTo}>
                    {x.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <SideNav sidenavRef={sidenavRef} activeMenuIcons={activeMenuIcons} />
    </>
  )
}

export default Nav
