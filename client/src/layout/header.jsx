import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gsap } from 'gsap'
import { Link} from 'react-router-dom'
import { selectCartHidden, selectSettingHidden } from '../redux/ui/ui-selector'
import { selectCartItemsCount } from "../redux/cart/cart-selectors"
import { selectIsAdmin, selectIsAuth,selectIsLoading } from "../redux/auth/auth-selector"
import { toggleNavSetting, toggleNavCart } from "../redux/ui/ui-actions"

import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'

import CartDropdown from "../components/cart-dropdown"
import SettingDropdwon from "../components/setting-dropdown"
import useOutsideClick from '../utils/hooks/useOutsideClick'
import {useThrottle} from '../utils/hooks/useThrottle'
import toggleScrollbar from '../utils/helper/toggleScrollbar'

import useCartToggleAnimation from '../utils/animations/useCartToggleAnimation'
import useNavScrollAnimation from '../utils/animations/useScrollAnimation'
import Nav from './nav'


const Header = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => selectIsAdmin(state));
    const isAuthenticated = useSelector(state => selectIsAuth(state))
    const loading = useSelector(state => selectIsLoading(state))
    const isCartHidden = useSelector(state => selectCartHidden(state))
    const itemCount = useSelector(state => selectCartItemsCount(state));


    const cart_tl = gsap.timeline()
    const [cartTl] = useState(cart_tl)
    useCartToggleAnimation(cartTl)

    const header_tl = gsap.timeline()
    const [headerTl] = useState(header_tl)
    useNavScrollAnimation(headerTl)
    
    const personIconRef = useRef()
    const personMenuRef = useRef()
    const cartIconRef = useRef()
    const cartMenuRef = useRef()
    
    const headerRef = useRef()


    const handleToggleNavSetting = () => {
        dispatch(toggleNavSetting())
    }

    const handleToggleNavCart = () => {
        dispatch(toggleNavCart())
        cartTl.reversed(isCartHidden)
        toggleScrollbar(isCartHidden)
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
        [cartMenuRef,cartIconRef],
        [isCartHidden],
        () => isCartHidden && handleToggleNavCart()
    )

    // useOutsideClick(
    //     [personMenuRef,personIconRef],
    //     [isSettignHidden],
    //     () => isSettignHidden && handleToggleNavSetting()
    // )
    

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

                        <li className='icons'>
                            <div className="icon search">
                                <SearchIcon />
                            </div>  

                            <div className="icon person">
                                <PersonIcon ref={personIconRef} onClick={handleToggleNavSetting}/>
                                {/* <SettingDropdwon 
                                    handleToggleNavSetting={handleToggleNavSetting}
                                    personMenuRef={personMenuRef}
                                /> */}
                            </div>

                            <div className="icon bag">
                                <div className="bag_icon" ref={cartIconRef} onClick={handleToggleNavCart}>
                                    <ShoppingBagIcon/>
                                    <span className='item_count'>{itemCount > 0 ? itemCount : null}</span>
                                </div> 

                                <CartDropdown 
                                    handleToggleNavCart={handleToggleNavCart}
                                    cartMenuRef={cartMenuRef}
                                />
                            </div>
                            
                        </li>
                    </ul>
                </div>
               
                {isAdmin && isAuthenticated && !loading ? null:(<Nav />)}
                
        </header>
    );
}

export default Header;