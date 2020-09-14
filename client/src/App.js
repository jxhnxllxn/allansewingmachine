import React, { Fragment} from 'react';
import { BrowserRouter as Router} from "react-router-dom";

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistore} from "./redux/store";
// import { loadUser } from "./redux/auth/auth-action";
import Routes from './routes';

import './App.scss';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
  <Provider store={store}>
    <Router>
    <PersistGate persistor={persistore}>
    <Fragment>
        <Routes />
    </Fragment>
    </PersistGate>
    </Router>
  </Provider>
)};

export default App;