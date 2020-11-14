import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../redux/auth/auth-action";

const SideNavSetting = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return(
        <div className="ssetting">

            <div className="ssetting__profile">
                <div className="ssetting__photo">

                </div>
                <div className="ssetting__info">
                    <span className="ssetting__name">John Allen de Chavez</span>
                    <span  onClick={handleLogout} className="ssetting__logout">Logout</span>
                </div>
            </div>

            <ul className="ssetting__link">
                <li><Link to='/user/info'>Personal information</Link></li>
                <li><Link to='/user/history-purchased'>History purchased</Link></li>
                <li><Link to='/user/track-orders'>Track Orders</Link></li>
                <li><Link to='/security'>Security & Login</Link></li>
                <li><Link  to='/legal&polices'>Legal & Policies</Link></li>
                <li><Link  to='/help'>Help</Link></li>
            </ul>
        </div>
    )
}


export default SideNavSetting;
