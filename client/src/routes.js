import React, {lazy,Suspense} from 'react'
import { Switch, Route } from 'react-router-dom'

import Auth from "./components/hoc/auth"
import Home from "./pages/home"

import Layout from "./layout/layout"
import Loading from './components/loading'

import ErrorBoundary from './utils/helper/errorBoundary'

const Shop = lazy(()=>import("./pages/shop"))
const ShopCollection = lazy(()=>import("./pages/shop-collection"))
const ProductPreview = lazy(()=>import("./pages/product-preview"))
const SignIn = lazy(()=>import("./pages/sign-in"))
const SignUp = lazy(()=>import("./pages/sign-up"))
const Cart = lazy(()=>import("./pages/cart"))
const Checkout = lazy(()=>import("./pages/checkout"))
const Admin = lazy(()=>import("./pages/admin/admin"))
const UserDashboard = lazy(()=>import("./pages/dashboard"))
const UpdateProfile = lazy(()=>import("./pages/update_profile"))

const Routes = () => {
    return (
        <Layout>
             <Switch> 
                <ErrorBoundary>
                <Route exact path='/' component={Auth(Home,null)}/>
                <Suspense fallback={<Loading />}>
                    <Route path='/shop' component={Auth(Shop,null)} exact/>
                    <Route path='/shop/:collection' component={Auth(ShopCollection,null)} exact/>
                    <Route path='/shop/:collection/:product' component={Auth(ProductPreview,null)} exact/>
                    
                    <Route path='/user/cart' component={Auth(Cart,null)} exact/>
                    <Route path='/cart/checkout' component={Auth(Checkout,null)} exact/>

                    <Route path='/user/dashboard' component={Auth(UserDashboard,true)} exact/>
                    <Route path="/user/user_profile" exact component={Auth(UpdateProfile,true)}/>
            
                    <Route path='/signin' exact component={Auth(SignIn,false)}/>
                    <Route path='/signup' exact component={Auth(SignUp,false)}/>
                    <Route path="/admin" component={Auth(Admin,true,true)}/>
                </Suspense>
                </ErrorBoundary>
            </Switch>
        </Layout>
    )
}

export default Routes
