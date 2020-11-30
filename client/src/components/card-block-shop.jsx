import React from 'react'
import Product from '../components/product'

const CardBlockShop = (props) => {
  const renderCards = () =>
    props.list ? props.list.map((i, y) => <Product key={y} {...i} />) : null
  return (
    <div className='cardBlockShop'>
      <div>
        {props.list && props.list.length > 0 ? (
          <div className='cardBlockShop__list'>{renderCards(props.list)}</div>
        ) : (
          <div className='cardBlockShop__noresult'>sorry, no results</div>
        )}
      </div>
    </div>
  )
}

export default CardBlockShop
