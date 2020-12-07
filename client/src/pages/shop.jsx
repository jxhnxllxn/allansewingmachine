import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsToShop } from '../redux/product/product-action'

import LoadMoreCards from '../components/load-more'
import CollapseCheckbox from '../components/collapse-checkbox'
import Loading from '../components/loading'
import { useHistory } from 'react-router-dom'

const ShopCollection = ({ match }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const productState = useSelector(({ product }) => product)
  const { loading, productToShop, productToShopSize, error } = productState

  const collectionState = useSelector(({ collection }) => collection)
  const { collections } = collectionState

  const [filter, setFilter] = useState({
    limit: 24,
    skip: 0,
    filters: {
      collectionId: [],
      price: [],
      categoryId: [],
      condition: [],
    },
  })

  useEffect(() => {
    if (match.params.collection && !loading) {
      handleFilters([match.params.collection], 'collectionId')
    } else {
      dispatch(getProductsToShop(filter.skip, filter.limit, filter.filters))
    }
    return () => {
      setFilter({
        limit: 24,
        skip: 0,
        filters: {
          collectionId: [],
          price: [],
          categoryId: [],
          condition: [],
        },
      })
    }
  }, [match.params.collection])

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
    dispatch(getProductsToShop(0, filter.limit, filters)).then(() => {
      setFilter({
        ...filter,
        skip: 0,
        filters: filters,
      })
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
      getProductsToShop(skip, filter.limit, filter.filters, productToShop)
    ).then(() => {
      setFilter({
        ...filter,
        skip: skip,
      })
    })
  }
  const handleOpened = (id) => {
    if (id === match.params.collection) {
      setFilter({
        limit: 24,
        skip: 0,
        filters: {
          collectionId: [],
          price: [],
          categoryId: [],
          condition: [],
        },
      })

      history.push('/shop')
    } else {
      history.push(`/shop/${id}`)
    }
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
                handleOpened={() => handleOpened(i._id)}
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
  )
}

export default ShopCollection
