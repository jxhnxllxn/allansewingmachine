import React, { useEffect} from 'react';
import { BrowserRouter as Router} from "react-router-dom";

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistore} from "./redux/store";
import { auth } from "./redux/auth/auth-action";
import Routes from './routes';
import './sass/main.scss'

const App = () => {
  useEffect(() => {
    store.dispatch(auth());
  }, []);

  return (
  <Provider store={store}>
    <Router>
    <PersistGate persistor={persistore}>
    <>
        <Routes />
    </>
    </PersistGate>
    </Router>
  </Provider>
)};

export default App;