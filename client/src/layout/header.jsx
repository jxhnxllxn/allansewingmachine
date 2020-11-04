import React, { useState, useRef } from 'react'

import { gsap } from 'gsap'

import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink} from 'react-router-dom'
import { selectCartHidden, selectSettingHidden } from '../redux/ui/ui-selector'
import { selectCartItemsCount } from "../redux/cart/cart-selectors"
import { selectIsAdmin, selectIsAuth,selectIsLoading } from "../redux/auth/auth-selector"

import { toggleNavSetting, toggleNavCart } from "../redux/ui/ui-actions"

import { ReactComponent as SewingIcon } from '../assets/icons/sewing.svg'
import { ReactComponent as PersonIcon } from '../assets/icons/person.svg'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { ReactComponent as ShoppingBagIcon } from '../assets/icons/shopping-bag.svg'

import CartDropdown from "../components/cart-dropdown";
import SettingDropdwon from "../components/setting-dropdown"
import useOutsideClick from '../utils/hooks/useOutsideClick'
import toggleScrollbar from '../utils/helper/toggleScrollbar'



import useMenuToggleAnimation from '../utils/animations/useMenuToggleAnimation'
import useCartToggleAnimation from '../utils/animations/useCartToggleAnimation'


const Header = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => selectIsAdmin(state));
    const isAuthenticated = useSelector(state => selectIsAuth(state))
    const loading = useSelector(state => selectIsLoading(state))
    const isCartHidden = useSelector(state => selectCartHidden(state))
    const isSettignHidden = useSelector(state => selectSettingHidden(state))
    const itemCount = useSelector(state => selectCartItemsCount(state));


    const cart_tl = gsap.timeline()
    const [cartTl] = useState(cart_tl)
    useCartToggleAnimation(cartTl)
    
    const personIconRef = useRef()
    const personMenuRef = useRef()
    const cartIconRef = useRef()
    const cartMenuRef = useRef()


    const handleToggleNavSetting = () => {
        dispatch(toggleNavSetting())
    }

    const handleToggleNavCart = () => {
        dispatch(toggleNavCart())
        cartTl.reversed(isCartHidden)
        toggleScrollbar(isCartHidden)
    }

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

    const links = [
        {
            name: 'Home',
            linkTo: '/'
        },
        {
            name: 'Shop',
            linkTo: '/shop'
        },
        {
            name: 'Service',
            linkTo: '/services'
        },
        {
            name: 'About',
            linkTo: '/about'
        },
    ]
    

    const header = (
        <header className='header container'>
            <Link className="logo_container" to="/">
                <SewingIcon className='logo'/>
                <div className="brand">
                    <span className='allan'>Allan</span>
                    <span className='machine'>Sewing Machines</span>
                </div>
            </Link>

            <div className="options">
                {
                    links.map(x => (
                        <NavLink exact className="option" to={x.linkTo} >{x.name}</NavLink>
                    ))
                }
                {
                    isAuthenticated ? 
                    <>
                    <div ref={personIconRef} className="option menu">
                        <PersonIcon onClick={handleToggleNavSetting}/>
                    </div>
                    <SettingDropdwon 
                        handleToggleNavSetting={handleToggleNavSetting}
                        personMenuRef={personMenuRef}
                    />
                    </>
                    :
                    <NavLink className="option menu" to='/signin'>Sign in</NavLink>
                }
                <div ref={cartIconRef} className='option menu' onClick={handleToggleNavCart}>
                    <ShoppingBagIcon/>
                    <span className='item_count'>{itemCount > 0 ? itemCount : null}</span>
                </div> 
                
                <CartDropdown 
                    handleToggleNavCart={handleToggleNavCart}
                    cartMenuRef={cartMenuRef}
                />

                <div className="option menu">
                    <SearchIcon />
                </div>
            </div>
        </header>
        )

    return(
    <>
        {isAdmin && isAuthenticated && !loading ? null:(header)}
    </>
    );
}


export default Header;