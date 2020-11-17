import { useEffect } from "react";

const NavScrollAnimation = (tl) => {
   useEffect(() => {
      tl.from(".header", {
         duration: 0.5,
         ease: "slow(0.7, 0.7, false)",
         css: { top: "-2rem" },
      });
      // eslint-disable-next-line
   }, []);
};

export default NavScrollAnimation;
