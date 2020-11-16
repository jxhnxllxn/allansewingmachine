import { useEffect } from "react";
const useCartToggleAnimation = (tl) => {
   useEffect(() => {
      tl.to(".header", {
         duration: 0.3,
         css: { top: "-2rem" },
      })
         .from(".sidenav", {
            x: "50",
            duration: 0.3,
            autoAlpha: 0,
         })
         .reverse();
      // eslint-disable-next-line
   }, []);
};

export default useCartToggleAnimation;
