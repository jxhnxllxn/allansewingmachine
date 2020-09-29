import axios from "axios";
import { setAlert } from "../alert/alert-action";
import { CategoryActionTypes } from "./category-types"; 

export const getCategories = () => {
    const request = axios
        .get('/api/category')
        .then(res => res.data)

        return {
            type: CategoryActionTypes.GET_CATEGORIES,
            payload: request
        }
}

export const addCategory = (dataToSubmit)  => {
    const request = axios
        .post('/api/category',dataToSubmit)
        .then(res => res.data)

        return {
            type: CategoryActionTypes.ADD_CATEGORY,
            payload: request
        }
}


export const deleteCategory = (data) => dispatch => {
    axios
        .delete(`/api/category/${data}`)
        .then(res=>
            dispatch({
                type: CategoryActionTypes.DELETE,
                payload: res.data,
            }),
            dispatch(setAlert('Succefully deleted','danger'))
        )
        .catch(err =>
            dispatch({
                type: CategoryActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
} 

export const failedAction = (data) => dispatch => {
        data.forEach(error => dispatch(setAlert(error,'danger',5000)))
}