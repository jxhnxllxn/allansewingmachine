import React from 'react';
import { withRouter } from 'react-router-dom';
import './collection.scss'

const Collection = ({collectionName,collectionPhoto, history, match}) => {
    
    return(
        <div className="collection" onClick={() => history.push(`${match.url}/${collectionName}`)}>
            <div className="background-image"/>
            <div className="content">
                <h1 className="title">{collectionName} Shop</h1>
            </div>
        </div> 
    )
}

export default withRouter(Collection);
