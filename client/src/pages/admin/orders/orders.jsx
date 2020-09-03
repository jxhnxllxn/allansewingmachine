import React, { useState } from 'react'
import FormInput from '../../../components/form-input/form-input'
import { Link } from 'react-router-dom';
// import Modal from '../../../shared/modal/modal';

const Orderlist = () => {

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
                <div className="table-header">
                    <h3>Manage orders</h3>
                    <FormInput type="text" name="search" value={searchInput} onChange={e => onChange(e)} label="Search" />
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

export default Orderlist
