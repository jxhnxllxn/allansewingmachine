import React from 'react'
import CardBlockShop from './card-block-shop'
const LoadMoreCards = ({ size, products, limit, loadMore }) => {
  return (
    <div>
      <div>
        <CardBlockShop list={products} />
      </div>
      {size > 0 && size >= limit ? (
        <div className='load_more_container'>
          <span onClick={() => loadMore()}>Load more</span>
        </div>
      ) : null}
    </div>
  )
}

export default LoadMoreCards
