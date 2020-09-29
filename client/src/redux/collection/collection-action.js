import axios from "axios";
import { CollectionActionTypes } from "./collection-types"; 

export const getCollections = () => {
    const request = axios
        .get('/api/collection')
        .then(res => res.data);
        return {
            type: CollectionActionTypes.GET_COLLECTIONS,
            payload: request
        }
}

export const addCollection = (dataToSubmit)  => {

    const request = axios
        .post('/api/collection',dataToSubmit)
        .then(res => res.data)
        return {
            type: CollectionActionTypes.ADD_COLLECTION,
            payload: request
        }
    
}


export const deleteCollection = (data) => {
    const request = axios
        .delete(`/api/collection/${data}`)
        .then(res => res.data)

        return {
            type: CollectionActionTypes.DELETE_COLLECTION,
            payload: request
        }
} 