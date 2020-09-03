import { UserActionTypes } from "./user-types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/v1/auth/register", userData)
    .then(res => 
        console.log(res)
        // history.push("/shop")
        ) // re-direct to login on successful register
    .catch(err =>
        console.log(err)
    //   dispatch({
    //     type: UserActionTypes.GET_ERRORS,
    //     payload: err.response.data
    //   })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/v1/auth/login", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: UserActionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: UserActionTypes.USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};