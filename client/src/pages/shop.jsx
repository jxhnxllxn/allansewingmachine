import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToShop } from '../redux/product/product-action'

import LoadMoreCards from '../components/load-more'
import CollapseCheckbox from '../components/collapse-checkbox'
import Loading from '../components/loading'
import { Link, useLocation } from 'react-router-dom'

const ShopCollection = ({ match }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const productState = useSelector(({ product }) => product)
  const { loading, productToShop, productToShopSize, error } = productState

  const collectionState = useSelector(({ collection }) => collection)
  const { collections, loading: loadingCollection } = collectionState

  const [filter, setFilter] = useState({
    limit: 24,
    skip: 0,
    collection: '',
    filters: {
      price: [],
      categoryId: [],
    },
  })

  useEffect(() => {
    if (location.pathname !== '/shop')
      setFilter({
        ...filter,
        collection: match.params.collection,
      })
  }, [location])

  useEffect(() => {
    if (location.pathname === '/shop' && productToShop.length > 0) {
      return
    } else {
      dispatch(
        getProductsToShop(0, filter.limit, filter.collection, filter.filters)
      )
    }
  }, [filter])

  const conditions = [
    {
      _id: 'new',
      name: 'new',
    },
    {
      _id: 'used',
      name: 'used',
    },
  ]

  const showFilteredResults = (filters) => {
    setFilter({
      ...filter,
      skip: 0,
      filters: filters,
    })
  }

  const handleFilters = (filters, category) => {
    const newFilters = { ...filter.filters }
    newFilters[category] = filters
    showFilteredResults(newFilters)
  }

  const loadMoreCards = () => {
    let skip = filter.skip + filter.limit
    dispatch(
      getProductsToShop(
        skip,
        filter.limit,
        filter.collection,
        filter.filters,
        productToShop
      )
    ).then(() => {
      setFilter({
        ...filter,
        skip: skip,
      })
    })
  }

  return (
    <div className='shop'>
      <div className='shop__toolbar'>
        <Link to='/shop'>Shop / </Link>
        {location.pathname.split('/')[2]}
      </div>
      <div className='shop__content'>
        <div className='shop__filter'>
          <div className='shop__filterblock'>
            {!loadingCollection &&
              collections.map((i) => (
                <CollapseCheckbox
                  key={i._id}
                  slug={i.slug}
                  title={i.name}
                  list={i.categories}
                  initialState={match.params.collection === i.slug}
                  handleFilters={(filters) =>
                    handleFilters(filters, 'categoryId')
                  }
                />
              ))}
          </div>
          <div className='shop__filterblock'>
            <CollapseCheckbox
              title='Condition'
              initialState={true}
              list={conditions}
              handleFilters={(filters) => handleFilters(filters, 'condition')}
            />
          </div>
        </div>

        <div className='shop__products'>
          <div className='shop__pagination'></div>
          {loading ? (
            <Loading />
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <LoadMoreCards
              limit={filter.limit}
              size={productToShopSize}
              products={productToShop}
              loadMore={() => loadMoreCards()}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShopCollection
