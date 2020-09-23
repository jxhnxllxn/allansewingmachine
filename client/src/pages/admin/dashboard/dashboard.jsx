import React ,{useState} from 'react';
import {Link} from 'react-router-dom';
import FormField from '../../../components/utils/form-field/form-field';
import './dashboard.scss';


const Dashboard = () => {
    
    const [data, setData] = useState({
        searchInput:''
    })

    // const modalRef = useRef();

    // const openModal = () => {
    //     modalRef.current.openModal()
    // }

    const {searchInput} = data;
    const onChange = e => setData({[e.target.name]:e.target.value});

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

            <div className="card">
                <div className="table-header">
                    <h2>Manage orders</h2>
                    {/* <FormField
                        id={'search'}
                        onChange={e => onChange(e)}
                    /> */}
                </div>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>John Allen Belen de Chavez</td>
                        <td>XXX-XX-X</td>
                        <td>20000</td>
                        <td>January 11,2020</td>
                        <td>pending</td>
                        <td>view | delete</td>
                    </tr>
                    <tr>
                        <td>John Allen Belen de Chavez</td>
                        <td>XXX-XX-X</td>
                        <td>20000</td>
                        <td>January 11,2020</td>
                        <td>pending</td>
                        <td>view | delete</td>
                    </tr>
                    <tr>
                        <td>John Allen Belen de Chavez</td>
                        <td>XXX-XX-X</td>
                        <td>20000</td>
                        <td>January 11,2020</td>
                        <td>pending</td>
                        <td><Link to='/admin/orders/1'>View</Link> | delete</td>
                    </tr>    
                    </tbody>
                    
                </table>
{/* 
                <Modal ref={modalRef}>
                    header
                   <h2>Order Detail</h2>
                   <form>
                        <h2>hello</h2>
                   </form>
               </Modal>  */}

            </div>

        </div>
    )
}
export default Dashboard
