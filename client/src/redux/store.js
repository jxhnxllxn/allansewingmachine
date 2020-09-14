import { createStore, applyMiddleware} from "redux";
import promiseMiddleware from "redux-promise";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const initialState = {};

const middleware = [promiseMiddleware,thunk];

export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

export const persistore = persistStore(store);

export default {store, persistore};