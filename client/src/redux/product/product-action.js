import axios from "axios";
// import { setAlert } from "../alert/alert-action";
import { ProductActionTypes } from "./product-types";

// api secret
// Oz_rD2QLe7_lm3sTs2sY5R0_8iA

// api key
// 495551122347166

// cloud name
// dgia0xiqo

// environment var 
// cloudinary://495551122347166:Oz_rD2QLe7_lm3sTs2sY5R0_8iA@dgia0xiqo


export const getProductDetail = (id) => {
    const request = axios
        .get(`/api/product/${id}`)
        .then(res => res.data);

        return {
            type:ProductActionTypes.GET_PRODUCT_DETAIL,
            payload:request,
        }
        
}

export const clearProductDetail = () => {
    return{
        type:ProductActionTypes.CLEAR_PRODUCT_DETAIL,
        payload:[]
    }
}

export const getProductsBySell = () => {
    const request = axios.get('/api/product?select=name,description,images,price&sort=-sold&limit=8')
            .then(res => res.data);
            return {
                type: ProductActionTypes.GET_PRODUCT_BY_SELL,
                payload: request
            }
}

export const getProductsByArrival = () => {
    const request = axios.get('/api/product?select=name,description,images,price&sort=-createdAt&limit=8')
            .then(res => res.data);
            return {
                type: ProductActionTypes.GET_PRODUCT_BY_ARRIVAL,
                payload: request
            }
}

export const getProductsToShop = (skip,limit,filters =[], previousState=[]) => {
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`/api/product/shop`,data)
            .then(res => {
                let newState = [
                    ...previousState,
                    ...res.data.articles
                ];
                return {
                    size: res.data.size,
                    articles: newState
                }
            });


            return{
                type:ProductActionTypes.GET_PRODUCTS_TO_SHOP,
                payload: request
            }
}


export const addProduct = (dataToSubmit)  => {

    const request = axios
        .post('/api/product',dataToSubmit)
        .then(res => res.data)
        // .catch(err => {
        //     err.response.data.error.split(',');
        // });

        return {
            type: ProductActionTypes.ADD_PRODUCT,
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
    const request = axios.get('/api/category?select=name')
        .then(res => res.data);
    return {
        type: ProductActionTypes.GET_CATEGORIES,
        payload: request
    }
        
}

export const getCollections = () => {
    const request = axios.get('/api/collection?select=name')
        .then(res => res.data);
    return {
        type: ProductActionTypes.GET_COLLECTIONS,
        payload: request
    }
        
}



export const failedAction = (data) => dispatch => {
    // data.forEach(error => dispatch(setAlert(error,'danger',5000)))
}