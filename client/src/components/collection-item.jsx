import React, { Component } from 'react';
import Product from "./product";
class collectionItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product:[
                {
                    id:1,
                    productName:'dogFoodName',
                    productDesc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quiptas?',
                    productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLro5TJcERpkPs-qM-6iCmrHvQkAmqqfwj7A&usqp=CAU',
                    price:'20.00'
                },
                {
                    id:2,
                    productName:'dogFoodName',
                    productDesc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas?',
                    productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLro5TJcERpkPs-qM-6iCmrHvQkAmqqfwj7A&usqp=CAU',
                    price:'20.00'
                },
                {
                    id:3,
                    productName:'dogFoodName',
                    productDesc:'Lorem, ipsum dolor sit amet consecteturing elit. Quisquam, voluptas?',
                    productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLro5TJcERpkPs-qM-6iCmrHvQkAmqqfwj7A&usqp=CAU',
                    price:'20.00'
                },
                {
                    id:4,
                    productName:'dogFoodName',
                    productDesc:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas?',
                    productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLro5TJcERpkPs-qM-6iCmrHvQkAmqqfwj7A&usqp=CAU',
                    price:'20.00'
                },
                {
                    id:5,
                    productName:'dogFoodName',
                    productDesc:'Lorem, ipsum dolor sit amet consectetur adipisicinsquam, voluptas?',
                    productImage:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSLro5TJcERpkPs-qM-6iCmrHvQkAmqqfwj7A&usqp=CAU',
                    price:'20.00'
                }
            ]   
        }
    }

    render() {
        return (
            <div className="collection-item">
                <div className="addCollection">
                    <div className="add"></div>
                </div>
                {
                    this.state.product.map(({id,...otherProps}) => (
                        <Product key={id} {...otherProps} />
                    ))
                }
            </div>
        )
    }
}

export default collectionItem
