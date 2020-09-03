import React from 'react';
import './dashboard.scss';

const Dashboard = () => {
    return (
        <div>
            <div className="card">
                <h2>Order</h2>
                <div className="order-dashboard">
                    <div className="pending  card-item">
                        <span className="badge">12</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clock" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <circle cx="12" cy="12" r="9" />
                            <polyline points="12 7 12 12 15 15" />
                        </svg>
                        <h3>Pending</h3>
                    </div>
                    <div className="processed card-item">
                        <span className="badge">12</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                        <h3>Processed</h3>
                    </div>
                    <div className="canceled card-item">
                        <span className="badge">12</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <h3>Canceled</h3>
                    </div>
                    <div className="total card-item">
                        <span className="badge">12</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checks" width="60" height="60" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <path d="M7 12l5 5l10 -10" />
                            <path d="M2 12l5 5m5 -5l5 -5" />
                        </svg>
                        <h3>Total</h3>
                    </div>
                </div>
            </div>
{/* 
            <div className="card">
                <h2>Info</h2>
                <ul>
                    <li><span>Collection</span> <span>5</span></li>
                    <li><span>Product</span> <span>5</span></li>
                    <li><span>Collection</span> <span>5</span></li>   
                </ul>
            </div> */}


        </div>
    )
}
export default Dashboard
