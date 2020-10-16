import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink} from 'react-router-dom';

import { selectCartHidden, selectSettingHidden } from '../../redux/ui/ui-selector';
import { selectIsAdmin, selectIsAuth,selectIsLoading } from "../../redux/auth/auth-selector";
import { toggleSettingHidden } from "../../redux/ui/ui-actions";
import { ReactComponent as Logo } from '../../assets/sewing.svg';

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import SettingDropdwon from "../../components/setting-dropdown/setting-dropdown";

import "./header.scss";

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

    const header = (
        <div className="header page_container">
            <Link className="logo_container" to="/">
                <Logo className='logo'/>
                <span>Allan Sewing Machine</span>
            </Link>

            <div className="options">             
            <Fragment>
                <NavLink exact className="option" to="/" >
                Home
                </NavLink>
                <NavLink className="option" to="/shop" >
                Shop
                </NavLink>
            </Fragment>
            <CartIcon />

            {
                isAuthenticated ? 
                (<Fragment>
                <div className="option menu" onClick={handleToggleSettingHidden}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                </div>
                </Fragment>)
                :
                (<NavLink className="option" to='/signin'>Sign in</NavLink>)
            }

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
    <Fragment>
        {isAdmin && isAuthenticated && !loading ? null:(header)}
    </Fragment>
    );
}


export default Header;