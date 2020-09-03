import { AuthActionTypes } from "./auth-types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading:true,
    isAdmin:'null',
    user:null,
}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch (type) {
        case AuthActionTypes.USER_LOADED:
            return{
                ...state,
                isAdmin:payload.data.role,
                user:payload.data,
                isAuthenticated:true,
                loading:false,
            }

        case AuthActionTypes.LOGIN_SUCCESS:
        case AuthActionTypes.REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false,
            }

        case AuthActionTypes.REGISTER_FAIL:
        case AuthActionTypes.AUTH_ERROR:
        case AuthActionTypes.LOGIN_FAIL:
        case AuthActionTypes.LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null,
            }
    
        default:
            return state
    }
}