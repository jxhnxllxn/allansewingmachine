import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeSlider from '../components/slider';
import CardBlock from '../components/custom/card-block';
import { getProductsByArrival, getProductsBySell } from "../redux/product/product-action";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductsByArrival());
        dispatch(getProductsBySell());
    }, [dispatch]);
    const productBySell = useSelector(state => state.product.productBySell)
    const productByArrival = useSelector(state => state.product.productByArrival)
    return (
        <div className="home_wrapper">
            <HomeSlider />
            <CardBlock
                list={productBySell}
                title="Best Seller"
            />
            <CardBlock
                list={productByArrival}
                title="New Arrival"
            />
        </div>
    )
}

export default Home
