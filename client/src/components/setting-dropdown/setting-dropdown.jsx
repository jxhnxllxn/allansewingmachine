import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../../redux/auth/auth-action";
import { closeAllMenu } from '../../redux/ui/ui-actions';

import './setting-dropdwon.scss'


const SettingDropdown = () => {
    const dispatch = useDispatch();
    return(
        <div className="setting_dropdown">
            <ul>
                <li><Link to='/setting' onClick={() => dispatch(closeAllMenu())}>Setting</Link></li>
                <li><Link onClick={() => dispatch(logout())} to='/'>Sign out</Link></li>
            </ul>
        </div>
    )
}


export default SettingDropdown;
