import React from 'react'
import Product from '../components/product'

const CardBlockShop = ({ list }) => {
  const renderCards = () =>
    list ? list.map((i, y) => <Product key={y} {...i} />) : null
  return (
    <div className='cardBlockShop'>
      <div>
        {list && list.length > 0 ? (
          <div className='cardBlockShop__list'>{renderCards(list)}</div>
        ) : (
          <div className='cardBlockShop__noresult'>sorry, no results</div>
        )}
      </div>
    </div>
  )
}

export default CardBlockShop
