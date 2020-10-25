import React from 'react'

const Table = ({tableData,openModal}) => {
  
  console.log(tableData);
    return (
      <>
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
