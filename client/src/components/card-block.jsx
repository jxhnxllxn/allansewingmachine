import React from 'react'
import Product from '../components/product'
const CardBlock = ({ list, title }) => {
  const renderCard = () => list.map((i) => <Product key={i._id} {...i} />)

  return (
    <div className='card-block'>
      {title && (
        <div className='card-block__title'>
          <h1 className='heading-primary'>{title}</h1>
        </div>
      )}

      {list && list.length > 0 ? (
        <section className='card-block__list'>{renderCard(list)}</section>
      ) : (
        <div className='card-block__noresult'>sorry, no results</div>
      )}
    </div>
  )
}

export default CardBlock
