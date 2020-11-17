import { useEffect } from "react";

const useOutsideClick = (ref, event, callback) => {
   const handleClick = (e) => {
      if (
         e.target.className === "sidenav-cart-item__remove_button" ||
         e.target.className === "sidenav" ||
         ref.filter((r) => r.current.contains(e.target)).length > 0
      ) {
         return;
      }
      callback();
   };

   useEffect(() => {
      window.addEventListener("click", handleClick);

      return () => window.removeEventListener("click", handleClick);

      // eslint-disable-next-line
   }, [...event]);
};

export default useOutsideClick;
