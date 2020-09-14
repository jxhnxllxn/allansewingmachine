import React from 'react'
import MyButton from '../utils/button/button'
import "./product.scss"

const renderCardImage = (images) => {
  if(images.length > 0){
    return images[0].url
  }else{
    return '/images/slide2.jpg'
  }
}

const product = (props) => {
  return (
    <div className={`card ${props.grid}`}>
        <div className="image" style={{background:`url(${renderCardImage(props.images)})`}}>
        </div>

        <div className="action_container">
            <div className="tags">
              <h3 className="category">{props.category.categoryName} </h3>
              <h2 className="name">{props.productName}</h2>
              <div className="price">Php {props.price}.00</div>
            </div>
        </div>
        {
          props.grid ? 
            <div className="description">
                {props.description}
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
                    console.log('add to cart')
                  }}
                />
            </div>
        </div>
    </div>
  )
}

export default product
