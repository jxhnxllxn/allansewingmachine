import { ProductActionTypes } from "./product-types";

const initialState = {
    loading:true,
    products:[],
}

export default function(state = initialState, action){
    const {type,payload} = action;
    switch (type) {
        case ProductActionTypes.GET_COLLECTIONS_SUCCESS:
            return {
                ...state,
                products:payload.data,
                loading:false
            }
        case ProductActionTypes.ADD_SUCCESS:
            return {
                ...state,
                products:[...state.products, payload.data],
                loading:false
            }
        case ProductActionTypes.ADD_FAIL:
            return {
                ...state,
                ...payload,
                loading:false
            }
        case ProductActionTypes.DELETE_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload.data._id),
                loading:false
            }
        default:
            return state
    }
}