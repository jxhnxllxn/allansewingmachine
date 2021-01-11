import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactComponent as GridIcon } from '../assets/icons/grid.svg'
import { ReactComponent as ListIcon } from '../assets/icons/list.svg'

const ShopToolbar = () => {
  const location = useLocation()
  return (
    <div>
      <div className='shop_toolbar'>
        <Link to='/product'>
          Shop / <span>{location.pathname.split('/')[2]}</span>{' '}
        </Link>
        <div>
          <GridIcon />
          <ListIcon />
        </div>
      </div>
    </div>
  )
}

export default ShopToolbar
