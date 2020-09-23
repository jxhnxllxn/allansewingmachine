import React from 'react'
import Header from '../components/header/header'
import Alert from '../components/alert/alert';
 


const AdminLayout = (props) => {
    
    return (
        <div>
        {console.log(props)}
            <Header />
            <Alert />
            <div className="page_container">
                {props.children}
            </div>
        </div>
    )
}

export default AdminLayout
