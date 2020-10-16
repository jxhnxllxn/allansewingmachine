import { OrderActionTypes } from "./order-types";
import axios from 'axios';

export const addOrder = (data)  => {
    const request = axios
        .post('/api/order',data)
        .then(res => res.data)
        return {
            type: OrderActionTypes.ADD_ORDER,
            payload: request
        }
}


export const getAllOrder = ()  => {
    const request = axios
        .get('/api/order')
        .then(res => res.data)
        return {
            type: OrderActionTypes.GET_ALL_ORDER,
            payload: request
        }
}

export const getSingleOrder = (id)  => {
    const request = axios
        .get(`/api/order/${id}`,)
        .then(res => res.data)
        return {
            type: OrderActionTypes.GET_SINGLE_ORDER,
            payload: request
        }
}


export const getPendingOrder = ()  => {
    const request = axios.get('/api/order?status=pending&page=1&limit=20')
        .then(res => res.data)
        return {
            type: OrderActionTypes.GET_PENDING_ORDERS,
            payload: request
        }
}


export const getProcessedOrder = ()  => {
    const request = axios.get('/api/order?status=processed&page=1&limit=20')
        .then(res => res.data)
        return {
            type: OrderActionTypes.GET_PROCESSED_ORDERS,
            payload: request
        }
}


export const getCanceledOrder = ()  => {
    const request = axios.get('/api/order?status=canceled&page=1&limit=20')
        .then(res => res.data)
        return {
            type: OrderActionTypes.GET_CANCELED_ORDERS,
            payload: request
        }
}

export const getDashboardAdmin = ()  => {
    const request = axios.get('/api/order/dashboard')
        .then(res => res.data)
        return {
            type: OrderActionTypes.GET_DASHBOARD_ADMIN,
            payload: request
        }
}


export const searchCharacter = (i)  => {
    const request = axios.get(`/api/order/search/${i}`)
        .then(res => res.data)
        return {
            type: OrderActionTypes.SEARCH_CHARACTER,
            payload: request
        }
}

export const getOrderHistory = ()  => {
    const request = axios.get('/api/order/order-history')
        .then(res => res.data)
        return {
            type: OrderActionTypes.GET_ORDER_HISTORY,
            payload: request
        }
}

export const getPaypalScript = () => {
    const request = axios.get('/api/config/paypal')
    .then(res => res.data)
    return {
        type: OrderActionTypes.GET_PAYPAL_SCRIPT,
        payload:request
    }
}

export const cleanOrder = () => {
    return {
        type: OrderActionTypes.CLEAN_ORDER,
        payload: {}
    }
}