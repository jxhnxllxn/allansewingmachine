import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const ShopToolbar = () => {
  const location = useLocation()
  return (
    <div>
      <div className='shop_toolbar'>
        <Link to='/shop'>
          Shop / <span>{location.pathname.split('/')[2]}</span>{' '}
        </Link>
      </div>
    </div>
  )
}

export default ShopToolbar
