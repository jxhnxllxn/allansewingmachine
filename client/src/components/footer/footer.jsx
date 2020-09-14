import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompass} from '@fortawesome/free-solid-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

import './footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="logo">
                    RDG Agri-Ventures Company
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faCompass}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>0736 Purok V. Brgy. Namunga, Rosario, Batangas</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>(043) 3211441 / 09175067645 / 09228189301 / 09478904024</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faClock}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Open hours</div>
                                    <div>Mon-Sat 8:00 AM - 5:00 AM</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>rdgagri-venturescompany@yahoo.com</div>
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
            </div>
        </footer>
    )
}

export default Footer
