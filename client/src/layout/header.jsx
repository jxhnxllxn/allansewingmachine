import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink} from 'react-router-dom';

import { selectCartHidden, selectSettingHidden } from '../redux/ui/ui-selector';
import { selectIsAdmin, selectIsAuth,selectIsLoading } from "../redux/auth/auth-selector";
import { toggleSettingHidden } from "../redux/ui/ui-actions";
import { ReactComponent as Logo } from '../assets/sewing.svg';

import CartIcon from "../components/cart-icon";
import CartDropdown from "../components/cart-dropdown";
import SettingDropdwon from "../components/setting-dropdown";
import { useState } from 'react';

const Header = () => {
    const isAdmin = useSelector(state => selectIsAdmin(state));
    const isAuthenticated = useSelector(state => selectIsAuth(state));
    const loading = useSelector(state => selectIsLoading(state))
    const cartDropdown = useSelector(state => selectCartHidden(state))
    const settingDropdown = useSelector(state => selectSettingHidden(state))
    const dispatch = useDispatch()

    const handleToggleSettingHidden = () => {
        dispatch(toggleSettingHidden())
    }

    const [minimize, setMinimize] = useState(false)
    
    const scrollFunction = () => {
        if (window.scrollY > 80) {
            setMinimize(true)
        } else {
            setMinimize(false)
        }
    }


    useEffect(() => {
        window.addEventListener('scroll',scrollFunction);
        return () => {
            window.removeEventListener('scroll',scrollFunction);
        }
     }, [])

        
    const header = (
        <div className={`header page_container ${minimize ? 'minimize':''}`}>
            <Link className="logo_container" to="/">
                <Logo className='logo'/>
                <span className="brand">Allan Sewing Machine</span>
            </Link>

            <div className="options">             
            <>
                <NavLink exact className="option" to="/" >
                Home
                </NavLink>
                <NavLink className="option" to="/shop" >
                Shop
                </NavLink>
            </>

            {
                isAuthenticated ? 
                (<>
                <div className="option menu" onClick={handleToggleSettingHidden}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="1.8rem" height="1.8rem" viewBox="0 0 24 24" strokeWidth="1" stroke="#d9b95e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                </div>
                </>)
                :
                (<NavLink className="option" to='/signin'>Sign in</NavLink>)
            }
            
            <CartIcon />

            <div className="option menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="1.8rem" height="1.8rem" viewBox="0 0 24 24" strokeWidth="1" stroke="#d9b95e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </div>
            

            </div>

            {
                cartDropdown ? 
                    <CartDropdown />
                :null
            }
            {
                isAuthenticated && settingDropdown ? 
                    <SettingDropdwon />
                :null
            }
        </div>
        )

    return(
    <>
        {isAdmin && isAuthenticated && !loading ? null:(header)}
    </>
    );
}


export default Header;