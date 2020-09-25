import React from 'react'
import { useDispatch } from 'react-redux';
import {addItem} from '../../redux/cart/cart-action'
import MyButton from '../utils/button/button'
import "./product.scss"

const renderCardImage = (images) => {
  if(images.length > 0){
    return images[0].url
  }else{
    return '/images/slide2.jpg'
  }
}

const Product = (props) => {
  const dispatch = useDispatch()
  
  return (
    <div className={`card ${props.grid}`} >
        <div className="image" style={{background:`url(${renderCardImage(props.images)})`,backgroundSize:'cover'}}>
        </div>

        <div className="action_container">
            <div className="tags">
              <h3 className="category">{props.category.categoryName} </h3>
              <h2 className="name">{props.name}</h2>
              <div className="price">Php {props.price}.00</div>
            </div>
        {
          props.grid ? 
            <div className="description">
                {props.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nostrum possimus, molestiae sapiente error aliquam accusantium quia corrupti ex alias veritatis ducimus. Iusto, cupiditate voluptate dignissimos iure corporis laudantium.
            </div>
          :null
        }
        <div className="actions">
            <div className="button_wrapp">
              <MyButton 
                type="default"
                altClass="card_link"
                title="View product"
                linkTo={`/product/${props._id}`}
              />
            </div>
            <div className="button_wrapp">
                <MyButton 
                  type="bag_link"
                  runAction={()=>{
                    dispatch(addItem({
                      _id:props._id,
                      name:props.name,
                      images:props.images,
                      price:props.price,
                      collection:props.collections.name,
                      category:props.category.name,
                      sold:props.sold,
                      available:props.available,
                    }))

                  }}
                />
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Product
