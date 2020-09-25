import { OrderActionTypes } from "./order-types";


const initialState = {
  orders:[],

}

export default function(state = initialState, action){
    const {type,payload} = action;
    switch (type) {
        case OrderActionTypes.ADD_ORDER:
            return {
                ...state,
                ...payload,
                loading:false
            } 
            default:
                return state
        }
}