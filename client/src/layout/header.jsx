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
import toggleScrollbar from '../utils/helper/toggleScrollbar'

import useCartToggleAnimation from '../utils/animations/useCartToggleAnimation'
import useNavScrollAnimation from '../utils/animations/useScrollAnimation'
import Nav from './nav'
import NavIcons from './nav-menu-icons'


const Header = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => selectIsAdmin(state));
    const isAuthenticated = useSelector(state => selectIsAuth(state))
    const loading = useSelector(state => selectIsLoading(state))
    const isNavMenuIconsHidden = useSelector(state => selectNavMenuIconsHidden(state))
    const itemCount = useSelector(state => selectCartItemsCount(state));


    // const cart_tl = gsap.timeline()
    // const [cartTl] = useState(cart_tl)
    // useCartToggleAnimation(cartTl)

    const header_tl = gsap.timeline()
    const [headerTl] = useState(header_tl)
    useNavScrollAnimation(headerTl)
    
    const headerRef = useRef()
    const searchIconRef = useRef()
    const personIconRef = useRef()
    const cartIconRef = useRef()
    const menuIconsRef = useRef()    

    const [activeMenuIcons, setActiveMenuIcons] = useState('')

    const handleToggleMenuIcons = (x) => {
        setActiveMenuIcons(x)
        dispatch(toggleMenuIcons())
        // cartTl.reversed(isNavMenuIconsHidden)
        toggleScrollbar(isNavMenuIconsHidden)
    }


    const scrollFunction = () => {
        if (window.scrollY > 50 ) {
            headerTl.reversed(true)
        }else{
            headerTl.reversed(false)
        }
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
            <div className="menu_top">
                    <p className='promotionMsg'>Free Shipping For Batangas Area</p>
                    <ul>
                        <li>
                            <Link to='/terms-and-conditions'>terms & conditions</Link>
                        </li>
                        <li>
                            <Link to='/privacy-policy'>privacy policy</Link>
                        </li>
                        <li className='icons' >

                            <div className="icon search" ref={searchIconRef} onClick={() => handleToggleMenuIcons('search')}>
                                <SearchIcon />
                            </div>  

                            <div className="icon person" ref={personIconRef} onClick={() => handleToggleMenuIcons('person')}>
                                <PersonIcon />
                            </div>

                            <div className="icon bag" ref={cartIconRef} onClick={() => handleToggleMenuIcons('cart')}>
                                <div className="bag_icon">
                                    <ShoppingBagIcon/>
                                    <span className='item_count'>{itemCount > 0 && itemCount}</span>
                                </div> 
                            </div>

                        </li>
                    </ul>

                    <NavIcons
                        handleToggleMenuIcons={handleToggleMenuIcons}
                        menuIconsRef={menuIconsRef}
                        activeMenuIcons={activeMenuIcons}
                    />

                </div>
               
                {isAdmin && isAuthenticated && !loading ? null:(<Nav />)}
                
        </header>
    );
}

export default Header;