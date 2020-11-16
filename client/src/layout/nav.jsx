import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";

import { Link, NavLink } from "react-router-dom";
import {
   selectNavMenuHidden,
   selectNavMenuIconsHidden,
} from "../redux/ui/ui-selector";
import { selectCartItemsCount } from "../redux/cart/cart-selectors";
import { toggleNavMenu } from "../redux/ui/ui-actions";

import { toggleMenuIcons } from "../redux/ui/ui-actions";

import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { ReactComponent as PersonIcon } from "../assets/icons/person.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as ShoppingBagIcon } from "../assets/icons/shopping-bag.svg";

import useSidenavAnimation from "../utils/animations/useSidenavAnimation";
import toggleScrollbar from "../utils/animations/toggleScrollbar";
import useOutsideClick from "../utils/hooks/useOutsideClick";

import SideNav from "./sidenav";

const Nav = () => {
   const dispatch = useDispatch();
   const searchIconRef = useRef();
   const personIconRef = useRef();
   const cartIconRef = useRef();
   const sidenavRef = useRef();
   const menuIconRef = useRef();
   const isNavMenuIconsHidden = useSelector((state) =>
      selectNavMenuIconsHidden(state)
   );
   const itemCount = useSelector((state) => selectCartItemsCount(state));

   const [activeMenuIcons, setActiveMenuIcons] = useState("");

   const tl = gsap.timeline();
   const [tl__sidenav] = useState(tl);
   useSidenavAnimation(tl__sidenav);

   const toggleSideNav = (x) => {
      if (!isNavMenuIconsHidden) {
         setActiveMenuIcons(x);
      }
      dispatch(toggleMenuIcons());
      tl__sidenav.reversed(isNavMenuIconsHidden);
      toggleScrollbar(isNavMenuIconsHidden);
   };

   useOutsideClick(
      [sidenavRef, cartIconRef, personIconRef, searchIconRef],
      [isNavMenuIconsHidden],
      () => isNavMenuIconsHidden && toggleSideNav()
   );

   const links = [
      [
         {
            name: "Shop",
            linkTo: "/shop",
         },
         {
            name: "Services",
            linkTo: "/services",
         },
         {
            name: "Contact",
            linkTo: "/contact",
         },
      ],
   ];

   const isNavMenuOpen = useSelector((state) => selectNavMenuHidden(state));

   return (
      <nav className='nav'>
         <div className='nav__logo'>
            <Link className='brand' to='/'>
               <span className='brand__allan'>Allan</span>
               <p className='brand__machine'>
                  <strong>Sewing Machines</strong>
               </p>
            </Link>
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
                     className='icon icon--search'
                     ref={searchIconRef}
                     onClick={() => toggleSideNav("search")}
                  >
                     <SearchIcon />
                  </div>
               </li>
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
               <li>
                  <div
                     className='icon icon--menu'
                     ref={menuIconRef}
                     onClick={() => toggleSideNav("menu")}
                  >
                     <MenuIcon className='icon_menu' />
                  </div>
               </li>
            </ul>
         </div>

         <SideNav sidenavRef={sidenavRef} activeMenuIcons={activeMenuIcons} />
      </nav>
   );
};

export default Nav;
