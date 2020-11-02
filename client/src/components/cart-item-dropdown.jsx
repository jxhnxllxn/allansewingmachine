import React from 'react'
import { useDispatch } from 'react-redux'
import { clearItem } from '../redux/cart/cart-action'

const CartItemDropdown = (props,{item}) => {
  
  const dispatch = useDispatch()
  
  const renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    }else{
      return '/images/sewer.jpg'
    }
  }
  console.log(props)

  const handleClearItem = () => {
    dispatch(clearItem(item))
  }

  return (
    <div className='cart-item'>
        <img src={renderCardImage(item.images)} alt='item' />
        <div className='item-details'>
          <span className='name'>{item.name}</span>
          <span className='price'>
              {item.quantity} x ${item.price}
          </span>
          <span className='remove-button' onClick={handleClearItem}>
              &#10005;
          </span>
        </div>
    </div>
  )
}

export default React.memo(CartItemDropdown)
