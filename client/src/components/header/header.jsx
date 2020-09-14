import React, { Fragment } from 'react';
import "./header.scss";
import { NavLink, Link} from 'react-router-dom';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { logout } from "../../redux/auth/auth-action";
import { useDispatch, useSelector } from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUserSecret} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading)
    const hidden = useSelector(state => state.cart.hidden)
    const dispatch = useDispatch();

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
                        
                        <NavLink className="option" to="/contact" >
                            Contact
                        </NavLink>
                    </Fragment>
                
                {isAuthenticated ? 
                    (
                        <Fragment>
                        <Link onClick={() => dispatch(logout())} to='/' className="option">Sign out</Link>
                            {isAdmin ? 
                                <Link to="/user/info"><FontAwesomeIcon icon={faUser} className="icon" /></Link>
                                :
                                <Link to="/user/info"><FontAwesomeIcon icon={faUserSecret} className="icon" /></Link>
                            }
                        </Fragment>
                    ):
                    (<NavLink className="option" to='/signin'>Sign in</NavLink>)}
                <CartIcon />

            </div>
            {hidden ? null : 
            <CartDropdown />}
        </div>
    )
    return(
        <Fragment>
            {isAdmin && isAuthenticated && !loading ? '':(header)}
        </Fragment>
    );
}


export default Header;