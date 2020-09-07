import axios from "axios";
import { setAlert } from "../alert/alert-action";
import { CollectionActionTypes } from "./collection.types"; 


export const getCollections = () => dispatch => {
    axios
    .get('/collection')
    .then(res =>
        dispatch({
            type:CollectionActionTypes.GET_COLLECTIONS_SUCCESS,
            payload:res.data,
        })
    )
    .catch(err => {
        const errors = err.response.data.error.split(',');
        if(errors){
            errors.forEach(error => dispatch(setAlert(error,'danger')))
         }
         dispatch({
             type: CollectionActionTypes.GET_COLLECTIONS_FAIL,
         });
    });
}

export const addCollection = data => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'multipart/form-data'
        }
    }
    axios
    .post('/collection',data,config)
    .then(res => 
        dispatch({
            type: CollectionActionTypes.ADD_SUCCESS,
            payload: res.data
        })
    )
    .catch(err => {
        const errors = err.response.data.error.split(',');
        console.log(errors)
        if(errors){
           errors.forEach(error => dispatch(setAlert(error,'danger')))
           
        }
        dispatch({
            type: CollectionActionTypes.ADD_FAIL
        });
    })

}

export const deleteCollection = data => dispatch => {
    axios
        .delete(`/collection/${data}`)
        .then(res=>
            dispatch({
                type: CollectionActionTypes.DELETE_SUCCESS,
                payload: res.data,
            })
            // console.log(res.data)
        )
        .catch(err =>
            dispatch({
                type: CollectionActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
} 

// Clear errors
export const clearErrors = () => {
    return {
      type: CollectionActionTypes.CLEAR_ERRORS
    };
  };