import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useThrottle } from "../utils/hooks/useThrottle";

import useNavScrollAnimation from "../utils/animations/useScrollAnimation";

import { selectNavMenuIconsHidden } from "../redux/ui/ui-selector";

import Nav from "./nav";
import { useSelector } from "react-redux";

const Header = () => {
   const isNavMenuIconsHidden = useSelector((state) =>
      selectNavMenuIconsHidden(state)
   );
   const headerRef = useRef();
   const tl = gsap.timeline();
   const [tl__header] = useState(tl);
   useNavScrollAnimation(tl__header);

   let lastScrollTop = 0;
   const scrollFunction = () => {
      const st = window.scrollY;
      // if (st > lastScrollTop) {
      //    tl__header.reversed(true);
      // } else {
      //    tl__header.reversed(false);
      // }

      if (st > 200) {
         tl__header.reversed(true);
      } else {
         tl__header.reversed(false);
      }

      lastScrollTop = st;
   };

   const scrollThrottle = useThrottle(scrollFunction, 100);

   useEffect(() => {
      window.addEventListener("scroll", scrollThrottle);
      return () => {
         window.removeEventListener("scroll", scrollThrottle);
      };
   }, []);

   return (
      <header className='header' ref={headerRef}>
         <div className='header__promotion'>
            <p>Free Shipping For Batangas Area</p>
         </div>
         <Nav isNavMenuIconsHidden={isNavMenuIconsHidden} />
      </header>
   );
};

export default Header;
