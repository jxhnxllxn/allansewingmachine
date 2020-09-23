import React from 'react'
import { selectIsAdmin } from '../redux/auth/auth-selector';
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Alert from '../components/alert/alert';
import { useSelector } from 'react-redux';
import './layout.scss'
 

const Layout = (props) => {
    const isAdmin = useSelector(state => selectIsAdmin(state))
    
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
        </div>
    )
}

export default Layout
