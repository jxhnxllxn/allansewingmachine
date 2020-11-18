import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";

import { Link, NavLink } from "react-router-dom";

import { selectCartItemsCount } from "../redux/cart/cart-selectors";
import { toggleMenuIcons } from "../redux/ui/ui-actions";

import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { ReactComponent as PersonIcon } from "../assets/icons/person.svg";
import { ReactComponent as ShoppingBagIcon } from "../assets/icons/shopping-bag.svg";

import { ReactComponent as OuterLogo } from "../assets/icons/logo2.svg";
import { ReactComponent as InnerLogo } from "../assets/icons/logo3.svg";

import useSidenavAnimation from "../utils/animations/useSidenavAnimation";
import toggleScrollbar from "../utils/animations/toggleScrollbar";
import useOutsideClick from "../utils/hooks/useOutsideClick";

import SideNav from "./sidenav";

const Nav = ({ isNavMenuIconsHidden, mTop }) => {
   const dispatch = useDispatch();
   const personIconRef = useRef();
   const cartIconRef = useRef();
   const sidenavRef = useRef();
   const menuIconRef = useRef();
   const itemCount = useSelector((state) => selectCartItemsCount(state));

   const [activeMenuIcons, setActiveMenuIcons] = useState("");

   const tl = gsap.timeline();
   const [tl__sidenav] = useState(tl);
   useSidenavAnimation(tl__sidenav, mTop);

   const toggleSideNav = (x) => {
      if (!isNavMenuIconsHidden) {
         setActiveMenuIcons(x);
      }
      dispatch(toggleMenuIcons());
      tl__sidenav.reversed(isNavMenuIconsHidden);
      toggleScrollbar(isNavMenuIconsHidden);
   };

   useOutsideClick(
      [sidenavRef, cartIconRef, personIconRef],
      [isNavMenuIconsHidden],
      () => isNavMenuIconsHidden && toggleSideNav()
   );

   const links = [
      [
         {
            name: "Home",
            linkTo: "/",
         },
         {
            name: "Shop",
            linkTo: "/shop",
         },
         {
            name: "Services",
            linkTo: "/services",
         },
      ],
   ];

   return (
      <>
         <nav className='nav'>
            <div className='nav__logo'>
               <span>Allan</span>
            </div>
            <div className='nav__list'>
               <ul>
                  {links[0].map((x, i) => (
                     <li key={i}>
                        <NavLink exact to={x.linkTo}>
                           {x.name}
                        </NavLink>
                     </li>
                  ))}
                  <li>
                     <div
                        className='icon icon--person'
                        ref={personIconRef}
                        onClick={() => toggleSideNav("person")}
                     >
                        <PersonIcon />
                     </div>
                  </li>
                  <li>
                     <div
                        className='icon icon--bag'
                        id='toggleIconCart'
                        ref={cartIconRef}
                        onClick={() => toggleSideNav("cart")}
                     >
                        <ShoppingBagIcon />
                        <span className='icon__count'>
                           {itemCount > 0 && itemCount}
                        </span>
                     </div>
                  </li>
               </ul>
            </div>
         </nav>
         <SideNav sidenavRef={sidenavRef} activeMenuIcons={activeMenuIcons} />
      </>
   );
};

export default Nav;
