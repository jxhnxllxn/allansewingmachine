import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/loading/loading'
import { getSingleOrder } from '../../../redux/order/order-action'
import './order.scss'

const OrderDetail = (props) => {
    const dispatch = useDispatch();

    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getSingleOrder(props.match.params.id)).then(res => {
            setOrder(res.payload.data)
            setLoading(false)
        })
        return () => {
            setOrder([])
        }
    }, [])

    console.log(order)

    const table = () => (
        loading ? 
        <Loading />
        :
        <Fragment>
            <ul>
                <li>Name: <span>{order.user.name}</span> </li>
                <li>Code: <span>{order.paymentId}</span></li>
                <li>Status: <span>{order.status}</span> </li>
                <li>Email: <span>{order.user.email}</span> </li>
                <li>Phone: <span>{order.user.contact}</span> </li>
                <li>Address: <span>{`${order.user.address.unit} ${order.user.address.street} ${order.user.address.city} ${order.user.address.state}`}</span></li>
                <li>Shipping: <span>Cash on delivery</span> </li>
                <li>Date : <span>{order.createdAt}</span></li>
            </ul>
            <table>
                <tbody>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    {
                        order.product.map(col => (
                        <tr key={col._id}>
                        <td>{col.name}</td>       
                        <td>{col.quantity}</td>
                        <td>{col.price}</td> 
                        <td>{col.quantity*col.price}</td>        
                        </tr>
                    ))
                    }
                </tbody>    
            </table>
        </Fragment>
        
    )


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
                    {table()}
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
