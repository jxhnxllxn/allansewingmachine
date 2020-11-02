import React from 'react'
import { useDispatch } from 'react-redux';
import {addItem} from '../redux/cart/cart-action'
import addComma from "../utils/helper/add-comma";
import MyButton from './button'

import LazyLoad from 'react-lazyload';

const Product = ({_id,name,price,collectionId,sold,stock,images,grid,description}) => {

  const renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    }else{
      return '/images/sewer.jpg'
    }
  }


  const dispatch = useDispatch()
  const handleAddItem = () => {
    dispatch(addItem({
      _id,name,price,collectionId,sold,stock,images
    }))
  }
  
  return (
    <div className={`product_wrapper card ${grid}`}>
      <LazyLoad height={200}>
          <div className="image" style={{background:`url(${renderCardImage(images)})`,backgroundSize:'cover'}}>
          </div>
      </LazyLoad>
      
      <h2>Php {addComma(price)}.00</h2>
      <h3>{name}</h3>
      <div className="actions">
          <div className="button_wrapp">
              <MyButton 
                type="bag_link"
                runAction={handleAddItem}
              />
          </div>
        </div>
    </div>
  )
}

export default Product
