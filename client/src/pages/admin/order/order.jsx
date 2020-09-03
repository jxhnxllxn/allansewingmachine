import React from 'react'
import './order.scss'

const OrderDetail = () => {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h2>Order detail</h2>
                    <div className="action">
                        <button>go Back</button>
                        <button>decline</button>
                        <button>process</button>
                    </div>
                </div>
                <div className="card-body">
                    <ul>
                        <li>Name: <span>John Allen de Chavez</span> </li>
                        <li>Code: <span>XXXX-xxXX</span></li>
                        <li>Status: <span>pending</span> </li>
                        <li>Email: <span>john@yahoo.com</span> </li>
                        <li>Phone: <span>09902020200</span> </li>
                        <li>Address: <span>San Felipe Padre Garcia</span></li>
                        <li>Shipping: <span>Cash on delivery</span> </li>
                        <li>Date : <span>jan 1,2020</span></li>
                    </ul>
                    <table>
                        <tbody>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td>Dog Food Name</td>
                                <td>23 sock</td>
                                <td>1000</td>
                                <td>23000</td>
                            </tr>
                            <tr>
                                <td>Dog Food Name</td>
                                <td>23 sock</td>
                                <td>1000</td>
                                <td>23000</td>
                            </tr>
                            <tr>
                                <td>Dog Food Name</td>
                                <td>23 sock</td>
                                <td>1000</td>
                                <td>23000</td>
                            </tr>
                            <tr>
                                <th>###</th>
                                <th>###</th>
                                <th>Total Amount:</th>
                                <th>88000</th>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default OrderDetail
