import React from 'react'
import Product from '../components/product'

const CardBlockShop = (props) => {
    const renderCards = () => (
        props.list ?
            props.list.map(cards => (
                <Product 
                    key={cards._id}
                    {...cards}
                    grid={props.grid}
                />
            ))
        :null
    )
    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.list ?
                        props.list.length === 0 ?
                            <div className="no_result">
                                sorry, no results
                            </div>
                            :null
                    :null}
                    <div style={{
                    width:'100%',
                    display:'grid',
                    gridTemplateColumns: props.grid === "grid_bars" ? "" : "repeat(auto-fill, minmax(240px, 1fr))",
                    }}>

                    {renderCards(props.list)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardBlockShop
