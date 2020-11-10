import React from 'react'

import Header from './header'
import Footer from './footer'

const Layout = ({children}) => {
    return (
        <>
            <Header />
                <main className="page-wrapper">
                    {children}
                </main>
            <Footer />
        </>
    )
}

export default Layout
