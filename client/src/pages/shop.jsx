import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCollections,
  getProductsToShop,
} from '../redux/product/product-action'
import LoadMoreCards from '../components/load-more'
import CollapseCheckbox from '../components/collapse-checkbox'
import Loading from '../components/loading'

const ShopCollection = ({ match }) => {
  const dispatch = useDispatch()
  const productState = useSelector(({ product }) => product)
  const { toShopSize, toShop, loading, error } = productState
  const collectionState = useSelector(({ collection }) => collection)
  const { collections } = collectionState

  const [filter, setFilter] = useState({
    limit: 5,
    skip: 0,
    filters: {
      collectionId: [],
      price: [],
      categoryId: [],
      condition: [],
    },
  })

  const collectionParams = () => {
    if (match.params.collection) {
      handleFilters([match.params.collection], 'collectionId')
    } else {
      dispatch(getProductsToShop(filter.skip, filter.limit, filter.filters))
    }
  }

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

  useEffect(() => {
    dispatch(getCollections())
    // dispatch(getProductsToShop(filter.skip, filter.limit, filter.filters))
    collectionParams()
    return () => {
      setFilter({})
    }
    // eslint-disable-next-line
  }, [])

  const handleFilters = (filters, category) => {
    const newFilters = { ...filter.filters }
    newFilters[category] = filters

    showFilteredResults(newFilters)
  }

  const showFilteredResults = (filters) => {
    dispatch(getProductsToShop(0, filter.limit, filters)).then(() => {
      setFilter({
        ...filter,
        skip: 0,
        filters: filters,
      })
    })
  }

  const loadMoreCards = () => {
    let skip = filter.skip + filter.limit
    console.log(filter)
    dispatch(
      getProductsToShop(skip, filter.limit, filter.filters, toShop)
    ).then(() => {
      setFilter({
        ...filter,
        skip: skip,
      })
    })
  }

  return (
    <div className='shop'>
      {console.log(filter)}
      <div className='shop__toolbar'>Shop / Industrial / 4threads</div>
      <div className='shop__filter'>
        <div className='shop__filterblock'>
          {collections &&
            collections.map((i) => (
              <CollapseCheckbox
                key={i._id}
                title={i.name}
                list={i.categories}
                initialState={match.params.collection === i._id}
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
        <Loading />
        {loading ? (
          <Loading />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <LoadMoreCards
            limit={filter.limit}
            size={toShopSize}
            products={toShop}
            loadMore={() => loadMoreCards()}
          />
        )}
      </div>
    </div>
  )
}

export default ShopCollection
