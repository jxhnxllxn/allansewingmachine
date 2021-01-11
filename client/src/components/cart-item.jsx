import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearItem, updateQuantity } from '../redux/cart/cart-action'
import addComma from '../utils/helper/add-comma'

const CartItem = ({ item, history }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(0)
  const quantityChange = (e) => {
    setQuantity(e.target.value)
  }
  const handleClearItem = () => {
    dispatch(clearItem(item))
  }

  const handleLinkPreview = (id) => {
    history.push(`/product/c/${id}`)
  }

  useEffect(() => {
    setQuantity(item.quantity)
  }, [item])

  useEffect(
    () => {
      if (quantity > 0) {
        dispatch(updateQuantity(item, quantity))
      }
    },
    // eslint-disable-next-line
    [quantity]
  )

  return (
    <tr className='cart-item'>
      <td
        className='cart-item__name'
        onClick={() => handleLinkPreview(item._id)}
      >
        {item.name}
      </td>
      <td className='cart-item__quantity'>
        <input
          type='number'
          name='quantity'
          onChange={quantityChange}
          value={quantity}
          min='1'
        />
      </td>
      <td className='cart-item__price'>{addComma(item.price)}</td>
      <td className='cart-item__subtotal'>
        {addComma(parseFloat(item.price * item.quantity).toFixed(2))}
      </td>
      <td className='cart-item__remove_button' onClick={handleClearItem}>
        &#10005;
      </td>
    </tr>
  )
}

export default React.memo(CartItem)
