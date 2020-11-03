import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../redux/auth/auth-selector';

import Header from './header'
import Footer from './footer'
import Alert from '../components/alert'; 

const Layout = (props) => {
    const isAdmin = useSelector(state => selectIsAdmin(state))
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
        </div>
    )
}

export default Layout
