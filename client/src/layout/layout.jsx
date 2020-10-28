import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { backDropHidden } from '../redux/ui/ui-actions';
import { selectIsAdmin } from '../redux/auth/auth-selector';
import { selectBackdropHidden } from '../redux/ui/ui-selector';

import Header from './header'
import Footer from './footer'
import Alert from '../components/alert'; 

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
                <main className="page_layout">
                    {props.children}
                </main>
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
