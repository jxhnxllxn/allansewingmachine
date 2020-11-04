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
import { ReactComponent as MenuIcon } from '../assets/icons/menu.svg'

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
                name: 'Tech Support',
                linkTo: '/services'
            },
            {
                name: 'About Us',
                linkTo: '/about'
            },
        ],
        [

        ]
        
    ]
    

    const header = (
        <header className='header'>
            <nav>
                <div className="logo">
                    <Link className="logo_container" to="/">
                        <SewingIcon className='logo'/>
                        <div className="brand">
                            <span className='allan'>Allan</span>
                            <span className='machine'>Sewing Machines</span>
                        </div>
                    </Link>
                </div>

                <div className="links">
                    <ul>
                        {
                            links[0].map((x,i) => (                            
                                <li key={i}>
                                    <NavLink exact to={x.linkTo} >{x.name}</NavLink>
                                </li>
                            ))
                        }
                        {
                            !isAuthenticated && 
                            <li>
                                <NavLink to='/signin'>Sign in</NavLink>
                            </li>
                        }
                    </ul>
                    <div className="dropdowns">
                    
                        <div>
                            <SearchIcon />
                        </div>
                        <div>
                        {
                            isAuthenticated && 
                            <>
                                <div ref={personIconRef}>
                                    <PersonIcon onClick={handleToggleNavSetting}/>
                                </div>
                                <SettingDropdwon 
                                    handleToggleNavSetting={handleToggleNavSetting}
                                    personMenuRef={personMenuRef}
                                />
                            </>
                        }
                        </div>

                        <div>
                            <div ref={cartIconRef} onClick={handleToggleNavCart}>
                                <ShoppingBagIcon/>
                                <span className='item_count'>{itemCount > 0 ? itemCount : null}</span>
                            </div> 
                            <CartDropdown 
                                handleToggleNavCart={handleToggleNavCart}
                                cartMenuRef={cartMenuRef}
                            />
                        </div>

                        <div>
                            <MenuIcon />
                        </div>

                    </div>
                </div>
            </nav>

               
        </header>
        )

    return(
    <>
        {isAdmin && isAuthenticated && !loading ? null:(header)}
    </>
    );
}


export default Header;