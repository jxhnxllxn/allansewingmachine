import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollapseRadio from '../components/collapse-radio'
import PageTop from '../components/page-top'
import { getProductsToShop } from '../redux/product/product-action'
import { price } from '../components/fixed-categories'
import LoadMoreCards from '../components/load-more'


const ShopCollection = (props) => {
    const products = useSelector(({product}) => product)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        limit: 20,
        skip: 0,
        filters: {
            collections: [props.match.params.collection],
            price: []
        }
    })

    useEffect(() => {
        dispatch(getProductsToShop(state.skip, state.limit, state.filters));
        // eslint-disable-next-line
    }, [dispatch]);

    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }
        return array;

    }


    const handleFilters = (filters, category) => {
        const newFilters = { ...state.filters }
        newFilters[category] = filters;

        if (category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)

        setState({
            ...state,
            filters: newFilters
        })
    }

    const showFilteredResults = (filters) => {
        dispatch(getProductsToShop(
            0,
            state.limit,
            filters
        )).then(() => {
            setState({
                ...state,
                skip: 0
            })
        })
    }

    const loadMoreCards = () => {
        let skip = state.skip + state.limit;
        dispatch(getProductsToShop(
            skip,
            state.limit,
            state.filters,
            products.toShop,
        )).then(() => {
            setState({
                ...state,
                skip
            })
        })
    }

    return (

        <div className="shop_collection_wrapper">
            <div>
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseRadio
                            initState={false}
                            title="price"
                            list={price}
                            handleFilters={(filter) => handleFilters(filter, 'price')}
                        />
                    </div>
                    <div className="right">
                        <div className="shop_options">
                        </div>
                        <div>
                            <LoadMoreCards
                                limit={state.limit}
                                size={products.toShopSize}
                                products={products.toShop}
                                loadMore={() => loadMoreCards()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopCollection
