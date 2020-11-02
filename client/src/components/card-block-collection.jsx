import React from 'react'
import Collection from './collection'

const CardBlock = (props) => {
    const renderCard= () => (
        props.list ?
            props.list.map((card,i)=> <Collection key={i} {...card}/>)
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
                    gridTemplateColumns: "repeat(auto-fit, 15rem)",
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
