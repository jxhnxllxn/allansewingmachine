import React from 'react'

import Header from './header'
import Footer from './footer'
// import Backdrop from '../components/backdrop'

const Layout = ({children}) => {
    return (
        <>
            <Header />
                <main className="page-wrapper">
                    {children}
                </main>
            <Footer />
            {/* <Backdrop /> */}
        </>
    )
}

export default Layout
