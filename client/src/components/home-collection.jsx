import React from 'react'
import { useHistory } from 'react-router-dom'

const Collection = ({ collections }) => {
  const history = useHistory()
  const renderCardImage = (images) => {
    if (images.length > 0) {
      return `/images/collections/${images}`
    } else {
      return '/images/sewer.jpg'
    }
  }

  const handleClick = (name) => {
    history.push(`shop/${name}`)
  }

  const collectionItem = () =>
    collections &&
    collections.map((i) => (
      <div
        className='collection__item'
        key={i._id}
        onClick={() => handleClick(i._id)}
      >
        <div
          className='collection__image'
          style={{
            background: `url(${renderCardImage(i.images)})`,
            backgroundSize: 'cover',
          }}
        />

        <div className='collection__content'>
          <h1 className='collection__subtitle'>{i.name}</h1>
        </div>
      </div>
    ))

  return (
    <div className='collection'>
      <div className='collection__title'>
        <h1 className='heading-primary'>Sewing Collections</h1>
      </div>
      <div className='collection__items'>{collectionItem()}</div>
    </div>
  )
}

export default Collection
