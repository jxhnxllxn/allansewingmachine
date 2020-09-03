 import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import './sidebar.scss'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/auth/auth-action';

const sidebar = ({logout,isAdmin,isAuthenticated}) => {
    return (
    <div className="sidebar">
        <div className="profile_info">
            <img src={require('../../../src/assets/img/brand.png')} className="profile_image" alt="" />
        </div>
        <NavLink to="/admin/dashboard" className="option">Dashboard</NavLink>
        <NavLink to="/admin/orders" className="option">Orders</NavLink>
        <NavLink to="/admin/collection" className="option">Collection</NavLink>

        <NavLink to="/admin/product" className="option">Product</NavLink>
        <NavLink to="/admin/notification" className="option">Notification</NavLink>
        <NavLink to="/admin/help" className="option">Help</NavLink>
        <Link to="/" className="option" onClick={logout}>Logout</Link>
    </div>
    )
}

sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps,{logout})(sidebar)
