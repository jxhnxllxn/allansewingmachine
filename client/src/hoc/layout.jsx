import React from 'react'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Alert from '../components/alert/alert';
 


const Layout = (props) => {
    return (
        <div>
            <Header />
            <Alert />
                <div className="page_container">
                    {props.children}
                </div>
            <Footer />
        </div>
    )
}

export default Layout
