import React, { useEffect} from 'react'
import { gsap } from 'gsap'

//redux
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistore} from "./redux/store";
import { auth } from "./redux/auth/auth-action";
import landingAnimation from './utils/animations/landingAnimation'
import useResponsiveVH from './utils/hooks/useResponsiveVH'

import Routes from './routes';

const App = () => {
  useResponsiveVH()
  
  const token = useSelector(({ auth }) => auth.token)

  useEffect(() => {
    //prevent flashing
    gsap.to('body', { css: { visibility: 'visible' } })

    window.onbeforeunload = () => window.scrollTo(0, 0)

    landingAnimation()

    if (token) {    
      store.dispatch(auth());
    }
  }, [token]);


  return (
    <PersistGate persistor={persistore}>
    <>
        <Routes />
    </>
    </PersistGate>
)};

export default App;