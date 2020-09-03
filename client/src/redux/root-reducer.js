import { combineReducers } from "redux";
import alert from "./alert/alert-reducer";
import auth from "./auth/auth-ruducer";
import cart from "./cart/cart.reducer"
// import profile from "./profile/profile-reducer";
// import authReducer from "./user/user-reducer";
// import errorReducer from "./error/error-reducer";

export default combineReducers({
    alert,
    auth,
    cart
    // profile,
})  