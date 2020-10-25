import React, { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getOrderHistory } from '../../redux/order/order-action';
// import moment from 'moment';

// {moment(product.dateOfPurchase).format("MM-DD-YYYY")}

const UserHistoryBlock = () => {
    const dispatch = useDispatch()
    const [orderHistory, setOrderHistory] = useState([])

    useEffect(() => {
        dispatch(getOrderHistory()).then(res => {
            setOrderHistory(res.payload.data)
        })
    }, [dispatch])

    const renderBlocks = () => (
        orderHistory ?
            Object.keys(orderHistory).map((key, index) => {
                return (
                    <table key={index}>
                        <thead>
                            <tr>
                                <th>Order number</th>
                                <th>Product</th>
                                <th>Price paid</th>
                                <th>Quantity</th>
                                <th>Sub total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderHistory[key]['product'].map((data, i) => (
                                    <Fragment key={i}>

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.price}</td>
                                            <td>{data.quantity}</td>
                                            <td>{data.price * data.quantity}</td>
                                        </tr>
                                    </Fragment>
                                ))
                            }
                            <tr>
                                <td>Date</td>
                                <td>{orderHistory[key]['createdAt']}</td>
                                <td></td>
                                <td>Total</td>
                                <td>{orderHistory[key]['total']}</td>
                            </tr>

                        </tbody>
                    </table>

                )
            }) : null

    )

    return (
        <div className="history_blocks">
            {renderBlocks()}
        </div>
    );
};

export default UserHistoryBlock;