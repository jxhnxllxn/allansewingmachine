import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/cart/cart-action'
import addComma from '../utils/helper/add-comma'

import LazyLoad from 'react-lazyload'
import { ReactComponent as CartIcon } from '../assets/icons/shopping-bag.svg'
import { useHistory } from 'react-router-dom'

const Product = ({ _id, name, price, sold, stock, images, condition }) => {
  const history = useHistory()
  const renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url
    } else {
      return '/images/sewer.jpg'
    }
  }

  const handleLinkTo = () => {
    history.push(`/shop/c/${_id}`)
  }

  const dispatch = useDispatch()
  const handleAddItem = () => {
    dispatch(
      addItem({
        _id,
        name,
        price,
        sold,
        stock,
        images,
      })
    )
  }

  return (
    <div className='product-card'>
      <div onClick={handleLinkTo}>
        <LazyLoad height={200}>
          <div
            className='product-card__photo'
            style={{
              background: `url(${renderCardImage(images)})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></div>
        </LazyLoad>

        <h2>Php {addComma(price)}.00</h2>
        <h3>
          {name}
          {condition}
        </h3>
      </div>

      <div className='product-card__actions'>
        <div className='button_wrapp'>
          <CartIcon onClick={handleAddItem} />
        </div>
      </div>
    </div>
  )
}

export default Product
