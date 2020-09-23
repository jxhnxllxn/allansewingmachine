import { OrderActionTypes } from "./order-types";
import axios from 'axios';

export const addOrder = (dataToSubmit)  => {

    const request = axios
        .post('/api/order',dataToSubmit)
        .then(res => res.data)
        return {
            type: OrderActionTypes.ADD_ORDER,
            payload: request
        }
}


