import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { Link} from 'react-router-dom'
import { selectNavMenuIconsHidden } from '../redux/ui/ui-selector'
import { selectCartItemsCount } from "../redux/cart/cart-selectors"
import { selectIsAdmin, selectIsAuth,selectIsLoading } from "../redux/auth/auth-selector"
import { toggleMenuIcons } from "../redux/ui/ui-actions"

import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'

import useOutsideClick from '../utils/hooks/useOutsideClick'
import {useThrottle} from '../utils/hooks/useThrottle'

import useNavScrollAnimation from '../utils/animations/useScrollAnimation'
import useSidenavAnimation from '../utils/animations/useSidenavAnimation'
import toggleScrollbar from '../utils/animations/toggleScrollbar'

import Nav from './nav'
import NavIcons from './sidenav'


const Header = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => selectIsAdmin(state));
    const isAuthenticated = useSelector(state => selectIsAuth(state))
    const loading = useSelector(state => selectIsLoading(state))
    const isNavMenuIconsHidden = useSelector(state => selectNavMenuIconsHidden(state))
    const itemCount = useSelector(state => selectCartItemsCount(state));

    const header_tl = gsap.timeline()
    const [headerTl] = useState(header_tl)
    useNavScrollAnimation(headerTl)
    
    const headerRef = useRef()
    const searchIconRef = useRef()
    const personIconRef = useRef()
    const cartIconRef = useRef()
    const menuIconsRef = useRef()    

    const [activeMenuIcons, setActiveMenuIcons] = useState('')

    
    const menu_tl = gsap.timeline()
    const [menuTl] = useState(menu_tl)
    useSidenavAnimation(menuTl)


    const handleToggleMenuIcons = (x) => {
        
        if(!isNavMenuIconsHidden){
            setActiveMenuIcons(x)
        }
        dispatch(toggleMenuIcons())
        menuTl.reversed(isNavMenuIconsHidden)
        toggleScrollbar(isNavMenuIconsHidden)
       
    }


    let lastScrollTop = 0;


    const scrollFunction = () => {
        const st = window.scrollY;
        if (st > lastScrollTop) {
            headerTl.reversed(true)
        }else{
            headerTl.reversed(false)
        }
        lastScrollTop = st;
    }
    
    const scrollThrottle = useThrottle(scrollFunction,50);

    useEffect(() => {
        window.addEventListener('scroll',scrollThrottle);
        return () => {
            window.removeEventListener('scroll',scrollThrottle);
        }
     }, [])


    useOutsideClick(
        [menuIconsRef,cartIconRef,personIconRef,searchIconRef],
        [isNavMenuIconsHidden],
        () => isNavMenuIconsHidden && handleToggleMenuIcons()
    )

    return(
    <header className='header' ref={headerRef}>
            <div className="header__top">
                    <p className='header__promotion'>Free Shipping For Batangas Area</p>
                    <ul className='header__link'>
                        <li>
                            <Link to='/terms-and-conditions'>terms & conditions</Link>
                        </li>
                        <li>
                            <Link to='/privacy-policy'>privacy policy</Link>
                        </li>
                        <li className='icons' >

                            <div className="icon icon--search" ref={searchIconRef} onClick={() => handleToggleMenuIcons('search')}>
                                <SearchIcon />
                            </div>  

                            <div className="icon icon--person" ref={personIconRef} onClick={() => handleToggleMenuIcons('person')}>
                                <PersonIcon />
                            </div>

                            <div className="icon icon--bag" id="toggleIconCart" ref={cartIconRef} onClick={() => handleToggleMenuIcons('cart')}>
                                <ShoppingBagIcon/>
                                <span className='icon__count'>{itemCount > 0 && itemCount}</span>
                            </div>

                        </li>
                    </ul>

                    <NavIcons
                        menuIconsRef={menuIconsRef}
                        activeMenuIcons={activeMenuIcons}
                    />

                </div>
               
                {isAdmin && isAuthenticated && !loading ? null:(<Nav />)}
                
        </header>
    );
}

export default Header;