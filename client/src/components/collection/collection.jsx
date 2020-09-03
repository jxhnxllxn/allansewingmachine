import React from 'react';
import { withRouter } from 'react-router-dom';
import './collection.scss'

const Collection = ({collectionName, collectionImage, history, match}) => (

    <div className="collection" onClick={() => history.push(`${match.url}/${collectionName}`)}>
        <div className="background-image" style={{backgroundImage:`url(${collectionImage})`}}/>
        <div className="content">
            <h1 className="title">{collectionName.toUpperCase()} products</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div> 
)

export default withRouter(Collection);
