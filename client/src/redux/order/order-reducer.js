import { OrderActionTypes } from "./order-types";


const initialState = {
  loading:true,
  orders:[],
  countDash:{pendingCount:0,allCount:0,processedCount:0,canceledCount:0},
  orderHistory:[]
}

export default function(state = initialState, action){
    const {type,payload} = action;
    switch (type) {

        case OrderActionTypes.GET_ALL_ORDER:
        case OrderActionTypes.GET_CANCELED_ORDERS:
        case OrderActionTypes.GET_PROCESSED_ORDERS:
        case OrderActionTypes.GET_PENDING_ORDERS:
        case OrderActionTypes.SEARCH_CHARACTER:
            return {
                ...state,
                orders:[payload.data],
                loading:false
            } 

        case OrderActionTypes.ADD_ORDER:
            return {
                ...state,
                orders:[...state.orders,payload.data],
                loading:false
            } 
        

        case OrderActionTypes.GET_DASHBOARD_ADMIN:
            return {
                ...state,
                loading:false,
                countDash:payload.count
            }
        case OrderActionTypes.GET_ORDER_HISTORY:
            return {
                ...state,
                loading:false,
                orderHistory:[payload.data]
            }

        default:
            return state

        
    }
}