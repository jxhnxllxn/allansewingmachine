import React from "react";
import ArrowTitle from "../assets/images/arrow-title-1.png";

const SideNavLayout = ({ children }) => {
   return (
      <div className='sidenav'>
         <div className='sidenav__header'>
            <img src={ArrowTitle} alt='arrow-title' />
         </div>

         {children}

         <div className='sidenav__footer'></div>
      </div>
   );
};

export default SideNavLayout;
