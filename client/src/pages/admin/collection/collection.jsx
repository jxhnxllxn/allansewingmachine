import React, { useState } from 'react'
import FormInput from '../../../components/form-input/form-input'
import './collection.scss'

const Collection = () => {
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
                    <h3>Manage collection</h3>
                    <FormInput type="text" name="search" value={searchInput} onChange={e => onChange(e)} label="Search" />
                </div>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Collection Image</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Dog</td>
                        <td><img className="collectionPhoto" src={require('../../../../src/assets/img/received_2734379036819518.jpeg')} alt="collection"/></td>
                        <td>view | delete</td>
                    </tr>
                    <tr>
                        <td>Cat</td>
                        <td><img className="collectionPhoto" src={require('../../../../src/assets/img/received_2734379036819518.jpeg')} alt="collection"/></td>
                        <td>view | delete</td>
                    </tr>
                    <tr>
                        <td>Fish</td>
                        <td><img className="collectionPhoto" src={require('../../../../src/assets/img/received_2734379036819518.jpeg')} alt="collection"/></td>
                        <td>view | delete</td>
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

export default Collection
