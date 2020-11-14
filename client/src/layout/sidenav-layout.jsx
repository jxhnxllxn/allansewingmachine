import React from 'react'


const SideNavLayout = ({children}) => {
    return (
        <div className='sidenav-layout'>
            <div className="sidenav-layout__header">

            </div>

            {children}
        
            <div className="sidenav-layout__footer">
                
            </div>
        </div>

        
    )
}

export default SideNavLayout
