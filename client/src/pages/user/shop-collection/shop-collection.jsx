import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CollapseCheckBox from '../../../components/utils/collapse-checkbox/collapse-checkbox'
import CollapseRadio from '../../../components/utils/collapse-radio/collapse-radio'
import PageTop from '../../../components/utils/page-top/page-top'
import {getCategories,getProductsToShop} from '../../../redux/product/product-action'
import { store } from '../../../redux/store'
import {price} from '../../../components/utils/fixed-categories'


const ShopCollection = () => {
    const products = useSelector(state => state.product)

    const [state, setState] = useState({
        grid:'',
        limit:6,
        skip:0,
        filters:{
            categories:[],
            price:[]
        }
    })

    console.log(state.filters)

    useEffect(() => {
        store.dispatch(getCategories());
        store.dispatch(getProductsToShop(state.skip,state.limit,state.filters))
    }, []);

    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for(let key in data){
            if(data[key]._id ===parseInt(value,10)){
                array = data[key].array
            }
        }
        return array;

    }

    const handleFilters = (filters,category) =>{
        const newFilters = {...state.filters}
        newFilters[category] = filters;

        if(category === "price"){
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues
        }

        setState({
            ...state,
            filters:newFilters
        })
    }

    return (

        <div>
            <PageTop title="Browse Product"/>

            <div className="container">
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckBox 
                            initState={true}
                            title="Categories"
                            list={products.categories}
                            handleFilters={(filter)=> handleFilters(filter,'category')}
                        />
                        <CollapseRadio 
                            initState={false}
                            title="price"
                            list={price}
                            handleFilters={(filter)=> handleFilters(filter,'price')}
                        />
                    </div>
                    <div className="right">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopCollection
