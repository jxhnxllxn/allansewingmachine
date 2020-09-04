import React from 'react';
import { Route, Switch } from "react-router-dom";
import SideNav from '../../layout/sidebar/sidebar';

import Dashboard from "./dashboard/dashboard";
import Collection from "./collection/collection";
import Product from "./product/product";
import Notification from "./notification/notification";
import Orders from "./orders/orders";
import Order from "./order/order"
import Help from "./help/help";


import './admin.scss';


const Admin = ({match}) => {
    return (
        <div className="admin">
            <SideNav />
            <Switch>
                <Route path={`${match.path}/`} component={Dashboard} exact />
                <Route path={`${match.path}/notification`} component={Notification} exact/>
                <Route path={`${match.path}/product`} component={Product} exact/>
                <Route path={`${match.path}/collection`} component={Collection} exact/>
                <Route path={`${match.path}/orders`} component={Orders} exact/>
                <Route path={`${match.path}/orders/:id`} component={Order} exact/>
                <Route path={`${match.path}/help`} component={Help} exact/>
            </Switch>
        </div>
    )
}
export default Admin
