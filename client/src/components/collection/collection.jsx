import React from 'react';
import { withRouter } from 'react-router-dom';
import './collection.scss'

const Collection = (props) => {
    
    return(
        <div className="collection" onClick={() => props.history.push(`${props.match.url}/${props.collectionName}`)}>
            <div className="background-image" style={{backgroundImage:`url('/images/slide2.jpg')`}}/>
            <div className="content">
                <h1 className="title">{props.collectionName} Shop</h1>
            </div>
        </div> 
    )
}

export default withRouter(Collection);
