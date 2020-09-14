import axios from "axios";
import { setAlert } from "../alert/alert-action";
import { ProductActionTypes } from "./product-types";

export const getProductsBySell = (dataToSubmit) => {
    const request = axios.get('/api/product?select=productName,description,images,price&sort=-sold&limit=10')
            .then(res => res.data);
            return {
                type: ProductActionTypes.GET_PRODUCT_BY_SELL,
                payload: request
            }
}

export const getProductsByArrival = (dataToSubmit) => {
    const request = axios.get('/api/product?select=productName,description,images,price&sort=-createdAt&limit=10')
            .then(res => res.data);
            return {
                type: ProductActionTypes.GET_PRODUCT_BY_ARRIVAL,
                payload: request
            }
}

export const getProductsToShop = (skip,limit,filter = [], previosState = []) => {
    const data = {
        limit,
        skip,
        filter,
    }
    const request = axios.get('/api/product?select=productName,description,images,price&sort=-createdAt&limit=10')
            .then(res => res.data);
            return {
                type: ProductActionTypes.GET_PRODUCTS_TO_SHOP,
                payload: request
            }
}




export const getProducts = () => async dispatch => {
    axios
        .get('/api/product')
        .then(res => {
            dispatch({
                type:ProductActionTypes.GET_PRODUCTS_SUCCESS,
                payload:res.data,
            })
        })
        .catch(err => {
            dispatch({
                type: ProductActionTypes.GET_PRODUCTS_FAIL,
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
            })
        )
        .catch(err =>
            dispatch({
                type: ProductActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
}

export const getCategories = () => {
    const request = axios.get('/api/category?select=categoryName')
        .then(res => res.data);
    return {
        type: ProductActionTypes.GET_CATEGORIES,
        payload: request
    }
        
}


export const failedAction = (data) => dispatch => {
    // data.forEach(error => dispatch(setAlert(error,'danger',5000)))
}