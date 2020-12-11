import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearItem, updateQuantity } from '../redux/cart/cart-action'
import addComma from '../utils/helper/add-comma'

const SideNavCartItem = ({ item }) => {
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(item.quantity)

  const quantityChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleClearItem = () => {
    dispatch(clearItem(item))
  }
  // useEffect(() => {
  //   setQuantity(item.quantity)
  // }, [])

  useEffect(
    () => {
      if (quantity > 0) {
        dispatch(updateQuantity(item, quantity))
      }
    },
    // eslint-disable-next-line
    [dispatch, quantity]
  )

  return (
    <tr className='sidenav-cart-item'>
      <td className='sidenav-cart-item__name'>{item.name}</td>
      <td className='sidenav-cart-item__quantity'>
        <input
          type='number'
          name='quantity'
          onChange={quantityChange}
          value={quantity}
          min='1'
        />
      </td>
      <td className='sidenav-cart-item__price'>{addComma(item.price)}</td>
      <td className='sidenav-cart-item__subtotal'>
        {addComma(item.price * item.quantity)}
      </td>
      <td
        className='sidenav-cart-item__remove_button'
        onClick={handleClearItem}
      >
        &#10005;
      </td>
    </tr>
  )
}

export default React.memo(SideNavCartItem)
