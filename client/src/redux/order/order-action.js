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


