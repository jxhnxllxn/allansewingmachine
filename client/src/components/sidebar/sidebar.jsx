 import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import './sidebar.scss'
import { logout } from '../../redux/auth/auth-action';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
    const dispatch = useDispatch()
    return (
    <div className="sidebar">
        <div className="profile_info">
            <img src={require('../../../src/assets/img/brand.png')} className="profile_image" alt="" />
        </div>
        <NavLink exact to="/admin" className="option">Dashboard</NavLink>
        <NavLink to="/admin/product" className="option">Product</NavLink>
        <NavLink to="/admin/collection" className="option">Collection</NavLink>
        <NavLink to="/admin/category" className="option">Category</NavLink>
        <Link to="/" className="option" onClick={() => dispatch(logout())}>Logout</Link>
    </div>
    )
}


export default Sidebar
