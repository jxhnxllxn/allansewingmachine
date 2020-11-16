import React from "react";

const SideNavLayout = ({ children }) => {
   return (
      <div className='sidenav'>
         <div className='sidenav__header'></div>

         {children}

         <div className='sidenav__footer'></div>
      </div>
   );
};

export default SideNavLayout;
