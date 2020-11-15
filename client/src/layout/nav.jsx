import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useDispatch, useSelector } from 'react-redux'

import { Link, NavLink } from 'react-router-dom'
import { selectNavMenuHidden } from '../redux/ui/ui-selector'
import { toggleNavMenu } from "../redux/ui/ui-actions"
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg'

import useMenuToggleAnimation from '../utils/animations/useMenuToggleAnimation'
const Nav = () => {
    const dispatch = useDispatch()
    const links = [
        [
            {
                name: 'Home',
                linkTo: '/'
            },
            {
                name: 'Shop',
                linkTo: '/shop'
            },
            {
                name: 'Services',
                linkTo: '/services'
            },
            {
                name: 'About Us',
                linkTo: '/about'
            },
            {
                name: 'Contact',
                linkTo: '/contact'
            },
        ]
    ]

    
    
    const isNavMenuOpen = useSelector(state => selectNavMenuHidden(state))

    const menu_tl = gsap.timeline()
    const [menuTl] = useState(menu_tl)
    useMenuToggleAnimation(menuTl)

    const handleToggleNavMenu = () => {
        dispatch(toggleNavMenu())
        menuTl.reversed(isNavMenuOpen)
    }
      
    return (
        <nav>
            <div className='menu_bottom'>
                <div className="logo">
                    <Link className="logo_container" to="/">
                        <div className="brand">
                            <span className='brand__allan'>Allan</span>
                            <span className='brand__machine'>Sewing Machines</span>
                        </div>
                    </Link>
                </div>
                <ul className="list">
                    <div className='menuToggleWrapper' id='menu-toggler' onClick={handleToggleNavMenu}>
                        <MenuIcon className='icon_menu' />
                    </div>
                    <div className="menu_list">
                    {
                        links[0].map((x,i) => (                            
                            <li key={i}>
                                <NavLink exact to={x.linkTo} >{x.name}</NavLink>
                            </li>
                        ))
                    }
                    </div>
                    
                </ul>
            </div>
        </nav>
    )
}

export default Nav
