import React, { useEffect} from 'react'
import { gsap } from 'gsap'
import { BrowserRouter as Router} from "react-router-dom"

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistore} from "./redux/store";
import { auth } from "./redux/auth/auth-action";

import useResponsiveVH from './utils/hooks/useResponsiveVH'

import Routes from './routes';
import './sass/main.scss'

const App = () => {
  useResponsiveVH()

  useEffect(() => {
    // prevents flashing
    gsap.to('body', 0, { css: { visibility: 'visible' } })

    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
  })

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