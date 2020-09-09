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

    const config = {
        headers: {
            'Content-Type':'multipart/form-data'
        },
        onUploadProgress: progressEvent => (parseInt(Math.round((progressEvent.loaded))))
    }

    axios
        .post('/api/collection',data,config)
        .then(res => {
            dispatch({
                type: CollectionActionTypes.ADD_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            const errors = err.response.data.error.split(',');
            console.log(errors)
            if(errors){
                errors.forEach(error => dispatch(setAlert(error,'danger')))
            }
        })
    
}


export const deleteCollection = (data) => dispatch => {
    axios
        .delete(`/api/collection/${data}`)
        .then(res=>
            dispatch({
                type: CollectionActionTypes.DELETE_SUCCESS,
                payload: res.data,
            }),
            // dispatch(setAlert('Succefully uploaded','success'))
            
        )
        .catch(err =>
            dispatch({
                type: CollectionActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
} 