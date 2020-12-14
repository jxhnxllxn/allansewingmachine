import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Collection = () => {
  const history = useHistory()
  const collectionState = useSelector(({ collection }) => collection)
  const { collections } = collectionState

  const renderCardImage = (images) => {
    if (images.length > 0) {
      return `/images/collections/${images}`
    } else {
      return '/images/sewer.jpg'
    }
  }

  const handleClick = (slug) => {
    history.push(`/shop/${slug}`)
  }

  const collectionItem = () =>
    collections &&
    collections.map((i) => (
      <div
        className='collection__item'
        key={i._id}
        onClick={() => handleClick(i.slug)}
      >
        <div
          className='collection__image'
          style={{
            background: `url(${renderCardImage(i.images)})`,
            backgroundSize: 'cover',
          }}
        />

        <div className='collection__content'>
          <h2 className='collection__subtitle heading-secondary'>{i.name}</h2>
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
