import React from 'react'
import { useEffect } from 'react';
import { lazyload } from 'react-lazyload';

import { ReactComponent as SewingIcon } from '../assets/icons/sewing.svg'

import { ReactComponent as LocationIcon } from '../assets/icons/location.svg'
import { ReactComponent as ClockIcon } from '../assets/icons/clock.svg'
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg'
import { ReactComponent as MailIcon } from '../assets/icons/mail.svg'


const Footer = () => {
    useEffect(() => {
        lazyload({
            height: 200,
            once: true,
            offset: 100
          })
    }, [])
    return (
        <footer className="footer">
        {
            
          console.log('footer rendered')
        }
            <div className="container">
                <div className="brand">
                    <SewingIcon className='logo'/>
                    Allan Sewing Machine
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div >
                                <LocationIcon />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Padre Garcia, Batangas</div>
                                </div>
                            </div>
                            <div >
                                <PhoneIcon />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>+63 949 7731 035</div>
                                </div>
                            </div>
                            <div >
                                <ClockIcon />
                                <div className="nfo">
                                    <div>Open hours</div>
                                    <div>Mon-Sat 8:00 AM - 5:00 AM</div>
                                </div>
                            </div>
                            <div >
                                <MailIcon />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>allan@allansewingmachine.com</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                            Get all the latest information on events, sales and offers.You can miss out.
                            </div>
                        </div>
                    </div>      
                </div>
                    <div className="credits">
                        <h3>&copy; Allan Sewing Machine</h3>
                        <h4>Powered by John Allen</h4>
                    </div>
                    
            </div>

        </footer>
    )
}

export default Footer
