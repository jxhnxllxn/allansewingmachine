import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Collection = ({images,name}) => {
  const history = useHistory()
  const match = useRouteMatch()
    const renderCardImage = (images) => {
        if(images.length > 0){
          return images[0].url
        }else{
          return '/images/sewer.jpg'
        }
      }

    const handleClick = () => {
      history.push(`${match.url}/${name}`)
    }
    
    return(
      
        <div className="collection_wrapper" onClick={handleClick}>
            <div className="background_image" 
              style={{
                background:`url(${renderCardImage(images)})`,
                backgroundSize: 'cover',
                }}/>
            <div className="content">
                <h1 className="title_collection">{name}</h1>
            </div>
        </div> 
    )
}

export default Collection;
