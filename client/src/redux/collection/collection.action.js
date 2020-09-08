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
        },
        onUploadProgress: progressEvent => console.log(parseInt(Math.round((progressEvent.loaded))))
    }

    try {
        const res = await axios.post('/collection',data,config);

        if(res){
            dispatch(setAlert('Succefully uploaded','success'))
            console.log('hello')
        }
        
        
        // onUploadProgress: ProgressEvent => {
        //     setUploadPercentage(
        //         console.log(
        //             parseInt(
        //                 Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //               )
        //         )
        //       );
    
        //       setTimeout(() => setUploadPercentage(0), 10000);
        // }

        dispatch({
            type: CollectionActionTypes.ADD_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        // const errors = err.response.data.error.split(',');
        // console.log(errors)
        // if(errors){
        //    errors.forEach(error => dispatch(setAlert(error,'danger')))
           
        // }
        console.log(err)
        // dispatch({
        //     type: CollectionActionTypes.ADD_FAIL,
        //     payload: err.response.data
        // });
    }
}

export const deleteCollection = (data) => dispatch => {
    axios
        .delete(`/collection/${data}`)
        .then(res=>
            dispatch({
                type: CollectionActionTypes.DELETE_SUCCESS,
                payload: res.data,
            }),
            dispatch(setAlert('Succefully uploaded','success'))
            
        )
        .catch(err =>
            dispatch({
                type: CollectionActionTypes.DELETE_FAIL,
                payload: err.response.data
            })
        )
} 