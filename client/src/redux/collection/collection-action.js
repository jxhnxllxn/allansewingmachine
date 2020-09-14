import axios from "axios";
import { setAlert } from "../alert/alert-action";
import { CollectionActionTypes } from "./collection-types"; 

export const getCollections = () => async dispatch => {
    axios
        .get('/api/collection')
        .then(res => {
            dispatch({
                type:CollectionActionTypes.GET_COLLECTIONS_SUCCESS,
                payload:res.data,
            })
        })
        .catch(err => {
            dispatch({
                type: CollectionActionTypes.GET_COLLECTIONS_FAIL,
                payload: err.response.data
            });
        })
}

export const addCollection = (data) => async dispatch => {
    dispatch(setAlert('File Uploaded','success'));
    dispatch({
        type: CollectionActionTypes.ADD_SUCCESS,
        payload: data,
    });
}


export const deleteCollection = (data) => dispatch => {
    axios
        .delete(`/api/collection/${data}`)
        .then(res=>
            dispatch({
                type: CollectionActionTypes.DELETE_SUCCESS,
                payload: res.data,
            }),
            dispatch(setAlert('Succefully deleted','danger'))
        )
        .catch(err =>
            dispatch({
                type: CollectionActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
} 

export const failedAction = (data) => dispatch => {
        data.forEach(error => dispatch(setAlert(error,'danger',5000)))
}