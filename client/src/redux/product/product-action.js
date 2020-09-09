import axios from "axios";
import { setAlert } from "../alert/alert-action";
import { ProductActionTypes } from "./product-types";


export const getProducts = () => async dispatch => {
    axios
        .get('/api/product')
        .then(res => {
            dispatch({
                type:ProductActionTypes.GET_COLLECTIONS_SUCCESS,
                payload:res.data,
            })
        })
        .catch(err => {
            dispatch({
                type: ProductActionTypes.GET_COLLECTIONS_FAIL,
                payload: err.response.data
            });
        })
}

export const addProduct = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type':'multipart/form-data'
        },
        onUploadProgress: progressEvent => (parseInt(Math.round((progressEvent.loaded))))
    }

    axios
        .post('/api/product',data,config)
        .then(res => {
            dispatch({
                type: ProductActionTypes.ADD_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            const errors = err.response.data.error.split(',');
            console.log(errors)
            if(errors){
                errors.forEach(error => dispatch(setAlert(error,'danger')))
            }
        })
    
}


export const deleteProduct = (data) => dispatch => {
    axios
        .delete(`/api/product/${data}`)
        .then(res=>
            dispatch({
                type: ProductActionTypes.DELETE_SUCCESS,
                payload: res.data,
            }),
            // dispatch(setAlert('Succefully uploaded','success'))
            
        )
        .catch(err =>
            dispatch({
                type: ProductActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
} 