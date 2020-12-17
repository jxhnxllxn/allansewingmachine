import React from 'react'
import moment from 'moment'
import addComma from '../utils/helper/add-comma'

const Table = ({ tableFormat, tableData, openModal }) => {
  console.log(tableData)
  return (
    <table className='crudTable'>
      <thead>
        <tr>
          {tableFormat.tHead.map((x, i) => (
            <th key={i}>{x}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((i) => (
          <tr key={i._id}>
            <td>{i.user.name}</td>
            <td>{i.paymentId}</td>
            <td>Php {addComma(parseFloat(i.totalPrice).toFixed(2))}</td>
            <td>{moment(i.createdAt).format('M-D-YYYY')}</td>

            <td>{i.status}</td>
            <td onClick={() => openModal(i)}>view</td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  )
}

export default Table
