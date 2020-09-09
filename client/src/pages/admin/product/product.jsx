import React, {useState, useEffect, useRef, Fragment} from 'react'
import {connect} from 'react-redux'
import { getProducts, deleteProduct } from "../../../redux/product/product-action"; 
import PropTypes from "prop-types"
import Loading from "../../../shared/loading/loading";

import FormInput from '../../../components/form-input/form-input'
import CustomButton from '../../../components/custom-button/custom-button'
import Modal from '../../../shared/modal/modal'

const Product = ({product:{products,loading},getProducts,deleteProduct}) => {
    const [modalData, setModalData] = useState(null);

    const [data, setData] = useState({
        searchInput:'',
        confirmAction:''
    })
    
    const {searchInput,confirmAction} = data;

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const onChange = e => setData({...data,[e.target.name]:e.target.value});

    const modalRef = useRef();
    const openModal = (data) => {
        setModalData(data);
        modalRef.current.openModal()
    }
    const closeModal = () => {
        modalRef.current.closeModal()
    }

    const productData = products && !loading ? products : [];
  
    const tableData = productData.map(col => (
        <tr key={col._id}>
            <td>{col.productName}</td>       
            <td>{col.productPhoto}</td>
            <td></td>
            <td>{col.price}</td>
            {/* <td><img className="productPhoto" src={`../../../../../public/uploads/${col.productPhoto}`} alt={col.productPhoto}/></td> */}
            <td>view | <button onClick={() => openModal(col)}>Delete</button></td>
        </tr>
    ));

    const handleDeleteProduct = async e => {
        e.preventDefault();
        deleteProduct(modalData._id);
        modalRef.current.closeModal();
    }

    return (
        <div>
            <div className="card">
                <div className="table-header">
                    <h3>Manage products</h3>
                    <FormInput type="text" name="search" value={searchInput} onChange={e => onChange(e)} label="Search" />
                </div>
                <div className="floatRight">
                    <CustomButton buttonType="primary" type="submit">Add Product</CustomButton>
                </div>
                {!loading ? 
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
                    
                    {tableData}
                    </tbody>
                    
                    <Modal ref={modalRef}>    
                        {modalData && <Fragment>
                            <h2>Are you sure you want to delete {modalData.productName} product?</h2>
                            <br/>
                            <p>This action cannot be undone. This will permanently delete the {modalData.productName} product.</p>
                            <br/>
                            <p>Please type <b>rdg/{modalData.productName}</b></p>
                                <form onSubmit={handleDeleteProduct}>
                                    <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/>
                                    <div className="form-ation">
                                        <CustomButton buttonType="danger" type="submit" disabled={Boolean(confirmAction !== `rdg/${modalData.productName}`)}>Delete</CustomButton>
                                        <CustomButton buttonType="default" onClick={closeModal}>Cancel</CustomButton>
                                    </div>
                                </form>
                                    
                            
                        </Fragment>}
                        
                    </Modal> 

                    
                </table> : <Loading></Loading>}

            </div>
        </div>
    )

}
Product.propTypes = {
    getProducts: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    product: state.product
})


export default connect(mapStateToProps,{getProducts,deleteProduct})(Product)
