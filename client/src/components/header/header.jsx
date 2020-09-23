import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink} from 'react-router-dom';

import { selectCartHidden, selectSettingHidden } from '../../redux/cart/cart-selectors';
import { selectIsAdmin, selectIsAuth,selectIsLoading } from "../../redux/auth/auth-selector";
import { toggleSettingHidden } from "../../redux/cart/cart-action";

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
    
    const header = (
        <div className="header page_container">
                    <div className="logo"></div>
    
            <div className="options">                
                    <Fragment>
                        <NavLink exact className="option" to="/" >
                            Home
                        </NavLink>
                        <NavLink className="option" to="/shop" >
                            Shop
                        </NavLink>
                        <NavLink className="option" to="/branch-services" >
                            Branch & Services
                        </NavLink> 
                        {/* <NavLink className="option" to="/contact" >
                            Contact
                        </NavLink> */}
                    </Fragment>

                    <CartIcon />
                   
                   

                {isAuthenticated? 
                    (
                        
                        <Fragment>
                            <div className="option" onClick={ () => dispatch(toggleSettingHidden())}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                                {/* <FontAwesomeIcon icon={faUser} className="icon" onClick={ () => dispatch(toggleSettingHidden())}/> */}
                            </div>
                        </Fragment>
                    ):
                    (<NavLink className="option" to='/signin'>Sign in</NavLink>)}
                
            </div>
            {
                cartDropdown ? 
                null
                :<CartDropdown />
            }
            {
                isAuthenticated && settingDropdown ? 
                null
                :<SettingDropdwon />
                
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