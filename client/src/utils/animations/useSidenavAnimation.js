import { useEffect } from "react";
const useCartToggleAnimation = (tl) => {
   useEffect(() => {
      tl.to(".nav__bottom", {
         duration: 0.3,
         ease: "slow(0.7, 0.7, false)",
         css: { height: 0 },
      })
         .to(".nav__icons", {
            duration: 0,
            autoAlpha: 0,
         })
         .from(".sidenav", {
            x: "200",
            duration: 0.3,
            autoAlpha: 0,
         })
         .reverse();
      // eslint-disable-next-line
   }, []);
};

export default useCartToggleAnimation;
