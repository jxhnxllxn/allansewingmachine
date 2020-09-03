import React, { Fragment } from 'react';
import "./header.scss";
import { NavLink, Link} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/auth/auth-action"
// import { selectCurrentUser } from '../../redux/user/user.selectors';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

const Header = ({isAuthenticated,logout,hidden,isAdmin,loading}) => {
    const header = (
        <div className="header">
            <NavLink className="logo-conatainer" to="/" >
                    <div className="logo"></div>
            </NavLink>
    
            <div className="options">                
                    <Fragment>
                        <NavLink className="option" to="/shop" >
                            Shop
                        </NavLink>
                        <NavLink className="option" to="/branch" >
                            Branch & Services
                        </NavLink>
                        <NavLink className="option" to="/contact" >
                            Contact
                        </NavLink>
                    </Fragment>
                
                {isAuthenticated ? 
                    (<Link onClick={logout} to='/' className="option">Sign out</Link>):
                    (<NavLink className="option" to='/signin'>Sign in</NavLink>)}
                <CartIcon />

            </div>
            {hidden ? null : 
            <CartDropdown />}
        </div>
    )
    return(
        <Fragment>
            {isAdmin === 'admin' && isAuthenticated && !loading ? '':(header)}
        </Fragment>
    );
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isAdmin: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    loading: PropTypes.bool,
}

const mapStateProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated,
    hidden:state.cart.hidden,
    isAdmin:state.auth.isAdmin,
    loading:state.auth.loading
});

export default connect(mapStateProps,{logout})(Header);
