import React, {useState} from 'react'
import FormInput from '../../../components/form-input/form-input'

const Product = () => {
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
                    <h3>Manage products</h3>
                    <FormInput type="text" name="search" value={searchInput} onChange={e => onChange(e)} label="Search" />
                </div>
                <button className="addButton">Add Product</button>
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Collection</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>TigerCatfood</td>
                        <td><img className="collectionPhoto" src={require('../../../../src/assets/img/received_2734379036819518.jpeg')} alt="collection"/></td>
                        <td>Dog</td>
                        <td>Food</td>
                        <td>Php 120.00</td>
                        <td>Available</td>
                        <td>view | delete</td>
                    </tr>
                    <tr>
                        <td>TigerCatfood</td>
                        <td><img className="collectionPhoto" src={require('../../../../src/assets/img/received_2734379036819518.jpeg')} alt="collection"/></td>
                        <td>Dog</td>
                        <td>Food</td>
                        <td>Php 120.00</td>
                        <td>Available</td>
                        <td>view | delete</td>
                    </tr>
                    <tr>
                        <td>TigerCatfood</td>
                        <td><img className="collectionPhoto" src={require('../../../../src/assets/img/received_2734379036819518.jpeg')} alt="collection"/></td>
                        <td>Dog</td>
                        <td>Food</td>
                        <td>Php 120.00</td>
                        <td>Available</td>
                        <td>view | delete</td>
                    </tr>
                    <tr>
                        <td>TigerCatfood</td>
                        <td><img className="collectionPhoto" src={require('../../../../src/assets/img/received_2734379036819518.jpeg')} alt="collection"/></td>
                        <td>Dog</td>
                        <td>Food</td>
                        <td>Php 120.00</td>
                        <td>Available</td>
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

export default Product
