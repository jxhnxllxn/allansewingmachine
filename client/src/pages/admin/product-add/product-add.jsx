import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct, failedAction } from "../../../redux/product/product-action"; 
import FormInput from '../../../components/form-input/form-input';
import ProgressBar from '../../../components/progress-bar/progress-bar'
import CustomButton from '../../../components/custom-button/custom-button'
import './product-add.scss';

const ProductAdd = ({addProduct,failedAction}) => {
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [data, setData] = useState({
        productName:'',
        productFile:null,
        price:'',
        stock:'',
        category:''
    })
    
    const handleChange = e => setData({...data,[e.target.name]:e.target.value});
    const handleChangeFile = e => setData({...data,[e.target.name]:e.target.files[0]});

    const {productName,productFile,price,stock,category} = data;

    const handleAddProduct = async e => {
        e.preventDefault();
        let fd = new FormData();
        fd.append('file',productFile);
        // fd.set('collectionName',collectionName);

        const config = {
            headers: {
                'Content-Type':'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                setUploadPercentage(
                  parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  )
                );
                // Clear percentage
                setTimeout(() => setUploadPercentage(0), 3000);
              }
        }

        axios
            .post('/api/product',fd,config)
            .then(res => {
                addProduct(res.data);
            })
            .catch(err => {
                const errors = err.response.data.error.split(',')
                failedAction(errors)
            })
        
        
        setData({...data,productName:"",price:"",stock:"",productFile:null})
            
    }

    return (
        <div className="product-add">
            <div className="card">
                {uploadPercentage > 0 ? <ProgressBar percentage={uploadPercentage}/> : null}
                <h3>Add product</h3>
                <form onSubmit={handleAddProduct}>
                {/* <FormInput label="Confirm" type="text" name="confirmAction" value={confirmAction} onChange={e => onChange(e)}/> */}
                            
                    <FormInput label="Product Name" type="text" name="productName" value={productName} onChange={e => handleChange(e)}  required/>
                    <FormInput type="file" name="productFile" onChange={e => handleChangeFile(e)}  required />
                    <FormInput label="Price" type="number" name="price" value={price} onChange={e => handleChange(e)} required/>
                    <FormInput type="number" name="stock" onChange={e => handleChange(e)} value={stock}  label="Stock" required/>
                    <FormInput type="select" label="Select Category" name="category" value={category} handleChange={e => handleChange(e)}>
                        {/* <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option> */}
                    </FormInput>
                    <select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
                    <div className="floatRight">
                        <CustomButton buttonType="primary" type="submit">Add</CustomButton> 
                    </div>
                </form>
            </div>
        </div>
    )
}


ProductAdd.propTypes = {
    addProduct: PropTypes.func.isRequired,
    failedAction: PropTypes.func.isRequired,
}

// const mapStateToProps = state => {
    
// }

export default connect(null,failedAction,addProduct)(ProductAdd)
