import React from 'react'
import Product from '../components/product'
import ArrowTitle from '../assets/images/arrow-title-1.png'


const CardBlock = (props) => {
    const renderCard= () => (
        props.list ?
            props.list.map((card,i)=><Product key={i} {...card}/> )
        :null
    )

    return (
        <div className="card-block">
            <div className="container">
                {
                    props.title ? 
                        <div className="card-block__title">
                            <span>{props.title}</span>
                            <img src={ArrowTitle} alt="arrow-title" />
                        </div>
                    :null
                }

                <div className="card-block__product-list">
                    {renderCard(props.list)}
                </div>
            </div>
        </div>
    )
}

export default CardBlock
