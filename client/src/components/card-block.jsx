import React from 'react'
import Product from '../components/product'

const CardBlock = (props) => {
    const renderCard= () => (
        props.list ?
            props.list.map((card,i)=><Product key={i} {...card}/> )
        :null
    )

    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title ? 
                        <div className="title">
                            {props.title}
                        </div>
                    :null
                }
                <div className="product_list">
                    {renderCard(props.list)}
                </div>
            </div>
        </div>
    )
}

export default CardBlock
