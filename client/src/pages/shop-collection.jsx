import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollapseCheckBox from '../components/custom/collapse-checkbox'
import CollapseRadio from '../components/custom/collapse-radio'
import PageTop from '../components/custom/page-top'
import { getCategories, getProductsToShop } from '../redux/product/product-action'
import { price } from '../components/custom/fixed-categories'
import LoadMoreCards from '../components/load-more'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTh } from '@fortawesome/free-solid-svg-icons';


const ShopCollection = (props) => {
    const products = useSelector(state => state.product)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        grid: '',
        limit: 20,
        skip: 0,
        filters: {
            collections: [props.match.params.collection],
            categories: [],
            price: []
        }
    })

    useEffect(() => {

        dispatch(getCategories());
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

    const handleGrid = () => {
        setState({
            ...state,
            grid: !state.grid ? 'grid_bars' : ''
        })
    }

    return (

        <div className="shop_collection_wrapper">
            <PageTop className="page_title" title="Browse Product" />

            <div>
                <div className="shop_wrapper">
                    <div className="left">
                        <CollapseCheckBox
                            initState={true}
                            title="Categories"
                            list={products.categories}
                            handleFilters={(filter) => handleFilters(filter, 'category')}
                        />
                        <CollapseRadio
                            initState={false}
                            title="price"
                            list={price}
                            handleFilters={(filter) => handleFilters(filter, 'price')}
                        />
                    </div>
                    <div className="right">
                        <div className="shop_options">
                            <div className="shop_grids clear">
                                <div
                                    className={`grid_btn ${state.grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <FontAwesomeIcon icon={faTh} />
                                </div>

                                <div
                                    className={`grid_btn ${!state.grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </div>

                            </div>
                        </div>
                        <div>
                            <LoadMoreCards
                                grid={state.grid}
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
