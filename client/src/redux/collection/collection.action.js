import axios from "axios";
import { setAlert } from "../alert/alert-action";
import { CollectionActionTypes } from "./collection.types"; 



export const getCollections = () => async dispatch => {
    try {
        const res = await axios.get('/collection');
        dispatch({
            type:CollectionActionTypes.GET_COLLECTIONS_SUCCESS,
            payload:res.data,
        });

    } catch (err) {
        const errors = err.response.data.error.split(',');
        console.log(errors)
        if(errors){
           errors.forEach(error => dispatch(setAlert(error,'danger')))
        }
        dispatch({
            type: CollectionActionTypes.GET_COLLECTIONS_FAIL,
        });
    }
}

export const addCollection = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }

    try {
        const res = await axios.post('/collection',data,config);
        console.log(res)
        dispatch({
            type: CollectionActionTypes.ADD_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.error.split(',');
        console.log(errors)
        if(errors){
           errors.forEach(error => dispatch(setAlert(error,'danger')))
        }
        dispatch({
            type: CollectionActionTypes.ADD_FAIL
        });
    }
}