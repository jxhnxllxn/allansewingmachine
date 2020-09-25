import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import AdminRoute from "./components/routing/AdminRoute";
import Auth from "./hoc/auth.jsx";
import Home from "./pages/user/home/home"
import Shop from "./pages/user/shop/shop";
import ShopCollection from './pages/user/shop/shop-collection/shop-collection';
import ProductPreview from './pages/user/shop/product-preview/product-preview';
import SignIn from "./pages/sign-in/sign-in";
import SignUp from "./pages/sign-up/sign-up";
import Cart from "./pages/user/dashboard/cart/cart"
import Checkout from "./pages/user/dashboard/checkout/checkout";
import Admin from "./pages/admin/admin";
// import UserDashboard from "./pages/user/dashboard/dashboard"
import Layout from "./hoc/layout"

import NotFound from "./pages/notfound/notfound";
import BranchServices from './pages/user/branch-services/branch-services.jsx';

const Routes = () => {
    return (
        <Layout>
        <Switch>
            <Route exact path='/' component={Auth(Home,null)}/>
            <Route path='/shop' component={Auth(Shop,null)} exact/>
            <Route path='/shop/:collection' component={Auth(ShopCollection,null)} exact/>
            <Route path='/product/:product' component={Auth(ProductPreview,null)} exact/>
            <Route path='/branch-services' component={Auth(BranchServices,null)} exact/>
            
            <Route path='/cart' component={Auth(Cart,null)} exact/>
            <Route path='/cart/checkout' component={Auth(Checkout,null)} exact/>
            <Route path='/signin' component={Auth(SignIn,false)}/>
            <Route path='/signup' component={Auth(SignUp,false)}/>
            <Route path="/admin" component={Auth(Admin,true,true)}/> 
            {/* <Route path="/user/dashboard" component={Auth(UserDashboard,true)}/>  */}
            <Route path="*" component={NotFound} />
        </Switch>
        </Layout>
    )
}

export default Routes
