import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToShop } from '../redux/product/product-action'

import LoadMoreCards from '../components/load-more'
import CollapseCheckbox from '../components/collapse-checkbox'
import ShopToolbar from '../components/shop-toolbar'
import Loading from '../components/loading'

const Shop = ({ match }) => {
  const dispatch = useDispatch()
  const productState = useSelector(({ product }) => product)
  const { loading, productToShop, productToShopSize, error } = productState

  const collectionState = useSelector(({ collection }) => collection)
  const { collections, loading: loadingCollection } = collectionState

  const [filter, setFilter] = useState({
    limit: 12,
    skip: 0,
    collection: '',
    filters: {
      price: [],
      categoryId: [],
    },
  })

  const conditions = [
    {
      _id: 'new',
      name: 'new',
    },
    {
      _id: 'used',
      name: 'used',
    },
    {
      _id: 'slightly',
      name: 'slightly used',
    },
  ]

  useEffect(() => {
    if (match.params.collection) {
      dispatch(
        getProductsToShop(
          0,
          filter.limit,
          match.params.collection,
          filter.filters
        )
      )
    } else if (productToShopSize === 0) {
      dispatch(
        getProductsToShop(0, filter.limit, filter.collection, filter.filters)
      )
    } else {
      return
    }

    // eslint-disable-next-line
  }, [match.params.collection])

  const showFilteredResults = (filters) => {
    if (match.params.collection) {
      dispatch(
        getProductsToShop(0, filter.limit, match.params.collection, filters)
      ).then(() => {
        setFilter({
          ...filter,
          skip: 0,
          filters: filters,
        })
      })
    } else {
      dispatch(
        getProductsToShop(0, filter.limit, filter.collection, filter.filters)
      )
    }
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
      <ShopToolbar />
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

export default Shop
