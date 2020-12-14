import React from 'react'

const DetailsThumb = ({ images, tab, myRef }) => {
  return (
    <div className='thumb' ref={myRef}>
      {images && images.length > 0
        ? images.map((img, index) => (
            <img src={img.url} alt='' key={index} onClick={() => tab(index)} />
          ))
        : null}
    </div>
  )
}

export default DetailsThumb
