import { UserActionTypes } from "./user-types";

const isEmpty = require("is-empty");

const INITIAL_STATE = {
    isAuthenticated: false,
    user: {},
    loading: false
}
const userReducer = (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case UserActionTypes.USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}

export default userReducer;