import React from 'react'
import CardBlockShop from './utils/card-block-shop'
const LoadMoreCards = (props) => {
    return (
        <div>
            <div>
                <CardBlockShop 
                    grid={props.grid}
                    list={props.products}
                />
            </div>
            {
                props.size > 0 && props.size >= props.limit ?
                    <div className="load_more_container">
                        <span onClick={()=>props.loadMore()}>
                            Load more
                        </span>
                    </div>
                :null
            }
            
        </div>
    )
}

export default LoadMoreCards
