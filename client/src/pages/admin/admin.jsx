import React, {lazy,Suspense} from 'react';
import { Route, Switch } from "react-router-dom";
import Loading from '../../components/loading';
import SideNav from '../../layout/sidebar';

const Dashboard = lazy(()=>import('./dashboard'))
const Collection = lazy(()=>import('./collection'))
const Product = lazy(()=>import('./product'))
const ProductAdd = lazy(()=>import('./product-add'))
const Category = lazy(()=>import('./category'))
const Order = lazy(()=>import('./order'))

const Admin = ({match}) => {
    return (
        <div className="admin">
            <SideNav />
            <Switch>
                <Suspense fallback={<Loading />}>
                    <Route path={`${match.path}`} component={Dashboard} exact />
                    <Route path={`${match.path}/product`} component={Product} exact/>
                    <Route path={`${match.path}/product/add`} component={ProductAdd} exact/>
                    <Route path={`${match.path}/collection`} component={Collection} exact/>
                    <Route path={`${match.path}/category`} component={Category} exact/>
                    <Route path={`${match.path}/order/:id`} component={Order} exact/>
                </Suspense>
            </Switch>
        </div>
    )
}
export default Admin
