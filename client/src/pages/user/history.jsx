import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/loading'
import addComma from '../../utils/helper/add-comma'
import moment from 'moment'

const UserHistory = () => {
  const orderState = useSelector(({ order }) => order)
  const { loading, orderHistory, error } = orderState

  return (
    <div className='history_cart'>
      <h1 className='heading-secondary'>History</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>Error {error}</h1>
      ) : (
        Object.keys(orderHistory).map((key, index) => {
          return (
            <div key={index}>
              <table>
                <thead>
                  <tr>
                    <th>Order number</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sub total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory[key]['orderItems'].map((data, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.quantity}</td>
                      <td>
                        <span>Php </span>
                        {addComma(parseFloat(data.price).toFixed(2))}
                      </td>
                      <td>
                        <span>Php </span>
                        {addComma(
                          parseFloat(data.price * data.quantity).toFixed(2)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4>
                <span>Purchased date:</span>
                {moment(orderHistory[key]['createdAt']).format('MM-DD-YYYY')}
              </h4>
              <h5>
                Total purchased: Php{' '}
                {addComma(
                  parseFloat(orderHistory[key]['totalPrice']).toFixed(2)
                )}
              </h5>
            </div>
          )
        })
      )}
    </div>
  )
}

export default UserHistory
