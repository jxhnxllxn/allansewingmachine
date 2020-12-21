import React from 'react'
import CardBlockShop from './card-block-shop'
import Loading from './loading'
const LoadMoreCards = ({ size, products, limit, loadMore, loading }) => {
  return (
    <div>
      <div>
        <CardBlockShop list={products} />
      </div>
      <div className='load_more_container'>
        {loading ? (
          <Loading />
        ) : (
          size > 0 &&
          size >= limit && <h4 onClick={() => loadMore()}>Load more</h4>
        )}
      </div>
    </div>
  )
}

export default LoadMoreCards
