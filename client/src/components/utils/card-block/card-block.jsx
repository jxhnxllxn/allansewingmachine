import React from 'react'
import Product from '../../product/product'
import Collection from '../../collection/collection'
import './card-block.scss'

const CardBlock = (props) => {
    const renderCard= () => (
        props.list ?
            props.list.map((card,i)=>
               props.title === 'Shop' ? <Collection key={i} {...card}/> : <Product key={i} {...card}/> 
            )
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
                <div style={{
                    width:'100%',
                    display:'grid',
                    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                    gridGap: '1rem',
                    justifyContent:'center',
                    alignItems:'center'
                }}>

                    {renderCard(props.list)}

                </div>
            </div>
        </div>
    )
}

export default CardBlock
