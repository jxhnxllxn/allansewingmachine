import axios from "axios";
import { setAlert } from "../alert/alert-action";
import { AuthActionTypes } from "./auth-types"; 
import setAuthToken from "../../utils/setAuthToken";
//load user
export const loadUser = () => async dispatch => {
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
export const register = ({name,email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password});

    try {
        const res = await axios.post('/api/auth/register',body,config);

        dispatch({
            type: AuthActionTypes.REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.error.split(',');
        console.log(errors)
        if(errors){
           errors.forEach(error => dispatch(setAlert(error,'danger')))
        }
        dispatch({
            type: AuthActionTypes.REGISTER_FAIL
        });
    }
}

//Login User
export const login = (email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/auth/login',body,config);

        dispatch({  
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.error.split(',');
        // console.log(err)
        if(errors){
           errors.forEach(error => dispatch(setAlert(error,'danger')))
        }
        dispatch({
            type: AuthActionTypes.LOGIN_FAIL
        });
        dispatch(logout());
        console.log(err)
    }
}

//logout
export const logout = () => async dispatch => {
    await axios.get('/api/auth/logout');
    dispatch({type: AuthActionTypes.LOGOUT})
}
