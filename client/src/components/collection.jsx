import React from 'react';
import { withRouter } from 'react-router-dom';

const Collection = (props) => {
    const renderCardImage = (images) => {
        if(images.length > 0){
          return images[0].url
        }else{
          return '/images/sewer.jpg'
        }
      }

    const handleClick = () => {
      props.history.push(`${props.match.url}/${props._id}`)
    }
    
    return(
        <div className="collection_wrapper" onClick={handleClick}>
            <div className="background_image" 
              style={{
                background:`url(${renderCardImage(props.images)})`,
                backgroundSize: 'cover',
                }}/>
            <div className="content">
                <h1 className="title_collection">{props.name}</h1>
            </div>
        </div> 
    )
}

export default withRouter(Collection);
