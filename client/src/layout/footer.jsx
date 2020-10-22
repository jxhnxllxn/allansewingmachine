import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="logo">
                    Allan Sewing Machine
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-location" width="2rem" height="2rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg>
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Padre Garcia, Batangas</div>
                                </div>
                            </div>
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="2rem" height="2rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                </svg>
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>+63 949 7731 035</div>
                                </div>
                            </div>
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clock" width="2rem" height="2rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <circle cx="12" cy="12" r="9" />
                                    <polyline points="12 7 12 12 15 15" />
                                </svg>
                                <div className="nfo">
                                    <div>Open hours</div>
                                    <div>Mon-Sat 8:00 AM - 5:00 AM</div>
                                </div>
                            </div>
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width="2rem" height="2rem" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <polyline points="3 7 12 13 21 7" />
                                </svg>
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
                        <h4>&copy; Allan Sewing Machine</h4>
                        <h5>Powered by John Allen</h5>
                    </div>
                    
            </div>

        </footer>
    )
}

export default Footer
