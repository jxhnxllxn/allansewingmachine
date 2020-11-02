import React from 'react'
import { useDispatch } from 'react-redux'
import { clearItem } from '../redux/cart/cart-action'

const CartItemDropdown = ({item}) => {
  
  const dispatch = useDispatch()
  
  const renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    }else{
      return '/images/sewer.jpg'
    }
  }
  console.log(item)

  const handleClearItem = () => {
    dispatch(clearItem(item))
  }

  return (
    <div className='cart-item'>
        <img src={renderCardImage(item.images)} alt='item' />
        <span className='name'>{item.name}</span>
        <span className='price'>
            {item.quantity} x ${item.price}
        </span>
        <span className='remove_button' onClick={handleClearItem}>
            &#10005;
        </span>
    </div>
  )
}

export default React.memo(CartItemDropdown)
