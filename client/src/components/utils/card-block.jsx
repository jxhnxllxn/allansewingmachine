import React from 'react'
import Product from '../product'
import Collection from '../collection'

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
                    display:'grid',
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 280px))",
                    gridGap: '2rem',
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
