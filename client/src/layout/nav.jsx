import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectCartItemsCount } from '../redux/cart/cart-selectors'
import { toggleSideNavIcon } from '../redux/ui/ui-actions'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import useOutsideClick from '../utils/hooks/useOutsideClick'

import SideNav from './sidenav'
import NavLinks from '../components/navlinks'

const Nav = () => {
  const dispatch = useDispatch()
  const sidenavRef = useRef()
  const cartRef = useRef()
  const personRef = useRef()
  const searchRef = useRef()
  const history = useHistory()
  const itemCount = useSelector((state) => selectCartItemsCount(state))
  const sideNavIconIsOpen = useSelector(({ ui }) => ui.sideNavIconIsOpen)
  const isAuthenticated = useSelector(
    ({ user: { isAuthenticated } }) => isAuthenticated
  )

  const [activeMenuIcons, setActiveMenuIcons] = useState('')

  const toggleSideNav = (x) => {
    if (!sideNavIconIsOpen) {
      setActiveMenuIcons(x)
    }
    dispatch(toggleSideNavIcon())
  }

  const togglePersonNav = () => {
    if (isAuthenticated) {
      toggleSideNav('person')
    } else {
      history.push('/login')
    }
  }

  useOutsideClick(
    [sidenavRef, cartRef, personRef, searchRef],
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
        name: 'Product',
        linkTo: '/product',
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
        <div className='nav__brand'>
          <span className='allan'>Allan</span>
        </div>
        <div className='nav__links'>
          <NavLinks links={links[0]} />
        </div>
        <div className='nav__icons'>
          <div id='toggleSideNav'></div>
          <ul>
            <li onClick={() => toggleSideNav('cart')} ref={cartRef}>
              <div className='icon icon--bag'>
                <ShoppingBagIcon />
                <span className='icon__count'>
                  {itemCount > 0 && itemCount}
                </span>
              </div>
            </li>
            <li onClick={() => toggleSideNav('search')} ref={searchRef}>
              <div className='icon icon--search'>
                <SearchIcon />
              </div>
            </li>
            <li onClick={() => togglePersonNav()} ref={personRef}>
              <div className='icon icon--person'>
                <PersonIcon />
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <SideNav sidenavRef={sidenavRef} activeMenuIcons={activeMenuIcons} />
    </>
  )
}

export default Nav
