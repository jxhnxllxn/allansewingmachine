import axios from "axios";
import { AuthActionTypes } from "./auth-types";

export const auth = () => async (dispatch) => {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
         },
      };
      const { data } = await axios.get("/api/auth/me", config);
      dispatch({
         type: AuthActionTypes.USER_LOADED,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: AuthActionTypes.AUTH_ERROR,
         payload:
            error.response && error.response.data.error
               ? error.response.data.error
               : error.message,
      });
   }
};

//register
export const register = (dataToSubmit) => async (dispatch) => {
   const request = axios
      .post("/api/auth/register", dataToSubmit)
      .then((res) => res.data);
   return {
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: request,
   };

   // const errors = err.response.data.error.split(',');
   // console.log(errors)
   // if(errors){
   //    errors.forEach(error => dispatch(setAlert(error,'danger')))
   // }
};

//Login User
export const login = (dataToSubmit) => {
   const request = axios
      .post("/api/auth/login", dataToSubmit)
      .then((res) => res.data);
   return {
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: request,
   };
};

//logout
export const logout = () => {
   const request = axios
      .get("/api/auth/logout")
      .then((response) => response.data);

   return {
      type: AuthActionTypes.LOGOUT,
      payload: request,
   };

   // await axios.get('/api/auth/logout');
   // dispatch({type: AuthActionTypes.LOGOUT})
};

export const checkoutCreateUser = (dataToSubmit) => {
   const request = axios
      .post("/api/auth/register", dataToSubmit)
      .then((res) => res.data);
   return {
      type: AuthActionTypes.CHECKOUT_CREATE_USER,
      payload: request,
   };
};

export const checkoutUpdateUser = (dataToSubmit) => async (dispatch) => {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
         },
      };
      const { data } = await axios.get(
         "/api/auth/updatedetail",
         dataToSubmit,
         config
      );
      dispatch({
         type: AuthActionTypes.CHECKOUT_UPDATE_USER,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: AuthActionTypes.AUTH_ERROR,
         payload:
            error.response && error.response.data.error
               ? error.response.data.error
               : error.message,
      });
   }
};

//   updatepassword

export const updatePassword = (dataToSubmit) => {
   const request = axios
      .put("/api/auth/updatepassword", dataToSubmit)
      .then((res) => res.data);
   return {
      type: AuthActionTypes.UPDATE_PASSWORD,
      payload: request,
   };
};
