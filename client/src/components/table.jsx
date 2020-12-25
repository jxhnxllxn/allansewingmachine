import React from 'react'
import moment from 'moment'
import addComma from '../utils/helper/add-comma'

const Table = ({ tableFormat, tableData, openModal }) => {
  return (
    <table className='customTable'>
      <tbody>
        <tr>
          {tableFormat.tHead.map((x, i) => (
            <th key={i}>{x}</th>
          ))}
        </tr>
        {tableData.map((key, index) => (
          <tr key={index}>
            {tableFormat.tData.map((y, x) => (
              <td key={x}>
                {y === 'totalPrice' ? (
                  <span>Php {addComma(parseFloat(key[y]).toFixed(2))}</span>
                ) : y === 'createdAt' ? (
                  moment(key[y]).format('MM-DD-YYYY')
                ) : (
                  key[y]
                )}
              </td>
            ))}
            <td></td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  )
}

export default Table
