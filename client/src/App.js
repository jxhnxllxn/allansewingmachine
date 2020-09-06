import React, { Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistore} from "./redux/store";
import { loadUser } from "./redux/auth/auth-action";
import AdminRoute from "./components/routing/AdminRoute";

import Shop from "./pages/user/shop/shop";
import SignIn from "./pages/sign-in/sign-in";
import SignUp from "./pages/sign-up/sign-up";
import Admin from "./pages/admin/admin";

import NotFound from "./pages/notfound/notfound";
import CollectionItem from "./components/collection-item/collection-item";
import Header from "./layout/header/header";
import Alert from "./shared/alert/alert";


import './App.scss';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
    <PersistGate persistor={persistore}>
    <Fragment>
    <Header/>
        <Alert />
        <Switch>
          <Route exact path='/' component={CollectionItem}/>
          <Route path='/shop' component={Shop}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <AdminRoute path="/admin" component={Admin}/> 
          <Route path="*" component={NotFound} />
        </Switch>
          
    </Fragment>
    </PersistGate>
    </Router>
  </Provider>
)};
export default App;