import { AuthActionTypes } from "./auth-types";

const initialState = {
   token: localStorage.getItem("token"),
   isAuthenticated: false,
   isAdmin: false,
   userData: null,
   loading: true,
};

export default function (state = initialState, action) {
   const { type, payload } = action;
   switch (type) {
      case AuthActionTypes.USER_LOADED:
         return {
            ...state,
            ...payload,
            loading: false,
         };
      case AuthActionTypes.LOGIN_SUCCESS:
      case AuthActionTypes.REGISTER_SUCCESS:
      case AuthActionTypes.CHECKOUT_CREATE_USER:
         localStorage.setItem("token", payload.token);
         return {
            ...state,
            ...payload,
            loading: false,
         };

      case AuthActionTypes.REGISTER_FAIL:
      case AuthActionTypes.LOGIN_FAIL:
      case AuthActionTypes.LOGOUT:
         localStorage.removeItem("token");
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            userData: null,
            isAdmin: false,
            loading: false,
         };
      case AuthActionTypes.AUTH_ERROR:
         return {
            token: null,
            isAuthenticated: false,
            userData: null,
            isAdmin: false,
            loading: false,
            error: payload,
         };

      case AuthActionTypes.CHECKOUT_UPDATE_USER:
         return {
            ...state,
            data: payload.data,
         };
      default:
         return state;
   }
}
