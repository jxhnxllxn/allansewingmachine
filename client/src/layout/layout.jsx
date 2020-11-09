import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsAdmin } from '../redux/auth/auth-selector';

import Header from './header'
import Footer from './footer'

const Layout = (props) => {
    const isAdmin = useSelector(state => selectIsAdmin(state))
    return (
        <>
            <Header />
                <main className="page_layout">
                    {props.children}
                </main>
            {
                isAdmin ? null: <Footer />
            }
        </>
    )
}

export default Layout
