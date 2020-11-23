import React from "react";
import { useEffect } from "react";
import { lazyload } from "react-lazyload";

import { ReactComponent as LocationIcon } from "../assets/icons/location.svg";
import { ReactComponent as ClockIcon } from "../assets/icons/clock.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/phone.svg";
import { ReactComponent as MailIcon } from "../assets/icons/mail.svg";

const Footer = () => {
   useEffect(() => {
      lazyload({
         height: 200,
         once: true,
         offset: 100,
      });
   }, []);
   return (
      <footer className='footer-wrapper'>
         <div className='footer container'>
            {/* <div className='brand'>
               <span className='brand__allan'>allan</span>
               <span className='brand__machine'>Sewing Machines</span>
            </div> */}
            <div className='footer__wrapper'>
               <div className='footer__left'>
                  <h2>Contact information</h2>
                  <div className='footer__businessInfo'>
                     <div className='footer__infoWrapper'>
                        <LocationIcon />
                        <div className='footer__info'>
                           <p className='footer__info-title'>
                              <strong> Address</strong>
                           </p>
                           <p className='footer__info-desc'>
                              Padre Garcia, Batangas
                           </p>
                        </div>
                     </div>
                     <div className='footer__infoWrapper'>
                        <PhoneIcon />
                        <div className='footer__info'>
                           <div className='footer__info-title'>Phone</div>
                           <div className='footer__info-desc'>
                              +63 949 7731 035
                           </div>
                        </div>
                     </div>
                     <div className='footer__infoWrapper'>
                        <ClockIcon />
                        <div className='footer__info'>
                           <div className='footer__info-title'>Open hours</div>
                           <div className='footer__info-desc'>
                              Mon-Sat 8:00 AM - 5:00 AM
                           </div>
                        </div>
                     </div>
                     <div className='footer__infoWrapper'>
                        <MailIcon />
                        <div className='footer__info'>
                           <div className='footer__info-title'>Email</div>
                           <div className='footer__info-desc'>
                              allan@allansewingmachine.com
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='footer__right'>
                  <h2>Be the first to know</h2>
                  <span>
                     Get all the latest information on events, sales and
                     offers.You can miss out.
                  </span>
               </div>
            </div>
            <div className='footer__credits'>
               <span>Allan Sewing Machines</span>
               <span>
                  &copy;{new Date().getFullYear()}{" "}
                  <a href='https://github.com/jhhhn' target='_blank'>
                     jhhhn
                  </a>
               </span>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
