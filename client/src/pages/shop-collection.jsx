import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CollapseCheckBox from '../components/custom/collapse-checkbox'
import CollapseRadio from '../components/custom/collapse-radio'
import PageTop from '../components/custom/page-top'
import { getCategories, getProductsToShop } from '../redux/product/product-action'
import { price } from '../components/custom/fixed-categories'
import LoadMoreCards from '../components/load-more'


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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-template" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <rect x="4" y="4" width="16" height="4" rx="1" />
                                    <rect x="4" y="12" width="6" height="8" rx="1" />
                                    <line x1="14" y1="12" x2="20" y2="12" />
                                    <line x1="14" y1="16" x2="20" y2="16" />
                                    <line x1="14" y1="20" x2="20" y2="20" />
                                    </svg>
                                </div>

                                <div
                                    className={`grid_btn ${!state.grid ? '' : 'active'}`}
                                    onClick={() => handleGrid()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid-dots" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <circle cx="5" cy="5" r="1" />
                                    <circle cx="12" cy="5" r="1" />
                                    <circle cx="19" cy="5" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="19" r="1" />
                                    <circle cx="12" cy="19" r="1" />
                                    <circle cx="19" cy="19" r="1" />
                                    </svg>
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
