import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { backDropHidden } from '../redux/ui/ui-actions';
import { selectIsAdmin } from '../redux/auth/auth-selector';
import { selectBackdropHidden } from '../redux/ui/ui-selector';

import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Alert from '../components/alert/alert';
import './layout.scss'
 

const Layout = (props) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => selectIsAdmin(state))
    const menuBackDrop = useSelector(state => selectBackdropHidden(state))
    const handleBackDropHidden = () => {
        dispatch(backDropHidden())
    }
    
    return (
        <div>
            <Header />
            <Alert />
                <div className="page_layout">
                    {props.children}
                </div>
            {
                isAdmin ? null: <Footer />
            }
            {
                menuBackDrop ? 
                    <div className="menuBackdrop" onClick={handleBackDropHidden} />
                :null
            }
            
        </div>
    )
}

export default Layout
