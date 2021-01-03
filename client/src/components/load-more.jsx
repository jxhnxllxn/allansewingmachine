import React from 'react'
import CardBlock from './card-block'
const LoadMoreCards = ({ size, products, limit, loadMore }) => {
  return (
    <>
      <CardBlock list={products} />
      <div className='load_more_container'>
        {size > 0 && size >= limit && (
          <h4 onClick={() => loadMore()}>Load more</h4>
        )}
      </div>
    </>
  )
}

export default LoadMoreCards
