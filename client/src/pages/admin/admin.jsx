import React from 'react';
import { Route, Switch } from "react-router-dom";
import SideNav from '../../components/sidebar/sidebar';
import Dashboard from "./dashboard/dashboard";
import Collection from "./collection/collection";
import Product from "./product/product";
import ProductAdd from "./product-add/product-add";
import Category from "./category/category";
import Order from "./order/order"
import Help from "./help/help";


import './admin.scss';


const Admin = ({match}) => {
    return (
        <div className="admin">
            <SideNav />
            <Switch>
                <Route path={`${match.path}`} component={Dashboard} exact />
                <Route path={`${match.path}/product`} component={Product} exact/>
                <Route path={`${match.path}/product/add`} component={ProductAdd} exact/>
                <Route path={`${match.path}/collection`} component={Collection} exact/>
                <Route path={`${match.path}/category`} component={Category} exact/>
                <Route path={`${match.path}/order/:id`} component={Order} exact/>
                <Route path={`${match.path}/help`} component={Help} exact/>
            </Switch>
        </div>
    )
}
export default Admin
