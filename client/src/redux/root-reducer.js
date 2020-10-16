import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import alert from "./alert/alert-reducer";
import auth from "./auth/auth-ruducer";
import cart from "./cart/cart-reducer"
import collection from "./collection/collection-reducer"
import category from "./category/category-reducer"
import product from "./product/product-reducer" 
import order from "./order/order-reducer"
import ui from "./ui/ui-reducer"

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart']
}

const rootReducer = combineReducers({
    alert,
    auth,
    collection,
    category,
    product,
    cart,
    order,
    ui
})

export default persistReducer(persistConfig, rootReducer);
