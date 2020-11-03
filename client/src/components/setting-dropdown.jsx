import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../redux/auth/auth-action";

const SettingDropdown = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return(
        <div className="setting_dropdown">
            <ul>
                <li><Link to='/user/dashboard'>Setting</Link></li>
                <li><Link onClick={handleLogout} to='/'>Sign out</Link></li>
            </ul>
        </div>
    )
}


export default SettingDropdown;
