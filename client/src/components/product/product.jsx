import React from 'react'
import { Link } from 'react-router-dom'
import "./product.scss"

const product = () => {
  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
      </div>
      <div className="product-details">
        <span className="product-catagory">Women,bag</span>
        <h4><Link to="#">Women leather bag</Link></h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
        <div className="product-bottom-details">
          <div className="product-price"><small>$96.00</small>$230.99</div>
          <div className="product-links">
            <Link to="#"><i className="fa fa-heart"></i></Link>
            <Link to="#"><i className="fa fa-shopping-cart"></i></Link>
          </div>
        </div>
      </div>
	</div>
  )
}

export default product
