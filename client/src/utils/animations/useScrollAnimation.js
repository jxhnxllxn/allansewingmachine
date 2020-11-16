import { useEffect } from "react";

const NavScrollAnimation = (tl) => {
   useEffect(() => {
      tl.from(".header", {
         duration: 0.3,
         css: { top: "-2rem" },
      });
      // eslint-disable-next-line
   }, []);
};

export default NavScrollAnimation;
