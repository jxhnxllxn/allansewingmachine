import React from 'react'
import { useDispatch } from 'react-redux'
import {addItem} from '../redux/cart/cart-action'
import addComma from "../utils/helper/add-comma"

import LazyLoad from 'react-lazyload'
import { withRouter } from 'react-router-dom'
import { ReactComponent as CartIcon } from "../assets/icons/shopping-bag.svg"

const Product = ({_id,name,price,collectionId,sold,stock,images,grid,description,history}) => {

  const renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    }else{
      return '/images/sewer.jpg'
    }
  }
  
  const handleLinkTo = () => {
    history.push(`/shop/${collectionId.name}/${_id}`)
  }


  const dispatch = useDispatch()
  const handleAddItem = () => {
    dispatch(addItem({
      _id,name,price,collectionId,sold,stock,images
    }))
  }
  
  return (
    <div className={`product_wrapper card ${grid}`}>
    <div onClick={handleLinkTo}>
      <LazyLoad height={200}>
        <div className="image" style={{background:`url(${renderCardImage(images)})`,backgroundSize:'cover'}}>
        </div>
      </LazyLoad>

      <h2>Php {addComma(price)}.00</h2>
      <h3>{name}</h3>
      {grid ? <h4>{description}</h4> : null}
    </div>

    <div className="actions">
      <div className="button_wrapp">
        <CartIcon onClick={handleAddItem} />
      </div>
    </div>
    </div>
    
  )
}

export default withRouter(Product)
