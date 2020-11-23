import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/auth/auth-action";

const SideNavSetting = () => {
   const dispatch = useDispatch();
   const handleLogout = () => {
      dispatch(logout());
   };
   const links = [
      {
         name: "Personal information",
         linkTo: "/user/info",
      },
      {
         name: "History purchased",
         linkTo: "/user/history-purchased",
      },
      {
         name: "Track Orders",
         linkTo: "/user/track-orders",
      },
      {
         name: "Security & Login",
         linkTo: "/user/security",
      },
      {
         name: "Legal & Policies",
         linkTo: "/legal&polices",
      },
      {
         name: "Help",
         linkTo: "/help",
      },
   ];
   return (
      <div className='ssetting'>
         <ul className='ssetting__link'>
            {links.map((i, key) => (
               <li key={key}>
                  <Link to={i.linkTo}>{i.name}</Link>
               </li>
            ))}
            <li>
               <span onClick={handleLogout} className='ssetting__logout'>
                  Logout
               </span>
            </li>
         </ul>
      </div>
   );
};

export default SideNavSetting;
