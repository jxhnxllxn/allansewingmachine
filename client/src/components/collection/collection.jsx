import React from 'react';
import { withRouter } from 'react-router-dom';
import './collection.scss'

const Collection = (props) => {
    const renderCardImage = (images) => {
        if(images.length > 0){
          return images[0].url
        }else{
          return '/images/slide2.jpg'
        }
      }

    const handleClick = () => {
      props.history.push(`${props.match.url}/${props._id}`)
    }
    
    return(
        <div className="collection_wrapper" onClick={handleClick}>
            <div className="background_image" style={{background:`url(${renderCardImage(props.images)})`,backgroundSize: 'cover'}}/>
            <div className="content">
                <h1 className="title">{props.name} Shop</h1>
            </div>
        </div> 
    )
}

export default withRouter(Collection);
