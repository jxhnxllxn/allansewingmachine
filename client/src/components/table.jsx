import React from 'react'
import { ReactComponent as ArrowLeftIcon } from '../assets/icons/arrow-left.svg'
import { ReactComponent as ArrowRightIcon } from '../assets/icons/arrow-right.svg'
import { ReactComponent as ArrowFirstPageIcon } from '../assets/icons/arrow-first-page.svg'
import { ReactComponent as ArrowLastPageIcon } from '../assets/icons/arrow-last-page.svg'

const Table = ({tableData,openModal,setSearchTerm}) => {
    return (
      <>

<div className="table_header">
                    <h2>Manage orders</h2>
                    <div className="filter_pagination">
                        <input
                            placeholder="Search Name"
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <div className="pagination">
                            <div className="item_per_page">
                                <span>Item per page </span>
                            </div>

                            <div className="arrows">
                                <ArrowFirstPageIcon />
                                <ArrowLeftIcon />
                                <span>6</span>
                                <ArrowRightIcon />
                                <ArrowLastPageIcon />
                            </div>
                        </div>
                    </div>
                </div>
      {
        tableData.tData &&
        <table className="crudTable">
          <thead>
            <tr>
              {
                tableData.tHead.map((x,i) => (
                  <th key={i}>{x}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
              {
                tableData.tData.map((x,i) => (
                  <tr key={i}>
                    <td>{x.name}</td>
                    <td>{x.paymentId}</td>
                    <td>{x.total}</td>
                    <td>{x.createdAt}</td>
                    <td>{x.status}</td>
                    <td onClick={() => openModal(x)}>view</td>
                  </tr>
                ))
              }
          </tbody>
          <tfoot>

          </tfoot>
           
        </table>
        
      

      }

      {
        tableData.tDatakk <= 0 ? 
          <h1>Sorry, No result.</h1>
          :null
      }
      
      </>
        
    )
}

export default Table
