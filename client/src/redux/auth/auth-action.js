import axios from "axios";
// import { setAlert } from "../alert/alert-action";
import { AuthActionTypes } from "./auth-types"; 
import setAuthToken from "../../utils/setAuthToken"; 


// export const auth = () => {
//     if(localStorage.token){
//         setAuthToken(localStorage.token);
//     }
    
//     const request = axios.get('/api/auth/me')
//         .then(res => res.data)
//         .catch(err => err.data);

//     return{
//         type:AuthActionTypes.USER_LOADED,
//         payload: request
//     }
// }
// load user
export const auth = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.get('/api/auth/me');
        dispatch({
            type:AuthActionTypes.USER_LOADED,
            payload:res.data,
        });

    } catch (err) {
        dispatch({
            type:AuthActionTypes.AUTH_ERROR
        })
    }
}

//register
export const register = (dataToSubmit) => {
    const request = axios.post('/api/auth/register',dataToSubmit)
        .then(res => res.data);
        return{
            type: AuthActionTypes.REGISTER_SUCCESS,
            payload: request 
        }
    
        // const errors = err.response.data.error.split(',');
        // console.log(errors)
        // if(errors){
        //    errors.forEach(error => dispatch(setAlert(error,'danger')))
        // }
    
}

//Login User
export const login = (dataToSubmit) => {
    const request = axios.post('/api/auth/login',dataToSubmit)
            .then(res => res.data);
            return {
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: request
            }
}

//logout
export const logout = () => {
    const request = axios.get('/api/auth/logout')
    .then(response => response.data);

    return {
        type: AuthActionTypes.LOGOUT,
        payload: request
    }

    // await axios.get('/api/auth/logout');
    // dispatch({type: AuthActionTypes.LOGOUT})

}


export const checkoutCreateUser = dataToSubmit => {
    const request = axios
        .post('/api/auth/register',dataToSubmit)
        .then(res => res.data)
        return {
            type: AuthActionTypes.CHECKOUT_CREATE_USER,
            payload: request
        }
  }
  
export const checkoutUpdateUser = dataToSubmit => {
    const request = axios
        .put('/api/auth/updatedetail',dataToSubmit)
        .then(res => res.data)
        return {
            type: AuthActionTypes.CHECKOUT_UPDATE_USER,
            payload: request
        }
    
  }

//   updatepassword
  
export const updatePassword = dataToSubmit => {
    const request = axios
        .put('/api/auth/updatepassword',dataToSubmit)
        .then(res => res.data)
        return {
            type: AuthActionTypes.UPDATE_PASSWORD,
            payload: request
        }
  }