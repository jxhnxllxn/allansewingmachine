import React from 'react'
import CardBlock from './card-block'
import Loading from './loading'
const LoadMoreCards = ({ size, products, limit, loadMore, loading }) => {
  return (
    <div>
      <div>
        <CardBlock list={products} />
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
