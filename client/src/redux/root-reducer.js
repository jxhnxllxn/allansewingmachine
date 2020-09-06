import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import alert from "./alert/alert-reducer";
import auth from "./auth/auth-ruducer";
import cart from "./cart/cart.reducer"
import collection from "./collection/collection.reducer"
// import profile from "./profile/profile-reducer";
// import authReducer from "./user/user-reducer";
// import errorReducer from "./error/error-reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['auth','cart','collection']
}

const rootReducer = combineReducers({
    alert,
    auth,
    collection,
    cart
})

export default persistReducer(persistConfig, rootReducer);
