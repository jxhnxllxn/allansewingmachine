import React from 'react';
import { Route, Switch } from "react-router-dom";
import SideNav from '../../layout/sidebar';
import Dashboard from "./dashboard";
import Collection from "./collection";
import Product from "./product";
import ProductAdd from "./product-add";
import Category from "./category";
import Order from "./order"

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
            </Switch>
        </div>
    )
}
export default Admin
